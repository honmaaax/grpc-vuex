import program from 'commander'
import _ from 'lodash'
import Case from 'case'

import { readFile } from './file'
import { toJSON, getServices, getMessages, revertNames } from './protobuf'
import { generate } from './generator'

program
  .usage('<proto_file_path> <output_dir>')
  .arguments('<proto_file_path> <output_dir>')
  .parse(process.argv)
if (
  !_.isArray(program.args) ||
  _.size(program.args) !== 2
) {
  throw new Error('Undefined file paths')
}
const [ protoFilePath, outputDir ] = program.args
readFile(protoFilePath)
  .then(toJSON)
  .then((json)=>{
    const services = getServices(json)
    const messages = getMessages(json)
    const mutationTypes = getMutationTypes(services)
    const actions = getActions(services)
    return {
      mutationTypes,
      actions,
      messages,
      host: 'http://localhost:8080/',
    }
  })
  .then(generate)
  .then((generatedCode)=>{
    console.log(generatedCode)
    console.log('Finished!')
  })
  .catch((err)=>console.error(err))
