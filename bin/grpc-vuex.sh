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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("case");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("protobufjs");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "commander"
var external_commander_ = __webpack_require__(2);
var external_commander_default = /*#__PURE__*/__webpack_require__.n(external_commander_);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(0);
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_);

// EXTERNAL MODULE: external "webpack"
var external_webpack_ = __webpack_require__(6);
var external_webpack_default = /*#__PURE__*/__webpack_require__.n(external_webpack_);

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(4);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);

// EXTERNAL MODULE: external "bluebird"
var external_bluebird_ = __webpack_require__(5);
var external_bluebird_default = /*#__PURE__*/__webpack_require__.n(external_bluebird_);

// CONCATENATED MODULE: ./src/file.js




function readFile(filePath) {
  return external_bluebird_default.a.promisify(external_fs_default.a.readFile)(filePath, 'utf-8')
}

function writeFile(outputFilePath, code) {
  return external_bluebird_default.a.promisify(external_fs_default.a.writeFile)(outputFilePath, code)
}

// EXTERNAL MODULE: external "protobufjs"
var external_protobufjs_ = __webpack_require__(3);
var external_protobufjs_default = /*#__PURE__*/__webpack_require__.n(external_protobufjs_);

// EXTERNAL MODULE: external "case"
var external_case_ = __webpack_require__(1);
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

function getActions(services) {
  return external_lodash_default.a.chain(services)
    .map(({ methods }, serviceName)=>{
      return external_lodash_default.a.map(methods, ({ requestType }, methodName)=>{
        const name = external_case_default.a.camel(methodName)
        return {
          name,
          client: `${serviceName}PromiseClient`,
          method: name,
          message: requestType,
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
// CONCATENATED MODULE: ./src/generator.js



function generateImportCode () {
  return `import GRPC from '../src/grpc'
import { createRequest } from '../src/request'`
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

function generateInitGrpcCode (host) {
  return `export const grpc = new GRPC({ host: '${host}' })`
}

function generateRequestCode (message, models) {
  return `const req = createRequest(params, ${message}, ${JSON.stringify(models)})`
}

function generateActionsCode (actions, models) {
  return actions.map(({ name, client, method, message, mutationType })=>
`export function ${name} (params, options) {
  ${generateRequestCode(message, models[message])}
  return grpc.call({
      client: ${client},
      method: '${method}',
      messageName: '${message}',
      params,
    })
    .then((res)=>{
      if (options && options.hasMutation) context.commit(types.${mutationType}, res)
      return res
    })
}`
  ).join('\n\n')
}

function generateCode ({ mutationTypes, actions, messages, host }) {
  return `${generateImportCode()}

${generateMutationTypesCode(mutationTypes)}

${generateInitGrpcCode(host)}
${generateActionsCode(actions, messages)}
`
}
// CONCATENATED MODULE: ./src/index.js








external_commander_default.a
  .usage('<proto_file_path> <output_file_path>')
  .arguments('<proto_file_path> <output_file_path>')
  .parse(process.argv)
if (
  !external_lodash_default.a.isArray(external_commander_default.a.args) ||
  external_lodash_default.a.size(external_commander_default.a.args) !== 2
) {
  throw new Error('Undefined file paths')
}
const [ protoFilePath, src_outputFilePath ] = external_commander_default.a.args
const tempFilePath = './dist/_grpc-vuex-index.js'
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
  .then(generateCode)
  .then((code)=>writeFile(tempFilePath, code))
  .then(()=>{
    return new Promise((resolve, reject)=>{
      external_webpack_default()({
        entry: tempFilePath,
        output: {
          filename: src_outputFilePath,
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
  

/***/ })
/******/ ]);