import _ from 'lodash'

import { readFile } from '../src/file'
import { toJSON, getServices, getMessages, getMutationTypes, getActions } from '../src/protobuf'
import {
  generateImportCode,
  generateMutationTypesCode,
  generateInitGrpcCode,
  generateRequestCode,
  generateActionsCode,
  generateCode,
} from '../src/generator'

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

describe('generateImportCode', ()=>{
  it('returns js code', () => {
    const code = generateImportCode()
    expect(code).toBe(`import GRPC from './grpc'`)
  })
})

describe('generateMutationTypesCode', ()=>{
  it('returns js code', () => {
    const json = toJSON(proto)
    const services = getServices(json)
    const mutationTypes = getMutationTypes(services)
    const code = generateMutationTypesCode(mutationTypes)
    expect(code).toBe(
`export const types = {
  GREETER_SAYHELLO: 'GREETER_SAYHELLO',
}`
    )
  })
})

describe('generateInitGrpcCode', ()=>{
  it('returns js code', () => {
    const host = 'http://localhost:8080/'
    const code = generateInitGrpcCode(host)
    expect(code).toBe(`export const grpc = new GRPC({ host: ${host} })`)
  })
})

describe('generateRequestCode', ()=>{
  it('returns js code', () => {
    const code = generateRequestCode()
    expect(code).toBe(
`const req = new HelloRequest()
  const users = [0].map(()=>{
    const r = new HelloRequest.User()
    r.setName('puyo')
    r.setAge(999)
    r.setChildrenList(['uuu'])
    return r
  })
  req.setUsersList(users)`
    )
  })
})

describe('generateActionsCode', ()=>{
  it('returns js code', () => {
    const json = toJSON(proto)
    const services = getServices(json)
    const actions = getActions(services)
    const code = generateActionsCode(actions)
    expect(code).toBe(
`export function sayHello (params, options) {
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
      client: GreeterPromiseClient,
      method: 'sayHello',
      messageName: 'HelloRequest',
      params,
    })
    .then((res)=>{
      if (options && options.hasMutation) context.commit(types.GREETER_SAYHELLO, res)
      return res
    })
}`
    )
  })
})

describe('generateCode', ()=>{
  it('returns js code', () => {
    const json = toJSON(proto)
    const services = getServices(json)
    const mutationTypes = getMutationTypes(services)
    const actions = getActions(services)
    const code = generateCode({
      mutationTypes,
      actions,
      host: 'http://localhost:8080/',
    })
    expect(_.isString(code)).toBeTruthy()
  })
})
