import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb.js'
import Case from './case'
import Type from './type'

export function _createObjectRequest (key, value, messages) {
  const req = new messages[key]()
  Object.keys(value)
    .map((key)=>[key, value[key]])
    .forEach(([key, value])=>{
      _createRequest(key, value, req, messages)
    })
  return req
}
export function _createRequest (key, value, request, messages) {
  if ( Type.isObject(value) ) {
    value = _createObjectRequest(key, value, messages)
  } else if ( Type.isArray(value) ) {
    value = value.map((value)=>{
      if ( Type.isObject(value) ) {
        return _createObjectRequest(key, value, messages)
      }
      return value
    })
  } else if ( /^(\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\+\d{2}\:\d{2})|(\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z)$/.test(value) ) {
    const timestamp = new Timestamp()
    const seconds = Math.floor((new Date(value)).getTime() / 1000)
    timestamp.setSeconds(seconds)
    timestamp.setNanos(0)
    value = timestamp
  }
  const setter = `set${Case.pascal(key)}${Array.isArray(value) ? 'List' : ''}`
  if (!request[setter]) throw new Error(`Invalid request parameters. '${key}'`)
  request[setter](value)
  return request
}

export function createRequest (params, Message, messages) {
  const request = new Message()
  if ( !params ) return;
  Object.keys(params)
    .map((key)=>[key, params[key]])
    .forEach(([key, value])=>{
      _createRequest(key, value, request, messages)
    })
  return request
}
