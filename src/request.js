import Case from './case'

export default class Request {
  constructor (params, Message, models) {
    const req = new Message()
    if ( params ) {
      Object.keys(params).forEach((value, key)=>{
        const list = value.forEach((item)=>{
          const r = new Message[models[key]]()
          Object.keys(item).forEach((value, key)=>{
            if ( value !== undefined ) {
              const setter = `set${Case.pascal(key)}`
              if (!r[setter]) throw new Error(`Invalid request parameters. '${key}'`)
              r[setter](value)
            }
          })
          return r
        })
        req[`set${Case.pascal(key)}List`](list)
      })
    }
  }
}
