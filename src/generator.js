import _ from 'lodash'
import Case from 'case'

export function generateImportCode () {
  return `import GRPC from './grpc'
import Request from './request'`
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

export function generateInitGrpcCode (host) {
  return `export const grpc = new GRPC({ host: ${host} })`
}

export function generateRequestCode (message, models) {
  return `const req = new Request(params, ${message}, ${JSON.stringify(models)})`
}

export function generateActionsCode (actions, models) {
  return actions.map(({ name, client, method, message, mutationType })=>
`export function ${name} (params, options) {
  ${generateRequestCode(message, models[message])}
  return grpc.call({
      client: ${client},
      method: '${method}',
      messageName: '${message}',
      params,
    })
    .then((res)=>{
      if (options && options.hasMutation) context.commit(types.${mutationType}, res)
      return res
    })
}`
  ).join('\n\n')
}

export function generateCode ({ mutationTypes, actions, messages, host }) {
  return `${generateImportCode()}

${generateMutationTypesCode(mutationTypes)}

${generateInitGrpcCode(host)}
${generateActionsCode(actions, messages)}
`
}