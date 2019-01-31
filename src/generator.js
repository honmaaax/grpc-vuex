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
    .then(()=>Promise.all([
      Promise.promisify(fs.readFile)(`./.grpc-vuex/${protoFileNameWithoutExt}_grpc_web_pb.js`, 'utf-8'),
      Promise.promisify(fs.readFile)(`./.grpc-vuex/${protoFileNameWithoutExt}_pb.js`, 'utf-8'),
    ]))
    .then((codes)=>codes.join('\n\n'))
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
    const outputFilePath = path.join('./.grpc-vuex', parentDir, protoFilePath)
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
        const funcs = [Promise.promisify(fs.readFile)(path.resolve('./.grpc-vuex', protoFilePath, `${protoFileNameWithoutExt}_pb.js`), 'utf-8')]
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

export function generateImportCode (protos) {
  return `import GRPC from './grpc'
import { createRequest } from './request'
${protos.map(({ protoName, client })=>
`import { ${client} } from './${protoName}_grpc_web_pb'
import ${protoName} from './${protoName}_pb'`
).join('\n')}`
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

export function generateRequestCode (protoName, message, model) {
  model = _.chain(model)
    .map((value, key)=>(`${key}:${protoName}.${value}`))
    .join(',')
    .value()
  return `const req = createRequest(params, ${protoName}.${message}, {${model}})`
}

export function generateActionsCode (params) {
  return _.chain(params)
    .map(({ actions, models })=>{
      return actions.map(({ protoName, name, client, method, message, mutationType })=>
`export function ${name} (params, options) {
  ${generateRequestCode(protoName, message, models[message])}
  return grpc.call({
      client: ${client},
      method: '${method}',
      req,
    })
    .then((res)=>{
      res = res.toObject()
      if (options && options.hasMutation) context.commit(types.${mutationType}, res)
      return res
    })
}`
      )
    })
    .flatten()
    .join('\n')
    .value()
}

export function generateCode (params, endpoint) {
  const mutationTypes = _.chain(params)
    .map('mutationTypes')
    .flatten()
    .value()
  const protos = _.chain(params)
    .map('actions')
    .map((actions)=>({
      protoName: actions[0].protoName,
      client: actions[0].client,
    }))
    .value()
  return `${generateImportCode(protos)}

${generateMutationTypesCode(mutationTypes)}

${generateInitGrpcCode(endpoint)}
${generateActionsCode(params)}
`
}

function _generateDtsCode (messages, actions) {
  const interfaces = _.chain(messages)
    .map(({ fields }, name)=>{
      fields = _.chain(fields)
        .map(({ type, rule }, name)=>{
          const isArray = (rule === 'repeated')
          type = {
            'int32': 'number',
          }[type] || type
          return {
            name,
            type: `${type}${isArray ? '[]': ''}`,
          }
        })
        .map(({ type, name })=>`  ${name}?:${type};`)
        .join('\n')
        .value()
      return `interface ${name} {\n${fields}\n}`
    })
    .join('\n')
    .value()
  const functions = _.chain(actions)
    .map(({ name, message, response })=>
      `export function ${name}(param:${message}):Promise<${response}>;`
    )
    .join('\n')
    .value()
  return `${interfaces}\n${functions}`
}

export function generateDtsCode(params) {
  return _.chain(params)
    .map(({ messages, actions })=>_generateDtsCode(messages, actions))
    .join('\n\n')
    .value()
}
