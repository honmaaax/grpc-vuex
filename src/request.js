import Case from './case'

export function createRequest (params, Message, models) {
  const req = new Message()
  if ( params ) {
    Object.keys(params).forEach((key)=>{
      const value = params[key]
      const list = value.map((item)=>{
        const r = new Message[models[key]]()
        Object.keys(item).forEach((key)=>{
          const value = item[key]
          if ( value !== undefined ) {
            const setter = `set${Case.pascal(key)}${Array.isArray(value) ? 'List' : ''}`
            if (!r[setter]) throw new Error(`Invalid request parameters. '${key}'`)
            r[setter](value)
          }
        })
        return r
      })
      req[`set${Case.pascal(key)}List`](list)
    })
  }
  return req
}
