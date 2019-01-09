import _ from 'lodash'

import {
  toJSON,
  getServices,
  getMessages,
  getModels,
  getMutationTypes,
  getActions,
} from '../src/protobuf'
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
    expect(code).toBe(
`import GRPC from './grpc'
import Request from './request'`
    )
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
    const code = generateRequestCode('HelloRequest', {users: 'User'})
    expect(code).toBe(`const req = new Request(params, HelloRequest, {"users":"User"})`)
  })
})

describe('generateActionsCode', ()=>{
  it('returns js code', () => {
    const json = toJSON(proto)
    const services = getServices(json)
    const messages = getMessages(json)
    const models = getModels(messages)
    const actions = getActions(services)
    const code = generateActionsCode(actions, models)
    expect(code).toBe(
`export function sayHello (params, options) {
  const req = new Request(params, HelloRequest, {"users":"User"})
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
    const messages = getMessages(json)
    const mutationTypes = getMutationTypes(services)
    const actions = getActions(services)
    const code = generateCode({
      mutationTypes,
      actions,
      messages,
      host: 'http://localhost:8080/',
    })
    expect(_.isString(code)).toBeTruthy()
  })
})
