import _ from 'lodash'

import { createRequest } from '../src/request'
import { HelloRequest } from './grpc/helloworld_pb'

describe('createRequest', ()=>{
  it('sets parames to request object', () => {
    const params = {
      users: [
        {
          name: 'hoge',
          age: 33,
          children: ['fuga'],
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
        }
      ]
    })
  })
  it('throws an error if it receives an invalid host', () => {
    expect(()=>createRequest()).toThrow(Error)
  })
})
