import path from 'path'
import program from 'commander'
import _ from 'lodash'
import webpack from 'webpack'

import { readFile, writeFile } from './file'
import {
  toJSON,
  getServices,
  getMessages,
  getMutationTypes,
  getActions,
} from './protobuf'
import {
  generateCode,
} from './generator'

program
  .usage('<proto_file_path> <output_file_path>')
  .arguments('<proto_file_path> <output_file_path>')
  .parse(process.argv)
if (
  !_.isArray(program.args) ||
  _.size(program.args) !== 2
) {
  throw new Error('Undefined file paths')
}
const [ protoFilePath, outputFilePath ] = program.args
const tempFilePath = './dist/_grpc-vuex-index.js'
readFile(protoFilePath)
  .then(toJSON)
  .then((json)=>{
    const protoFileNameWithoutExt = path.basename(protoFilePath, '.proto')
    const services = getServices(json)
    const messages = getMessages(json)
    const mutationTypes = getMutationTypes(services)
    const actions = getActions(services)
    return {
      protoFileNameWithoutExt,
      mutationTypes,
      actions,
      messages,
      endpoint: 'http://localhost:8080/',
    }
  })
  .then(generateCode)
  .then((code)=>writeFile(tempFilePath, code))
  .then(()=>{
    return new Promise((resolve, reject)=>{
      webpack({
        entry: tempFilePath,
        output: {
          filename: outputFilePath,
        },
        mode: 'development',
        target: 'node',
      }, (err, stats)=>{
        if (err) {
          return reject(err)
        } else if (stats.hasErrors()) {
          return reject(stats)
        }
        return resolve()
      })
    })
  })
  .catch((err)=>console.error(err))
  