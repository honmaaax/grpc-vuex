import _ from 'lodash'

export function generateImportCode () {
  return `import GRPC from './grpc'`
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

export function generateRequestCode () {
  return `const req = new HelloRequest()
  const users = [0].map(()=>{
    const r = new HelloRequest.User()
    r.setName('puyo')
    r.setAge(999)
    r.setChildrenList(['uuu'])
    return r
  })
  req.setUsersList(users)`
}

export function generateActionsCode (actions) {
  return actions.map(({ name, client, method, message, mutationType })=>
`export function ${name} (params, options) {
  ${generateRequestCode(message)}
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

export function generateCode ({ mutationTypes, actions, host }) {
  return `${generateImportCode()}

${generateMutationTypesCode(mutationTypes)}

${generateInitGrpcCode(host)}
${generateActionsCode(actions)}
`
}