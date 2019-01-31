#!/usr/bin/env node
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const program = __webpack_require__(10)

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
}
if (program.debug) console.log(results)
module.exports = results


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("protobufjs");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("case");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(2);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);

// EXTERNAL MODULE: external "bluebird"
var external_bluebird_ = __webpack_require__(1);
var external_bluebird_default = /*#__PURE__*/__webpack_require__.n(external_bluebird_);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(0);
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_);

// EXTERNAL MODULE: external "webpack"
var external_webpack_ = __webpack_require__(8);
var external_webpack_default = /*#__PURE__*/__webpack_require__.n(external_webpack_);

// EXTERNAL MODULE: ./src/command.js
var src_command = __webpack_require__(4);

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(3);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);

// CONCATENATED MODULE: ./src/file.js





function readFile(filePath) {
  return external_bluebird_default.a.promisify(external_fs_default.a.readFile)(filePath, 'utf-8')
}

function writeFile(outputFilePath, code) {
  return external_bluebird_default.a.promisify(external_fs_default.a.writeFile)(outputFilePath, code)
}

function copyFile(src, dist) {
  return readFile(src)
    .then((contents)=>writeFile(dist, contents))
}

function makeDir(dirPath) {
  if ( external_fs_default.a.existsSync(dirPath) ) return external_bluebird_default.a.resolve()
  return external_bluebird_default.a.promisify(external_fs_default.a.mkdir)(dirPath)
}

function removeDir(dirPath) {
  if ( !external_fs_default.a.existsSync(dirPath) ) return external_bluebird_default.a.resolve()
  return external_bluebird_default.a.promisify(external_fs_default.a.readdir)(dirPath)
    .then((files)=>{
      return external_bluebird_default.a.map(files, (file)=>{
        external_bluebird_default.a.promisify(external_fs_default.a.unlinkSync)(external_path_default.a.resolve(dirPath, file))
      })
    })
    .then(()=>external_bluebird_default.a.promisify(external_fs_default.a.rmdir)(dirPath))
}

function getProtocDependencies(protoFilePathAndName) {
  const protoFilePath = external_path_default.a.dirname(protoFilePathAndName) || './'
  return external_bluebird_default.a.promisify(external_fs_default.a.readFile)(protoFilePathAndName)
    .then((buf)=>buf.toString())
    .then((proto)=>{
      return external_lodash_default.a.chain(proto.match(/import (?:'([^']+?)'|"([^"]+?)")/g))
        .map((str)=>str.match(/import (?:'([^']+?)')|(?:"([^"]+?)")/, '$1'))
        .map((m)=>external_lodash_default.a.nth(m, 2))
        .value()
    })
    .then((files)=>{
      const dirs = [
        protoFilePath,
        `${process.env.GOPATH}/src`,
        `${process.env.GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis`
      ]
      return external_bluebird_default.a.map(dirs, (dir)=>{
        return external_bluebird_default.a.map(files, (file)=>{
          return external_bluebird_default.a.promisify(external_fs_default.a.stat)(external_path_default.a.resolve(dir, file))
            .then(()=>({dir, file}), ()=>{})
        })
      })
    })
    .then((result)=>{
      return external_lodash_default.a.chain(result)
        .flattenDeep()
        .compact()
        .value()
    })
    .then((files)=>{
      if (!external_lodash_default.a.size(files)) return null
      return external_bluebird_default.a.map(files, ({ dir, file })=>{
        return getProtocDependencies(external_path_default.a.resolve(dir, file))
          .then((dependencies)=>{
            if (!dependencies) return { dir, file }
            return { dir, file, dependencies }
          })
      })
    })
}
// EXTERNAL MODULE: external "protobufjs"
var external_protobufjs_ = __webpack_require__(5);
var external_protobufjs_default = /*#__PURE__*/__webpack_require__.n(external_protobufjs_);

// EXTERNAL MODULE: external "case"
var external_case_ = __webpack_require__(6);
var external_case_default = /*#__PURE__*/__webpack_require__.n(external_case_);

// CONCATENATED MODULE: ./src/protobuf.js




function getRoot(proto) {
  const { root } = external_protobufjs_default.a.parse(proto)
  return root
}

function toJSON(proto) {
  return getRoot(proto).toJSON()
}

function fromJSON(json) {
  console.log('protobuf=', external_protobufjs_default.a)
  const message = new external_protobufjs_default.a.Message()
  console.log('message=', message)
  return message.fromObject(message)
}

function getServices(json) {
  return external_lodash_default.a.chain(json)
    .result('nested')
    .toArray()
    .first()
    .result('nested')
    .map((value, key)=>{
      return external_lodash_default.a.has(value, 'methods') && [key, value]
    })
    .compact()
    .fromPairs()
    .value()
}

function getMessages(json) {
  return external_lodash_default.a.chain(json)
    .result('nested')
    .toArray()
    .first()
    .result('nested')
    .map((value, key)=>{
      return external_lodash_default.a.has(value, 'fields') && [key, value]
    })
    .compact()
    .fromPairs()
    .value()
}

function getModels(messages) {
  return external_lodash_default.a.mapValues(messages, (message)=>{
    return external_lodash_default.a.chain(message.fields)
      .toPairs()
      .filter(([ name, { rule } ])=>(rule === 'repeated'))
      .fromPairs()
      .mapValues(({ type })=>type)
      .value()
  })
}

function getMutationTypes(services) {
  return external_lodash_default.a.chain(services)
    .map(({ methods }, serviceName)=>{
      return external_lodash_default.a.map(methods, (value, methodName)=>`${serviceName}-${methodName}`)
    })
    .flatten()
    .map(external_case_default.a.constant)
    .value()
}

function getActions(services, protoName) {
  return external_lodash_default.a.chain(services)
    .map(({ methods }, serviceName)=>{
      return external_lodash_default.a.map(methods, ({ requestType, responseType }, methodName)=>{
        const name = external_case_default.a.camel(methodName)
        return {
          protoName,
          name,
          client: `${serviceName}PromiseClient`,
          method: name,
          message: requestType,
          response: responseType,
          mutationType: external_case_default.a.constant(`${serviceName}-${methodName}`),
        }
      })
    })
    .flatten()
    .value()
}

function revertNames(res, schemas, schema, types) {
  if (!schema) schema = schemas
  if (external_lodash_default.a.isPlainObject(res)) {
    return external_lodash_default.a.reduce(res, (obj, value, key)=>{
      if (external_lodash_default.a.isArray(value) && /List$/.test(key)) {
        const renamed = key.match(/(.+)List$/)[1]
        if (external_lodash_default.a.has(schema.fields, renamed)) {
          key = key.match(/(.+)List$/)[1]
        }
      }
      obj[key] = revertNames(value, schemas, schema.fields[key], schema.nested)
      return obj
    }, {})
  } else if (external_lodash_default.a.isArray(res)) {
    return external_lodash_default.a.map(res, (r)=>revertNames(r, schemas, types[schema.type]))
  } else {
    return res
  }
}
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(7);
var external_child_process_default = /*#__PURE__*/__webpack_require__.n(external_child_process_);

// EXTERNAL MODULE: external "mkdirp"
var external_mkdirp_ = __webpack_require__(9);
var external_mkdirp_default = /*#__PURE__*/__webpack_require__.n(external_mkdirp_);

// CONCATENATED MODULE: ./src/generator.js







function generateFileByProtoc (protoFilePathAndName) {
  const protoFilePath = external_path_default.a.dirname(protoFilePathAndName) || './'
  const protoFileName =  external_path_default.a.basename(protoFilePathAndName)
  const protoFileNameWithoutExt =  external_path_default.a.basename(protoFileName, '.proto')
  const outputFilePath = './.grpc-vuex'
  const command = `protoc -I=${protoFilePath}:$GOPATH/src:$GOPATH/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis ${protoFileName} --js_out=import_style=commonjs:${outputFilePath} --grpc-web_out=import_style=commonjs,mode=grpcwebtext:${outputFilePath}`
  return new external_bluebird_default.a((resolve, reject)=>{
    external_child_process_default.a.exec(command, (err, stdout, stderr)=>{
      if (err) {
        reject(err)
      } else if (stderr) {
        reject(stderr)
      } else {
        resolve(stdout)
      }
    })
  })
    .then(()=>external_bluebird_default.a.all([
      external_bluebird_default.a.promisify(external_fs_default.a.readFile)(`./.grpc-vuex/${protoFileNameWithoutExt}_grpc_web_pb.js`, 'utf-8'),
      external_bluebird_default.a.promisify(external_fs_default.a.readFile)(`./.grpc-vuex/${protoFileNameWithoutExt}_pb.js`, 'utf-8'),
    ]))
    .then((codes)=>codes.join('\n\n'))
    .catch((err)=>{
      console.error(err)
      throw new Error(err)
    })
}

function generateFileByProtocDependencies (protoFiles, parentDir = '.') {
  return external_bluebird_default.a.map(protoFiles, ({ dir, file, dependencies })=>{
    const protoFilePath = external_path_default.a.dirname(file) || './'
    const protoFileName =  external_path_default.a.basename(file)
    const protoFileNameWithoutExt =  external_path_default.a.basename(file, '.proto')
    const outputFilePath = external_path_default.a.join('./.grpc-vuex', parentDir, protoFilePath)
    const command = `protoc -I=${external_path_default.a.resolve(dir, protoFilePath)}:$GOPATH/src:$GOPATH/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis ${protoFileName} --js_out=import_style=commonjs:${outputFilePath}`
    return external_bluebird_default.a.resolve()
      .then(()=>{
        if (external_fs_default.a.existsSync(outputFilePath)) return;
        return external_bluebird_default.a.promisify(external_mkdirp_default.a)(outputFilePath)
      })
      .then(()=>{
        return new external_bluebird_default.a((resolve, reject)=>{
          external_child_process_default.a.exec(command, (err, stdout, stderr)=>{
            if (err) {
              reject(err)
            } else if (stderr) {
              reject(stderr)
            } else {
              resolve(stdout)
            }
          })
        })
      })
      .then(()=>{
        const funcs = [external_bluebird_default.a.promisify(external_fs_default.a.readFile)(external_path_default.a.resolve('./.grpc-vuex', protoFilePath, `${protoFileNameWithoutExt}_pb.js`), 'utf-8')]
        if (dependencies) {
          funcs.push(generateFileByProtocDependencies(dependencies, protoFilePath))
        }
        return external_bluebird_default.a.all(funcs)
      })
      .then((codes)=>{
        return external_lodash_default.a.chain(codes)
          .flattenDeep()
          .join('\n')
          .value()
      })
      .catch((err)=>{
        console.error(err)
        throw new Error(err)
      })
  })
}

function generateImportCode (protos) {
  return `import GRPC from './grpc'
import { createRequest } from './request'
${protos.map(({ protoName, client })=>
`import { ${client} } from './${protoName}_grpc_web_pb'
import ${protoName} from './${protoName}_pb'`
).join('\n')}`
}

function generateMutationTypesCode (mutationTypes) {
  return external_lodash_default.a.chain(mutationTypes)
    .clone()
    .map((type)=>`  ${type}: '${type}',`)
    .unshift('export const types = {')
    .push('}')
    .join('\n')
    .value()
}

function generateInitGrpcCode (endpoint) {
  return `export const grpc = new GRPC('${endpoint}')`
}

function generateRequestCode (protoName, message, model) {
  model = external_lodash_default.a.chain(model)
    .map((value, key)=>(`${key}:${protoName}.${value}`))
    .join(',')
    .value()
  return `const req = createRequest(params, ${protoName}.${message}, {${model}})`
}

function generateActionsCode (params) {
  return external_lodash_default.a.chain(params)
    .map(({ actions, models })=>{
      return actions.map(({ protoName, name, client, method, message, mutationType })=>
`export function ${name} (params, options) {
  ${generateRequestCode(protoName, message, models[message])}
  return grpc.call({
      client: ${client},
      method: '${method}',
      req,
    })
    .then((res)=>{
      res = res.toObject()
      if (options && options.hasMutation) context.commit(types.${mutationType}, res)
      return res
    })
}`
      )
    })
    .flatten()
    .join('\n')
    .value()
}

function generateCode (params, endpoint) {
  const mutationTypes = external_lodash_default.a.chain(params)
    .map('mutationTypes')
    .flatten()
    .value()
  const protos = external_lodash_default.a.chain(params)
    .map('actions')
    .map((actions)=>({
      protoName: actions[0].protoName,
      client: actions[0].client,
    }))
    .value()
  return `${generateImportCode(protos)}

${generateMutationTypesCode(mutationTypes)}

${generateInitGrpcCode(endpoint)}
${generateActionsCode(params)}
`
}

function _generateDtsCode (messages, actions) {
  const interfaces = external_lodash_default.a.chain(messages)
    .map(({ fields }, name)=>{
      fields = external_lodash_default.a.chain(fields)
        .map(({ type, rule }, name)=>{
          const isArray = (rule === 'repeated')
          type = {
            'int32': 'number',
          }[type] || type
          return {
            name,
            type: `${type}${isArray ? '[]': ''}`,
          }
        })
        .map(({ type, name })=>`  ${name}?:${type};`)
        .join('\n')
        .value()
      return `interface ${name} {\n${fields}\n}`
    })
    .join('\n')
    .value()
  const functions = external_lodash_default.a.chain(actions)
    .map(({ name, message, response })=>
      `export function ${name}(param:${message}):Promise<${response}>;`
    )
    .join('\n')
    .value()
  return `${interfaces}\n${functions}`
}

function generateDtsCode(params) {
  return external_lodash_default.a.chain(params)
    .map(({ messages, actions })=>_generateDtsCode(messages, actions))
    .join('\n\n')
    .value()
}

// CONCATENATED MODULE: ./src/index.js










const src_dirPath = '.grpc-vuex'
const tempFilePath = external_path_default.a.resolve(src_dirPath, 'index.js')
makeDir('.grpc-vuex')
  .then(()=>external_bluebird_default.a.all([
    external_bluebird_default.a
      .all([
        external_bluebird_default.a.map(src_command["protoFilePaths"], (p)=>readFile(p).then(toJSON)),
        external_bluebird_default.a.map(src_command["protoFilePaths"], generateFileByProtoc),
      ])
      .then(([ jsons ])=>{
        const params = jsons.map((json, i)=>{
          const protoName = external_path_default.a.basename(src_command["protoFilePaths"][i], '.proto')
          const services = getServices(json)
          const messages = getMessages(json)
          const models = getModels(messages)
          const mutationTypes = getMutationTypes(services)
          const actions = getActions(services, protoName)
          return {
            mutationTypes,
            actions,
            models,
          }
        })
        const code = generateCode(params, src_command["endpoint"])
        const dtsCode = generateDtsCode(params)
        return external_bluebird_default.a.all([
          writeFile(tempFilePath, code),
          writeFile(
            external_path_default.a.resolve(
              external_path_default.a.dirname(src_command["outputFilePath"]),
              external_path_default.a.basename(src_command["outputFilePath"], '.js') + '.d.ts'
            ),
            dtsCode
          ),
        ])
      }),
    external_bluebird_default.a.map([
      'case.js',
      'grpc.js',
      'request.js',
      'type.js',
    ], (srcPath)=>copyFile(
      external_path_default.a.resolve('./src', srcPath),
      external_path_default.a.resolve(src_dirPath, srcPath)
    )),
  ]))
  .then(()=>{
    return new external_bluebird_default.a((resolve, reject)=>{
      external_webpack_default()({
        entry: tempFilePath,
        output: {
          filename: external_path_default.a.basename(src_command["outputFilePath"]),
          path: external_path_default.a.resolve(external_path_default.a.dirname(src_command["outputFilePath"])),
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
  .then(()=>removeDir(src_dirPath))
  .catch((err)=>console.error(err))
  

/***/ })
/******/ ]);