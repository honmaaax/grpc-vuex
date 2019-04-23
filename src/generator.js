import path from 'path'
import fs from 'fs'
import Promise from 'bluebird'
import _ from 'lodash'
import childProcess from 'child_process'
import mkdirp from 'mkdirp'

export function generateFileByProtoc (protoFilePathAndName) {
  const protoFilePath = path.dirname(protoFilePathAndName) || './'
  const protoFileName =  path.basename(protoFilePathAndName)
  const protoFileNameWithoutExt =  path.basename(protoFileName, '.proto')
  const outputFilePath = './.grpc-vuex'
  const command = `protoc -I=${protoFilePath}:$GOPATH/src:$GOPATH/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis ${protoFileName} --js_out=import_style=commonjs:${outputFilePath} --grpc-web_out=import_style=commonjs,mode=grpcwebtext:${outputFilePath}`
  return new Promise((resolve, reject)=>{
    childProcess.exec(command, (err, stdout, stderr)=>{
      if (err) {
        reject(err)
      } else if (stderr) {
        reject(stderr)
      } else {
        resolve(stdout)
      }
    })
  })
    .then(()=>{
      const funcs = [Promise.promisify(fs.readFile)(`./.grpc-vuex/${protoFileNameWithoutExt}_pb.js`, 'utf-8')]
      if ( fs.existsSync(`./.grpc-vuex/${protoFileNameWithoutExt}_grpc_web_pb.js`) ) {
        funcs.push(Promise.promisify(fs.readFile)(`./.grpc-vuex/${protoFileNameWithoutExt}_grpc_web_pb.js`, 'utf-8'))
      }
      return Promise.all(funcs)
    })
    .then((codes)=>{
      return codes.join('\n\n')
    })
    .catch((err)=>{
      console.error(err)
      throw new Error(err)
    })
}

export function generateFileByProtocDependencies (protoFiles, parentDir = '.') {
  return Promise.map(protoFiles, ({ dir, file, dependencies })=>{
    const protoFilePath = path.dirname(file) || './'
    const protoFileName =  path.basename(file)
    const protoFileNameWithoutExt =  path.basename(file, '.proto')
    const outputFilePath = path.resolve('./.grpc-vuex', parentDir, protoFilePath)
    const command = `protoc -I=${path.resolve(dir, protoFilePath)}:$GOPATH/src:$GOPATH/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis ${protoFileName} --js_out=import_style=commonjs:${outputFilePath}`
    return Promise.resolve()
      .then(()=>{
        if (fs.existsSync(outputFilePath)) return;
        return Promise.promisify(mkdirp)(outputFilePath)
      })
      .then(()=>{
        return new Promise((resolve, reject)=>{
          childProcess.exec(command, (err, stdout, stderr)=>{
            if (err) {
              reject(err)
            } else if (stderr) {
              reject(stderr)
            } else {
              resolve(stdout)
            }
          })
        })
      })
      .then(()=>{
        const jsFilePath = path.resolve('./.grpc-vuex', parentDir, protoFilePath, `${protoFileNameWithoutExt}_pb.js`)
        const funcs = [Promise.promisify(fs.readFile)(jsFilePath, 'utf-8')]
        if (dependencies) {
          funcs.push(generateFileByProtocDependencies(dependencies, protoFilePath))
        }
        return Promise.all(funcs)
      })
      .then((codes)=>{
        return _.chain(codes)
          .flattenDeep()
          .join('\n')
          .value()
      })
      .catch((err)=>{
        console.error(err)
        throw new Error(err)
      })
  })
}

export function generateImportCode (messageProtos, clientProtos) {
  return `import GRPC from './grpc'
import { logRequest, logResponse, logError } from './debug'
import { createRequest } from './request'
import { convertResponse } from './response'
${messageProtos.map((protoName)=>`import ${protoName} from './${protoName}_pb'`).join('\n')}
${clientProtos.map(({ protoName, client })=>`import { ${client} } from './${protoName}_grpc_web_pb'`).join('\n')}`
}

export function generateMutationTypesCode (mutationTypes) {
  return _.chain(mutationTypes)
    .clone()
    .map((type)=>`  ${type}: '${type}',`)
    .unshift('export const types = {')
    .push('}')
    .join('\n')
    .value()
}

export function generateInitGrpcCode (endpoint) {
  return `export const grpc = new GRPC('${endpoint}')`
}

export function generateRequestCode (protoName, message, models) {
  function getNestedModels (models, key) {
    return _.reduce(models[key], (obj, value, key)=>{
      return _.merge({[key]: value}, obj, getNestedModels(models, value.type))
    }, {})
  }
  const nestedModels = getNestedModels(models, message)
  const stringifiedModels = _.chain(nestedModels)
    .map(({ type, namespace }, key)=>(`${key}: ${namespace}.${type}`))
    .join(', ')
    .value()
  return `const req = createRequest(arg.params || {}, ${protoName}.${message}, {${stringifiedModels}})`
}

export function generateActionsCode (params, isDebugMode) {
  return _.chain(params)
    .filter('actions')
    .map(({ actions, models })=>{
      return actions.map(({ protoName, name, client, method, message, mutationType })=>
`export function ${name} (context, arg) {
  if (!arg) arg = {}
  ${generateRequestCode(protoName, message, models)}${isDebugMode ? `
  logRequest('${method}', arg.params)` : ''}
  return grpc.call({
      client: ${client},
      method: '${method}',
      req,
      options: arg.options,${params ? `
      params: arg.params,` : ''}
    })
    .then((raw)=>{
      const res = convertResponse(raw.toObject())${isDebugMode ? `
      logResponse('${method}', JSON.parse(JSON.stringify(res)))` : ''}
      if (arg.hasMutation) context.commit(types.${mutationType}, res)
      return res
    })${isDebugMode ? `
    .catch((err)=>{
      logError('${method}', err)
      throw err
    })` : ''}
}`
      )
    })
    .flatten()
    .join('\n')
    .value()
}

export function generateCode (params, endpoint, isDebugMode) {
  const mutationTypes = _.chain(params)
    .map('mutationTypes')
    .compact()
    .flatten()
    .value()
  const messageProtos = _.chain(params[0].models)
    .map((values)=>_.chain(values)
      .values()
      .map('namespace')
      .value()
    )
    .concat(_.map(params, ({ actions })=>_.map(actions, 'protoName')))
    .flattenDeep()
    .uniq()
    .value()
  const clientProtos = _.chain(params)
    .map('actions')
    .compact()
    .map((actions)=>({
      protoName: actions[0].protoName,
      client: actions[0].client,
    }))
    .uniqBy(({ protoName, client })=>`${protoName}.${client}`)
    .value()
  return `${generateImportCode(messageProtos, clientProtos)}

${generateMutationTypesCode(mutationTypes)}

${generateInitGrpcCode(endpoint)}
${generateActionsCode(params, isDebugMode)}
`
}

function _generateDtsCode (messages, actions) {
  const ignoreMessages = []
  const interfaces = _.chain(messages)
    .map(({ fields }, name)=>{
      fields = _.chain(fields)
        .map(({ type, rule }, name)=>{
          const isArray = (rule === 'repeated')
          type = {
            'int32': 'number',
            'int64': 'string',
            'google.protobuf.Timestamp': 'string',
            'bool': 'boolean',
          }[type] || type
          return {
            name,
            type: `${type}${isArray ? '[]': ''}`,
          }
        })
        .map(({ type, name })=>`  ${name}?:${type};`)
        .join('\n')
        .value()
      if (_.size(fields)) {
        return `interface ${name} {\n${fields}\n}`
      } else {
        ignoreMessages.push(name)
      }
    })
    .compact()
    .join('\n')
    .value()
  const functions = _.chain(actions)
    .map(({ name, message, response })=>
      `export function ${name}(${_.includes(ignoreMessages, message) ? '' : `arg:ActionArgument<${message}>`}):Promise<${response}>;`
    )
    .join('\n')
    .value()
  return `${interfaces}\n${functions}`
}

export function generateDtsCode(params) {
  const grpcClass = `class GRPC {
  endpoint:string;
  defaultOptions:object;
  constructor(endpoint?:string);
  getDeadline(sec:number);
  call(arr:{ client:string, method:string, req:object, options:object });
  error( err:Error, info:{ method:string, req:object } );
  onError( err:Error, req:object, method:string );
}
export var grpc:GRPC;

interface ActionArgument<T> {
  params:T;
  hasMutation:boolean;
  options:object;
}`
  const types = `export var types:{
${_.chain(params)
  .map(({ actions })=>_.map(actions, 'mutationType'))
  .flatten()
  .uniq()
  .map((mutationType)=>`  ${mutationType}: '${mutationType}';`)
  .join('\n')
  .value()}
}`
  const dts = _.chain(params)
    .map(({ messages, actions })=>_generateDtsCode(messages, actions))
    .join('\n\n')
    .value()
  return `${grpcClass}\n\n${types}\n\n${dts}`
}
