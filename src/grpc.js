export default class GRPC {
  constructor (endpoint) {
    this.defaultOptions = {
      deadline: (new Date()).setSeconds((new Date()).getSeconds() + 5)
    }
    if (endpoint) {
      this.endpoint = endpoint
    } else {
      throw new Error('Invalid endpoint')
    }
  }
  call({ client, method, req }) {
    const cl = new client(this.endpoint)
    return cl[method](req, this.defaultOptions)
      .catch(this.error)
  }
  error (err) {
    console.error(err)
  }
}
