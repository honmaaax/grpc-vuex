import fs from 'fs'
import path from 'path'
import Promise from 'bluebird'
import _ from 'lodash'

import {
  readFile,
  writeFile,
  copyFile,
  makeDir,
  removeDir,
  getProtocDependencies,
} from '../src/file'

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

describe('copyFile', ()=>{
  const src = './test/dist/copySrc.js'
  const dist = './test/dist/copyDist.js'
  beforeAll(()=>{
    return Promise.promisify(fs.writeFile)(src, 'hoge')
      .then(()=>copyFile(src, dist))
  })
  afterAll(()=>{
    return Promise.map([src, dist], (filePath)=>Promise.promisify(fs.unlink)(filePath))
  })
  it('copies', () => {
    expect(fs.existsSync(dist)).toBeTruthy()
    return Promise.promisify(fs.readFile)(dist, 'utf-8')
      .then((res)=>{
        expect(res).toBe('hoge')
      })
  })
})

describe('makeDir', ()=>{
  const dirPath = '.makeDir'
  beforeAll(()=>{
    if ( fs.existsSync(dirPath) ) {
      fs.readdirSync(dirPath).map((file)=>fs.unlinkSync(path.resolve(dirPath, file)))
      fs.rmdirSync(dirPath)
    }
  })
  afterAll(()=>{
    if ( fs.existsSync(dirPath) ) {
      fs.readdirSync(dirPath).map((file)=>fs.unlinkSync(path.resolve(dirPath, file)))
      fs.rmdirSync(dirPath)
    }
  })
  it('makes directory', () => {
    expect(fs.existsSync(dirPath)).toBeFalsy()
    return makeDir(dirPath)
      .then(()=>{
        expect(fs.existsSync(dirPath)).toBeTruthy()
      })
  })
})

describe('removeDir', ()=>{
  const dirPath = '.removeDir'
  beforeAll(()=>{
    if ( !fs.existsSync(dirPath) ) {
      return Promise.promisify(fs.mkdir)(dirPath)
    }
  })
  it('removes directory', () => {
    expect(fs.existsSync(dirPath)).toBeTruthy()
    return removeDir(dirPath)
      .then(()=>{
        expect(fs.existsSync(dirPath)).toBeFalsy()
      })
  })
})

describe('getProtocDependencies', ()=>{
  let results;
  beforeAll(()=>{
    return getProtocDependencies('./test/grpc/helloworld.proto')
      .then((r)=>{
        results = r
      })
  })
  it('returns dependency proto files', ()=>{
    expect(results).toEqual([
      {
        "dir": "/Users/b07781/go/src",
        "file": "github.com/mwitkow/go-proto-validators/validator.proto"
      },
      {
        "dir": "/Users/b07781/go/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis",
        "file": "google/api/annotations.proto",
        "dependencies": [
          {
            "dir": "/Users/b07781/go/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis",
            "file": "google/api/http.proto"
          },
        ]
      }
    ])
  })
})