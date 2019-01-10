import Case from './case'

export default class Request {
  constructor (params, Message, models) {
    const req = new Message()
    if ( params ) {
      Object.keys(params).forEach((key)=>{
        const value = params[key]
        const list = value.forEach((item)=>{
          const r = new Message[models[key]]()
          Object.keys(item).forEach((key)=>{
            const value = item[key]
            console.log({value,key})
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
  }
}
