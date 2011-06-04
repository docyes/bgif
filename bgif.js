var n$ = {};
(function(ns) {
  /**
   * THAT'S ONE BGIF!
   *
   * @param {String} beacon The fully qualified HTTP resource to handle
   *                 requests.
   * @param {Object} options Optional object literal of optional config
   *                                  params..
   *                 @param {Boolean} enabled Defaults to true,
   *                                  disable/enable HTTP requests.
   *                 @param {Number}  defer Defaults to 0, the total ms to
   *                                  wait before making a request.
   *                 @param {Number}  concurrent Defaults to 1, the maximum
   *                                  number of concurrent connections.
   */
  function BGIF(path, options) {
    this.path = path;
    this.options = options || {};
    this.enabled = this.options.hasOwnProperty('enabled') ?
        this.options.enabled : true;
    this.defer = this.options.hasOwnPoperty('defer') ? this.options.defer : 0;
    this.concurrent = this.options.hasOwnProperty('concurrent') ?
        this.options.concurrent : 1;
    this.connections = [];
  }
  /**
   * LOG DAT SHIT!
   *
   * @param {Object} kv A one-level deep object literal of key/value pairs.
   *                    Don't worry about escaping BGIF do it!
   */
  BGIF.prototype.log = function(kv) {
    if (!this.enabled) {
      return;
    }
    if (this.connections.length >= this.concurrent) {
      return;
    }
    var time = (new Date()).getTime();
    var connection = setTimeout(function() {
      var src, params = [],
          img = new Image(),
          kv._time = time;
      for (var k in kv) {
        params.concat(
            ['&', encodeURIComponent(k), '=', encodeURIComponent(kv[k])]
        );
      }
      src = this.path + '?' + params.join('').substr(1);
      img.onload = function() {
        for (var i = 0, l = this.connections.length; i < l; i++) {
          if (this.connections[i] == connection) {
            this.connections.splice(i, 1);
            break;
          }
        }
      }
      img.src = src;
    }, this.defer);
    this.connections.push(connection);
  };
  ns.BGIF = BGIF;
})(n$);

