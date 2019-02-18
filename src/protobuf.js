import _ from 'lodash'
import protobuf from 'protobufjs'
import Case from 'case'

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
  const services = _.chain(json)
    .result('nested')
    .toArray()
    .first()
    .result('nested')
    .map((value, key)=>{
      return _.has(value, 'methods') && [key, value]
    })
    .compact()
    .fromPairs()
    .value()
  return (_.isEqual(services, {})) ? null : services
}

export function getMessages(json) {
  return _.chain(json)
    .result('nested')
    .toArray()
    .first()
    .result('nested')
    .map((value, key)=>{
      return _.has(value, 'fields') && [key, value]
    })
    .compact()
    .fromPairs()
    .value()
}

export function getModels(messages, namespace) {
  return _.mapValues(messages, (message)=>{
    return _.chain(message.fields)
      .toPairs()
      .filter(([ name, { type } ])=>/^[A-Z]/.test(type))
      .fromPairs()
      .mapValues(({ type })=>({ type, namespace }))
      .value()
  })
}

export function getMutationTypes(services) {
  if (!services) return null
  return _.chain(services)
    .map(({ methods }, serviceName)=>{
      return _.map(methods, (value, methodName)=>`${serviceName}-${methodName}`)
    })
    .flatten()
    .map(Case.constant)
    .value()
}

export function getActions(services, protoName) {
  if (!services) return null
  return _.chain(services)
    .map(({ methods }, serviceName)=>{
      return _.map(methods, ({ requestType, responseType }, methodName)=>{
        const name = Case.camel(methodName)
        return {
          protoName,
          name,
          client: `${serviceName}PromiseClient`,
          method: name,
          message: requestType,
          response: responseType,
          mutationType: Case.constant(`${serviceName}-${methodName}`),
        }
      })
    })
    .flatten()
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