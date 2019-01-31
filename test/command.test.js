import childProcess from 'child_process'

describe('command', ()=>{
  it('returns outputFilePath, protoFilePath and endpoint', () => {
    const command = 'node ./src/command.js ./hoge.js ./fuga.proto -d'
    return new Promise((resolve, reject)=>{
      childProcess.exec(command, (err, stdout, stderr)=>{
        if (err) {
          reject(err)
        } else if (stderr) {
          reject(stderr)
        } else {
          resolve(stdout)
        }
      })
    }).then((results)=>{
      expect(results).toBe(
`{ outputFilePath: './hoge.js',
  protoFilePaths: [ './fuga.proto' ],
  endpoint: 'http://localhost:8080' }
`
      )
    })
  })
  it('returns multiple protoFilePaths', () => {
    const command = 'node ./src/command.js ./hoge.js ./fuga.proto ./piyo.proto -d'
    return new Promise((resolve, reject)=>{
      childProcess.exec(command, (err, stdout, stderr)=>{
        if (err) {
          reject(err)
        } else if (stderr) {
          reject(stderr)
        } else {
          resolve(stdout)
        }
      })
    }).then((results)=>{
      expect(results).toBe(
`{ outputFilePath: './hoge.js',
  protoFilePaths: [ './fuga.proto', './piyo.proto' ],
  endpoint: 'http://localhost:8080' }
`
      )
    })
  })
})
