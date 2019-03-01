/**
 * @fileoverview gRPC-Web generated client stub for helloworld
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = {};
proto.helloworld = require('./timestamp_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.helloworld.TimestampServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.helloworld.TimestampServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.helloworld.TimestampServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.helloworld.TimestampServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.helloworld.TimestampRequest,
 *   !proto.helloworld.TimestampReply>}
 */
const methodInfo_TimestampService_Check = new grpc.web.AbstractClientBase.MethodInfo(
  proto.helloworld.TimestampReply,
  /** @param {!proto.helloworld.TimestampRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.helloworld.TimestampReply.deserializeBinary
);


/**
 * @param {!proto.helloworld.TimestampRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.helloworld.TimestampReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.helloworld.TimestampReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.helloworld.TimestampServiceClient.prototype.check =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/helloworld.TimestampService/Check',
      request,
      metadata,
      methodInfo_TimestampService_Check,
      callback);
};


/**
 * @param {!proto.helloworld.TimestampRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.helloworld.TimestampReply>}
 *     The XHR Node Readable Stream
 */
proto.helloworld.TimestampServicePromiseClient.prototype.check =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.check(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.helloworld;

