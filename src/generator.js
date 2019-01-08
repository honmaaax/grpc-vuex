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

export function generateRequestCode (name, message) {
  return `const req = new ${name}()
  const users = [0].map(()=>{
    const r = new ${name}.User()
    r.setName('puyo')
    r.setAge(999)
    r.setChildrenList(['uuu'])
    return r
  })
  req.setUsersList(users)`
}

export function generateActionsCode (actions, messages) {
  return actions.map(({ name, client, method, message, mutationType })=>
`export function ${name} (params, options) {
  ${generateRequestCode(message, messages[message])}
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