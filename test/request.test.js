import _ from 'lodash'

import { createRequest } from '../src/request'
import { HelloRequest } from './grpc/helloworld_pb'

describe('createRequest', ()=>{
  it('sets parames', () => {
    const params = {
      users: []
    }
    const models = {users: 'User'}
    const req = createRequest(params, HelloRequest, models)
    expect(req.toObject()).toEqual({
      usersList: []
    })
  })
  it('throws an error if it receives an invalid host', () => {
    expect(()=>createRequest()).toThrow(Error)
  })
  it('sets collection parames', () => {
    const params = {
      users: [
        {
          name: 'hoge',
          age: 33,
          children: ['fuga'],
        },{
          name: 'piyo',
          age: 55,
          children: ['puyo'],
        }
      ]
    }
    const models = {users: 'User'}
    const req = createRequest(params, HelloRequest, models)
    expect(req.toObject()).toEqual({
      usersList: [
        {
          name: 'hoge',
          age: 33,
          childrenList: ['fuga']
        },{
          name: 'piyo',
          age: 55,
          childrenList: ['puyo']
        }
      ]
    })
  })
})
