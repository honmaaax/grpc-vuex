import fs from 'fs'
import Promise from 'bluebird'
import _ from 'lodash'

export function readFile(filePath) {
  return Promise.promisify(fs.readFile)(filePath, 'utf-8')
}

export function writeFile(outputFilePath, code) {
  return Promise.promisify(fs.writeFile)(outputFilePath, code)
}
