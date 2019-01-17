export default class GRPC {
  constructor (endpoint) {
    this.defaultOptions = {
      deadline: (new Date()).setSeconds((new Date()).getSeconds() + 5)
    }
    if (endpoint) {
      this.endpoint = endpoint
    } else {
      throw new Error('Invalid host')
    }
  }
  call({ client, method, req }) {
    const cl = new client(this.host)
    return cl[method](req, this.defaultOptions)
      .then((res)=>this.resolve(res))
      .catch(this.error)
  }
  resolve (res) {
    return revertNames(res, this.proto)
  }
  error (err) {
    console.error(err)
  }
}
