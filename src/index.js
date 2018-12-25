import program from 'commander'
import _ from 'lodash'

import { readFile } from './file'
import { toJSON, getServices, getMessages, revertNames } from './protobuf'

program
  .usage('<input_file_path> <output_file_path>')
  .arguments('<input_file_path> <output_file_path>')
  .parse(process.argv)
if (
  !_.isArray(program.args) ||
  _.size(program.args) !== 2
) {
  throw new Error('Undefined file paths')
}
const [ inputFilePath, outputFilePath ] = program.args
readFile(inputFilePath)
  .then(toJSON)
  .then((json)=>{
    console.log('json=', json)
    console.log('Finished!')
  })
  .catch((err)=>console.error(err))
