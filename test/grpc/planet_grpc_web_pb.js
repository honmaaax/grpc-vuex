/**
 * @fileoverview gRPC-Web generated client stub for planet
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.planet = require('./planet_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.planet.PlanetServiceClient =
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
proto.planet.PlanetServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.planet.PlanetServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.planet.PlanetServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.planet.PlanetRequest,
 *   !proto.planet.PlanetReply>}
 */
const methodInfo_PlanetService_CreatePlanet = new grpc.web.AbstractClientBase.MethodInfo(
  proto.planet.PlanetReply,
  /** @param {!proto.planet.PlanetRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.planet.PlanetReply.deserializeBinary
);


/**
 * @param {!proto.planet.PlanetRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.planet.PlanetReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.planet.PlanetReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.planet.PlanetServiceClient.prototype.createPlanet =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/planet.PlanetService/CreatePlanet',
      request,
      metadata,
      methodInfo_PlanetService_CreatePlanet,
      callback);
};


/**
 * @param {!proto.planet.PlanetRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.planet.PlanetReply>}
 *     The XHR Node Readable Stream
 */
proto.planet.PlanetServicePromiseClient.prototype.createPlanet =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.createPlanet(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.planet;

