import path from 'path'
import fs from 'fs'
import Promise from 'bluebird'
import _ from 'lodash'
import childProcess from 'child_process'

export function generateFileByProtoc (protoFilePathAndName) {
  const protoFilePath = path.dirname(protoFilePathAndName) || './'
  const protoFileName =  path.basename(protoFilePathAndName)
  const protoFileNameWithoutExt =  path.basename(protoFileName, '.proto')
  const outputFilePath = './.grpc-vuex'
  const command = `protoc -I=${protoFilePath} ${protoFileName} --js_out=import_style=commonjs:${outputFilePath} --grpc-web_out=import_style=commonjs,mode=grpcwebtext:${outputFilePath}`
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
    .catch((err)=>console.error(err))
}

export function generateImportCode (protoFileNameWithoutExt, actions) {
  const requests = _.chain(actions)
    .map(({ message })=>message)
    .uniq()
    .join(', ')
    .value()
  return `import GRPC from './grpc'
import { createRequest } from './request'
import { ${actions[0].client} } from './${protoFileNameWithoutExt}_grpc_web_pb'
import ${protoFileNameWithoutExt} from './${protoFileNameWithoutExt}_pb'`
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

export function generateRequestCode (packageName, message, model) {
  model = _.chain(model)
    .map((value, key)=>(`${key}:${packageName}.${value}`))
    .join(',')
    .value()
  return `const req = createRequest(params, ${packageName}.${message}, {${model}})`
}

export function generateActionsCode (packageName, actions, models) {
  return actions.map(({ name, client, method, message, mutationType })=>
`export function ${name} (params, options) {
  ${generateRequestCode(packageName, message, models[message])}
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
  ).join('\n\n')
}

export function generateCode ({ protoFileNameWithoutExt, mutationTypes, actions, models, endpoint }) {
  return `${generateImportCode(protoFileNameWithoutExt, actions)}

${generateMutationTypesCode(mutationTypes)}

${generateInitGrpcCode(endpoint)}
${generateActionsCode(protoFileNameWithoutExt, actions, models)}
`
}

export function generateDtsCode (messages, actions) {
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
