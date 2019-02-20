const program = require('commander')

program
  .usage('<output_file_path> <proto_file_paths ...>')
  .arguments('<output_file_path> <proto_file_paths ...>')
  .option('-e, --endpoint <url>', 'Add endpoint')
  .option('-d, --debug', 'Debug Mode')
  .parse(process.argv)
if (
  !Array.isArray(program.args) ||
  program.args.length < 2
) {
  throw new Error('Undefined file paths')
}
const [ outputFilePath, ...protoFilePaths ] = program.args
const results = {
  outputFilePath,
  protoFilePaths,
  endpoint: program.endpoint || 'http://localhost:8080',
  isDebugMode: program.debug,
}
if (program.debug) console.log(results)
module.exports = results
