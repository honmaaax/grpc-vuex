export function stringifyGoogleTimestamp (googleTimestamp = {}) {
  return new Date((googleTimestamp.seconds || 0) * 1000).toISOString()
}

export function convertResponse (data) {
  if ( Array.isArray(data) ) {
    return data.map(convertResponse)
  } else if ( typeof data === 'object' && data !== null ) {
    if ( data.hasOwnProperty('nanos') && data.hasOwnProperty('seconds') ) {
      return stringifyGoogleTimestamp(data)
    } else {
      return Object.keys(data).reduce((result, key)=>{
        return Object.assign({}, result, {[key]: convertResponse(data[key])})
      }, {})
    }
  } else {
    return data
  }
}