import fs from 'fs'
import Promise from 'bluebird'
import _ from 'lodash'

import { toJSON, getServices, getMessages, getMutationTypes, getActions, revertNames } from '../src/protobuf'

const proto = `syntax = "proto3";

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

describe('toJSON', ()=>{
  it('returns object', () => {
    expect(_.isPlainObject(toJSON(proto))).toBeTruthy()
  })
})

describe('getServices', ()=>{
  let services = {}
  beforeAll(()=>{
    services = getServices(toJSON(proto))
  })
  it('returns object', () => {
    expect(_.isPlainObject(services)).toBeTruthy()
  })
  it('returns services object', () => {
    expect(services).toEqual({
      "Greeter": {
        "methods": {
          "SayHello": {
            "requestType": "HelloRequest",
            "responseType": "HelloReply"
          }
        }
      }
    })
  })
})

describe('getMessages', ()=>{
  let messages = {}
  beforeAll(()=>{
    messages = getMessages(toJSON(proto))
  })
  it('returns object', () => {
    expect(_.isPlainObject(messages)).toBeTruthy()
  })
  it('returns messages object', () => {
    expect(messages).toEqual({
      "HelloReply": {
        "fields": {
          "users": {
            "id": 1,
            "rule": "repeated",
            "type": "User"
          }
        },
        "nested": {
          "User": {
            "fields": {
              "age": {
                "id": 2,
                "type": "int32"
              },
              "children": {
                "id": 3,
                "rule": "repeated",
                "type": "string"
              },
              "name": {
                "id": 1,
                "type": "string"
              }
            }
          }
        }
      },
      "HelloRequest": {
        "fields": {
          "users": {
            "id": 1,
            "rule": "repeated",
            "type": "User"
          }
        },
        "nested": {
          "User": {
            "fields": {
              "age": {
                "id": 2,
                "type": "int32"
              },
              "children": {
                "id": 3,
                "rule": "repeated",
                "type": "string"
              },
              "name": {
                "id": 1,
                "type": "string"
              }
            }
          }
        }
      }
    })
  })
})

describe('getMutationTypes', ()=>{
  let mutationTypes = []
  beforeAll(()=>{
    mutationTypes = getMutationTypes(toJSON(proto))
  })
  it('returns array', () => {
    expect(_.isArray(mutationTypes)).toBeTruthy()
  })
})

describe('getActions', ()=>{
  let actions = []
  beforeAll(()=>{
    actions = getActions(toJSON(proto))
  })
  it('returns array', () => {
    expect(_.isArray(actions)).toBeTruthy()
  })
})

describe('revertNames', ()=>{
  let messages = {}
  beforeAll(()=>{
    messages = getMessages(toJSON(proto))
  })
  it('returns true', () => {
    const responseType = 'HelloReply'
    const schema = messages[responseType]
    const res = {
      usersList: [
        {
          name: 'hoge',
          age: 21,
          dummyList: [],
          childrenList: [],
        },
      ],
    }
    expect(revertNames(res, schema)).toEqual({
      users: [
        {
          name: 'hoge',
          age: 21,
          dummyList: [],
          children: [],
        },
      ]
    })
  })
})
