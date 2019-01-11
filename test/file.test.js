import fs from 'fs'
import Promise from 'bluebird'
import _ from 'lodash'

import { readFile, writeFile } from '../src/file'

describe('readFile', ()=>{
  it('returns Promise', () => {
    expect(_.get(readFile('./test/grpc/helloworld.proto'), 'then')).toBeTruthy()
    expect(_.isFunction(readFile('./test/grpc/helloworld.proto').then)).toBeTruthy()
  })
})

describe('writeFile', ()=>{
  it('returns Promise', () => {
    const PATH = './test/dist/dist.txt'
    expect(_.get(writeFile(PATH, 'foo'), 'then')).toBeTruthy()
    expect(_.isFunction(writeFile(PATH, 'foo').then)).toBeTruthy()
  })
  it('updates a file', () => {
    const PATH = './test/dist/dist2.txt'
    return Promise.promisify(fs.writeFile)(PATH, 'foo')
      .then(()=>Promise.promisify(fs.readFile)(PATH, 'utf-8'))
      .then((res)=>{
        expect(res).toBe('foo')
        return writeFile(PATH, 'bar')
      })
      .then(()=>Promise.promisify(fs.readFile)(PATH, 'utf-8'))
      .then((res)=>{
        expect(res).toBe('bar')
      })
  })
})
