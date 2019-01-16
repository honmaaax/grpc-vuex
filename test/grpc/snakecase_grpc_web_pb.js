/**
 * @fileoverview gRPC-Web generated client stub for snakecase
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.snakecase = require('./snakecase_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.snakecase.SnakeServicesClient =
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
proto.snakecase.SnakeServicesPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.snakecase.SnakeServicesClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.snakecase.SnakeServicesClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.snakecase.GetSnakeRequest,
 *   !proto.snakecase.GetSnakeReply>}
 */
const methodInfo_SnakeServices_GetSnake = new grpc.web.AbstractClientBase.MethodInfo(
  proto.snakecase.GetSnakeReply,
  /** @param {!proto.snakecase.GetSnakeRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.snakecase.GetSnakeReply.deserializeBinary
);


/**
 * @param {!proto.snakecase.GetSnakeRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.snakecase.GetSnakeReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.snakecase.GetSnakeReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.snakecase.SnakeServicesClient.prototype.getSnake =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/snakecase.SnakeServices/GetSnake',
      request,
      metadata,
      methodInfo_SnakeServices_GetSnake,
      callback);
};


/**
 * @param {!proto.snakecase.GetSnakeRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.snakecase.GetSnakeReply>}
 *     The XHR Node Readable Stream
 */
proto.snakecase.SnakeServicesPromiseClient.prototype.getSnake =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getSnake(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.snakecase;

