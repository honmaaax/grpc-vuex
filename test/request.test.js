import _ from 'lodash'

import Request from '../src/request'
import { HelloRequest } from './grpc/helloworld_pb'

describe('constructor', ()=>{
  it('returns an instance', () => {
    const params = {
      users: [
        {
          name: 'puni',
          age: 33,
          children: ['aaa'],
        }
      ]
    }
    const models = {users: 'User'}
    expect(new Request(params, HelloRequest, models)).toBeInstanceOf(Request)
  })
  it('throws an error if it receives an invalid host', () => {
    expect(()=>new Request()).toThrow(Error)
  })
})
