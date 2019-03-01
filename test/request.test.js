import _ from 'lodash'
import moment from 'moment'

import { createRequest } from '../src/request'
import Helloworld from './grpc/helloworld_pb'
import fewcollection from './grpc/fewcollection_pb'
import snakecase from './grpc/snakecase_pb'
import timestamp from './grpc/timestamp_pb'

describe('createRequest', ()=>{
  it('sets parames', () => {
    const params = {
      users: []
    }
    const models = {users: Helloworld.User}
    const req = createRequest(params, Helloworld.HelloRequest, models)
    expect(req.toObject()).toEqual({
      usersList: []
    })
  })
  it('throws an error if it receives an invalid host', () => {
    expect(()=>createRequest()).toThrow(Error)
  })
  it('sets timestamp param', () => {
    const now = moment()
    const params = {datetime: now.format()}
    const req = createRequest(params, timestamp.TimestampRequest)
    expect(req.toObject()).toEqual({
      datetime: {
        nanos: 0,
        seconds: now.unix(),
      }
    })
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
    const models = {users: Helloworld.User}
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
  it('replaces camel case parames to snake case', () => {
    const params = {
      snakesData: [
        {
          displayName: 'hoge',
          myAge: 33,
          childrenIds: ['fuga'],
        },{
          displayName: 'piyo',
          myAge: 55,
          childrenIds: ['puyo'],
        }
      ],
      pagenationCondition: {
        perPage: 30,
        pageNum: 1,
      },
      totalCount: 67,
    }
    const models = {
      snakesData: snakecase.Snake,
      pagenationCondition: snakecase.Pagenation,
    }
    const req = createRequest(params, snakecase.GetSnakeRequest, models)
    expect(req.toObject()).toEqual({
      snakesDataList: [
        {
          displayName: 'hoge',
          myAge: 33,
          childrenIdsList: ['fuga']
        },{
          displayName: 'piyo',
          myAge: 55,
          childrenIdsList: ['puyo']
        }
      ],
      pagenationCondition: {
        perPage: 30,
        pageNum: 1,
      },
      totalCount: 67,
    })
  })
})
