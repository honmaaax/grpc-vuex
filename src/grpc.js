import _ from 'lodash'
import moment from 'moment'
import protobuf from 'protobufjs'

export default class GRPC {
  constructor ({ host, proto }) {
    if (host) {
      this.host = host
    } else {
      throw new Error('Invalid host')
    }
    try {
      this.root = protobuf.parse(proto).root
    } catch(err) {
      throw new Error('Invalid proto')
    }
  }
  call({ client, method, messageName, deserialize, params }) {
    const Req = this.root.lookupType(messageName)
    const json = Req.create(params)
    const message = Req.encode(json).finish()
    const req = deserialize(message)
    const cl = new client(this.host)
    const options = {deadline: moment().add(5, 'seconds').format('x')}
    return cl[method](req, options)
      .catch(this.error)
  }
  error (err) {
    console.error(err)
  }
}
