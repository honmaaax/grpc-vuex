import fs from 'fs'
import path from 'path'
import Promise from 'bluebird'
import _ from 'lodash'
import rmrf from 'rmrf'

export function readFile(filePath) {
  return Promise.promisify(fs.readFile)(filePath, 'utf-8')
}

export function writeFile(outputFilePath, code) {
  return Promise.promisify(fs.writeFile)(outputFilePath, code)
}

export function copyFile(src, dist) {
  return readFile(src)
    .then((contents)=>writeFile(dist, contents))
}

export function makeDir(dirPath) {
  if ( fs.existsSync(dirPath) ) return Promise.resolve()
  return Promise.promisify(fs.mkdir)(dirPath)
}

export function removeDir(dirPath) {
  return Promise.resolve()
    .then(()=>{
      if ( fs.existsSync(dirPath) ) return rmrf(dirPath)
    })
}

export function getProtocDependencies(protoFilePathAndName) {
  const protoFilePath = path.dirname(protoFilePathAndName) || './'
  return Promise.promisify(fs.readFile)(protoFilePathAndName)
    .then((buf)=>buf.toString())
    .then((proto)=>{
      return _.chain(proto.match(/import (?:'([^']+?)'|"([^"]+?)")/g))
        .map((str)=>str.match(/import (?:'([^']+?)')|(?:"([^"]+?)")/, '$1'))
        .map((m)=>_.nth(m, 2))
        .value()
    })
    .then((files)=>{
      const dirs = [
        protoFilePath,
        `${process.env.GOPATH}/src`,
        `${process.env.GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis`
      ]
      return Promise.map(dirs, (dir)=>{
        return Promise.map(files, (file)=>{
          return Promise.promisify(fs.stat)(path.resolve(dir, file))
            .then(()=>({dir, file}), ()=>{})
        })
      })
    })
    .then((result)=>{
      return _.chain(result)
        .flattenDeep()
        .compact()
        .value()
    })
    .then((files)=>{
      if (!_.size(files)) return null
      return Promise.map(files, ({ dir, file })=>{
        return getProtocDependencies(path.resolve(dir, file))
          .then((dependencies)=>{
            if (!dependencies) return { dir, file }
            return { dir, file, dependencies }
          })
      })
    })
}