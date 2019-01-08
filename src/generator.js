export function generate ({ mutationTypes, actions, messages, host }) {
  return `import GRPC from './grpc'

export const types = {
${mutationTypes.map((type)=>`  ${type}: '${type}',`).join('\n')}
}

export const grpc = new GRPC({ host: ${host} })
${actions.map(({ name, client, method, message, mutationType })=>`
export function ${name} (params, options) {
  const req = new HelloRequest()
  const users = [0].map(()=>{
    const r = new HelloRequest.User()
    r.setName('puyo')
    r.setAge(999)
    r.setChildrenList(['uuu'])
    return r
  })
  req.setUsersList(users)
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
}
`).join('')}
`
}

export function generateRequest () {

}