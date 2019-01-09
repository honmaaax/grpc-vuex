import _ from 'lodash'

import Request from '../src/request'

describe('constructor', ()=>{
  it('returns an instance', () => {
    const params = {}
    const Message = ()=>{}
    const models = {}
    expect(new Request(params, Message, models)).toBeInstanceOf(Request)
  })
  it('throws an error if it receives an invalid host', () => {
    expect(()=>new Request()).toThrow(Error)
  })
})
