import path from 'path'
import program from 'commander'
import Promise from 'bluebird'
import _ from 'lodash'
import webpack from 'webpack'

import { readFile, writeFile, copyFile, makeDir, removeDir } from './file'
import {
  toJSON,
  getServices,
  getMessages,
  getModels,
  getMutationTypes,
  getActions,
} from './protobuf'
import {
  generateFileByProtoc,
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
const dirPath = '.grpc-vuex'
const tempFilePath = path.resolve(dirPath, 'index.js')
makeDir('.grpc-vuex')
  .then(()=>Promise.all([
    Promise
      .all([
        readFile(protoFilePath).then(toJSON),
        generateFileByProtoc(protoFilePath),
      ])
      .then(([ json ])=>{
        const protoFileNameWithoutExt = path.basename(protoFilePath, '.proto')
        const services = getServices(json)
        const models = getModels(getMessages(json))
        const mutationTypes = getMutationTypes(services)
        const actions = getActions(services)
        return {
          protoFileNameWithoutExt,
          mutationTypes,
          actions,
          models,
          endpoint: 'http://localhost:8080',
        }
      })
      .then(generateCode)
      .then((code)=>writeFile(tempFilePath, code)),
    Promise.map([
      'case.js',
      'grpc.js',
      'request.js',
      'type.js',
    ], (srcPath)=>copyFile(
      path.resolve('node_modules/grpc-vuex/src', srcPath),
      path.resolve(dirPath, srcPath)
    )),
  ]))
  .then(()=>{
    return new Promise((resolve, reject)=>{
      webpack({
        entry: tempFilePath,
        output: {
          filename: path.basename(outputFilePath),
          path: path.resolve(path.dirname(outputFilePath)),
          libraryTarget: 'commonjs',
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
  .then(()=>removeDir(dirPath))
  .catch((err)=>console.error(err))
  