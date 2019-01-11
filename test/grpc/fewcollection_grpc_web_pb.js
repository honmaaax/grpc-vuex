/**
 * @fileoverview gRPC-Web generated client stub for fewcollection
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.fewcollection = require('./fewcollection_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.fewcollection.UserServicesClient =
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
proto.fewcollection.UserServicesPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.fewcollection.UserServicesClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.fewcollection.UserServicesClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fewcollection.GetUsersRequest,
 *   !proto.fewcollection.GetUsersReply>}
 */
const methodInfo_UserServices_GetUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fewcollection.GetUsersReply,
  /** @param {!proto.fewcollection.GetUsersRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.fewcollection.GetUsersReply.deserializeBinary
);


/**
 * @param {!proto.fewcollection.GetUsersRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fewcollection.GetUsersReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fewcollection.GetUsersReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fewcollection.UserServicesClient.prototype.getUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fewcollection.UserServices/GetUsers',
      request,
      metadata,
      methodInfo_UserServices_GetUsers,
      callback);
};


/**
 * @param {!proto.fewcollection.GetUsersRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fewcollection.GetUsersReply>}
 *     The XHR Node Readable Stream
 */
proto.fewcollection.UserServicesPromiseClient.prototype.getUsers =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getUsers(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.fewcollection;

