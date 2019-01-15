import Case from './case'
import Type from './type'

// 最初はnew GetUsersRequest()
// usersはnew GetUsersRequest().setUsersList()
// usersの中身はnew User().setName()
// pagenationはnew GetUsersRequest().setPagination()
// pagenationの中身はnew Pagenation().setPage()
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
