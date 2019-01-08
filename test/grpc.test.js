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
    expect(new GRPC(host)).toBeInstanceOf(GRPC)
  })
  it('throws an error if it receives an invalid host', () => {
    expect(()=>new GRPC()).toThrow(Error)
  })
})

describe('call()', ()=>{
  let grpc;
  beforeAll(()=>{
    grpc = new GRPC({ host })
  })
  it('returns an instance', () => {
    const req = new HelloRequest()
    const users = [0].map(()=>{
      const r = new HelloRequest.User()
      r.setName('puyo')
      r.setAge(999)
      r.setChildrenList(['uuu'])
      return r
    })
    req.setUsersList(users)
    const result = grpc.call({
      client: GreeterPromiseClient,
      method: 'sayHello',
      req,
    })
    expect(_.get(result, 'then')).toBeTruthy()
    expect(_.isFunction(result.then)).toBeTruthy()
  })
})