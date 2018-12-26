import _ from 'lodash'

import GRPC from '../src/grpc'
import { GreeterPromiseClient } from './grpc/helloworld_grpc_web_pb'
import { HelloRequest } from './grpc/helloworld_pb'

const host = 'http://localhost:8080'
const proto = `
  syntax = "proto3";

  package helloworld;

  service Greeter {
    rpc SayHello (HelloRequest) returns (HelloReply);
  }

  message HelloRequest {
    message User {
      string name = 1;
      int32 age = 2;
      repeated string children = 3;
    }
    repeated User users = 1;
  }

  message HelloReply {
    message User {
      string name = 1;
      int32 age = 2;
      repeated string children = 3;
    }
    repeated User users = 1;
  }
`

describe('constructor', ()=>{
  it('returns an instance', () => {
    expect(new GRPC({ proto, host })).toBeInstanceOf(GRPC)
  })
  it('throws an error if it receives an invalid host', () => {
    expect(()=>new GRPC({ proto })).toThrow(Error)
  })
  it('throws an error if it receives an invalid proto', () => {
    expect(()=>new GRPC({ host })).toThrow(Error)
  })
})

describe('call()', ()=>{
  let grpc;
  beforeAll(()=>{
    grpc = new GRPC({ proto, host })
  })
  it('returns an instance', () => {
    const result = grpc.call({
      client: GreeterPromiseClient,
      method: 'sayHello',
      messageName: 'HelloRequest',
      deserialize: HelloRequest.deserializeBinary,
      params: {users: [{name: 'puni', age: 999, children: ['uuu']}]},
    })
    expect(_.get(result, 'then')).toBeTruthy()
    expect(_.isFunction(result.then)).toBeTruthy()
  })
})