import fs from 'fs'
import path from 'path'
import Promise from 'bluebird'
import _ from 'lodash'

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
  if ( !fs.existsSync(dirPath) ) return Promise.resolve()
  return Promise.promisify(fs.readdir)(dirPath)
    .then((files)=>{
      return Promise.map(files, (file)=>{
        Promise.promisify(fs.unlinkSync)(path.resolve(dirPath, file))
      })
    })
    .then(()=>Promise.promisify(fs.rmdir)(dirPath))
}

