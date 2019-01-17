import path from 'path'
import fs from 'fs'
import Promise from 'bluebird'
import _ from 'lodash'
import childProcess from 'child_process'

export function generateFileByProtoc (protoFilePathAndName) {
  const protoFilePath = path.dirname(protoFilePathAndName) || './'
  const protoFileName =  path.basename(protoFilePathAndName)
  const protoFileNameWithoutExt =  path.basename(protoFileName, '.proto')
  const outputFilePath = './dist'
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
      Promise.promisify(fs.readFile)(`./dist/${protoFileNameWithoutExt}_grpc_web_pb.js`, 'utf-8'),
      Promise.promisify(fs.readFile)(`./dist/${protoFileNameWithoutExt}_pb.js`, 'utf-8'),
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
  return `import GRPC from '../src/grpc'
import { createRequest } from '../src/request'
import { ${actions[0].client} } from './${protoFileNameWithoutExt}_grpc_web_pb'
import { ${requests} } from './${protoFileNameWithoutExt}_pb'`
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

export function generateRequestCode (message, models) {
  return `const req = createRequest(params, ${message}, ${JSON.stringify(models)})`
}

export function generateActionsCode (actions, models) {
  return actions.map(({ name, client, method, message, mutationType })=>
`export function ${name} (params, options) {
  ${generateRequestCode(message, models[message])}
  return grpc.call({
      client: ${client},
      method: '${method}',
      params,
    })
    .then((res)=>{
      if (options && options.hasMutation) context.commit(types.${mutationType}, res)
      return res
    })
}`
  ).join('\n\n')
}

export function generateCode ({ protoFileNameWithoutExt, mutationTypes, actions, messages, endpoint }) {
  return `${generateImportCode(protoFileNameWithoutExt, actions)}

${generateMutationTypesCode(mutationTypes)}

${generateInitGrpcCode(endpoint)}
${generateActionsCode(actions, messages)}
`
}