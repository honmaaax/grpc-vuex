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
      .catch(this.error)
  }
  error (err) {
    console.error(err)
  }
}
