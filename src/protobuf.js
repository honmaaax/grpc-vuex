import _ from 'lodash'
import protobuf from 'protobufjs'

export function getRoot(proto) {
  const { root } = protobuf.parse(proto)
  return root
}

export function toJSON(proto) {
  return getRoot(proto).toJSON()
}

export function fromJSON(json) {
  console.log('protobuf=', protobuf)
  const message = new protobuf.Message()
  console.log('message=', message)
  return message.fromObject(message)
}

export function getServices(json) {
  return _.chain(json.nested.helloworld.nested)
    .map((value, key)=>{
      return _.has(value, 'methods') && [key, value]
    })
    .compact()
    .fromPairs()
    .value()
}

export function getMessages(json) {
  return _.chain(json.nested.helloworld.nested)
    .map((value, key)=>{
      return _.has(value, 'fields') && [key, value]
    })
    .compact()
    .fromPairs()
    .value()
}

export function revertNames(res, schemas, schema, types) {
  if (!schema) schema = schemas
  if (_.isPlainObject(res)) {
    return _.reduce(res, (obj, value, key)=>{
      if (_.isArray(value) && /List$/.test(key)) {
        const renamed = key.match(/(.+)List$/)[1]
        if (_.has(schema.fields, renamed)) {
          key = key.match(/(.+)List$/)[1]
        }
      }
      obj[key] = revertNames(value, schemas, schema.fields[key], schema.nested)
      return obj
    }, {})
  } else if (_.isArray(res)) {
    return _.map(res, (r)=>revertNames(r, schemas, types[schema.type]))
  } else {
    return res
  }
}