import _ from 'lodash'

import { createRequest } from '../src/request'
import Helloworld from './grpc/helloworld_pb'
import fewcollection from './grpc/fewcollection_pb'

describe('createRequest', ()=>{
  it('sets parames', () => {
    const params = {
      users: []
    }
    const models = {users: Helloworld.HelloRequest.User}
    const req = createRequest(params, Helloworld.HelloRequest, models)
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
    const models = {users: Helloworld.HelloRequest.User}
    const req = createRequest(params, Helloworld.HelloRequest, models)
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
  it('sets few collection parames', () => {
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
      ],
      pagenation: {
        perpage: 30,
        page: 1,
      },
      total: 67,
    }
    const models = {
      users: fewcollection.User,
      pagenation: fewcollection.Pagenation,
    }
    const req = createRequest(params, fewcollection.GetUsersRequest, models)
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
      ],
      pagenation: {
        perpage: 30,
        page: 1,
      },
      total: 67,
    })
  })
})
