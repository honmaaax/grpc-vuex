import _ from 'lodash'

import {
  stringifyGoogleTimestamp,
  convertResponse,
} from '../src/response'

describe('stringifyGoogleTimestamp()', ()=>{
  it('return a datetime string', () => {
    const googleTimestamp = {
      nanos: 0,
      seconds: 1551940886,
    }
    const str = stringifyGoogleTimestamp(googleTimestamp)
    expect(str).toEqual('2019-03-07T06:41:26.000Z')
  })
})

describe('convertResponse()', ()=>{
  it('return a datetime string', () => {
    const before = {
      name: 'hoge',
      age: 54,
      bornedAt: {
        nanos: 0,
        seconds: 1551940886,
      },
    }
    const after = convertResponse(before)
    expect(after).toEqual({
      name: 'hoge',
      age: 54,
      bornedAt: '2019-03-07T06:41:26.000Z',
    })
  })
})
