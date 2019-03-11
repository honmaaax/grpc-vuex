import _ from 'lodash'
import Promise from 'bluebird'

import GRPC from '../src/grpc'
import { GreeterPromiseClient } from './grpc/helloworld_grpc_web_pb'
import helloworld from './grpc/helloworld_pb'

const endpoint = 'http://localhost:8080'
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
    expect(new GRPC(endpoint)).toBeInstanceOf(GRPC)
  })
  it('throws an error if it receives an invalid endpoint', () => {
    expect(()=>new GRPC()).toThrow(Error)
  })
})

describe('call()', ()=>{
  let grpc;
  beforeAll(()=>{
    grpc = new GRPC(endpoint)
  })
  it('returns an instance', () => {
    const req = new helloworld.HelloRequest()
    const users = [0].map(()=>{
      const r = new helloworld.User()
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

describe('error()', ()=>{
  const mock = jest.fn()
  let grpc;
  beforeAll(()=>{
    grpc = new GRPC(endpoint)
    grpc.onError = mock
  })
  it('returns an instance', () => {
    return Promise.resolve()
      .then(()=>grpc.error({code: 123, message: 'hoge'}, {req: {foo: 'bar'}, method: 'getFooBar'}))
      .then(()=>{
        expect(true).toBe(false)
      })
      .catch((err)=>{
        expect(err.code).toBe(123)
        expect(err.message).toBe('hoge')
        expect(mock).toHaveBeenCalledTimes(1)
        expect(mock).toBeCalledWith({code: 123, message: 'hoge'}, {foo: 'bar'}, 'getFooBar')
      })
  })
})