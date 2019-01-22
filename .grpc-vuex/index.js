import GRPC from './grpc'
import { createRequest } from './request'
import { GreeterPromiseClient } from './helloworld_grpc_web_pb'
import { HelloRequest } from './helloworld_pb'

export const types = {
  GREETER_SAYHELLO: 'GREETER_SAYHELLO',
}

export const grpc = new GRPC('http://localhost:8080')
export function sayHello (params, options) {
  const req = createRequest(params, HelloRequest, {users:HelloRequest.User})
  return grpc.call({
      client: GreeterPromiseClient,
      method: 'sayHello',
      req,
    })
    .then((res)=>{
      if (options && options.hasMutation) context.commit(types.GREETER_SAYHELLO, res)
      return res
    })
}
