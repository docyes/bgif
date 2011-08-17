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
   *                 @param {Number}  timeout Defaults to 250,
   *                                  how long to wait for a request
   *                                  before timing out.
   */
  function BGIF(path, options) {
    this.path = path;
    this.options = options || {};
    this.enabled = this.options.hasOwnProperty('enabled') ?
        this.options.enabled : true;
    this.defer = this.options.hasOwnPoperty('defer') ? this.options.defer : 0;
    this.concurrent = this.options.hasOwnProperty('concurrent') ?
        this.options.concurrent : 1;
    this.timeout = this.options.hasOwnProperty('timeout') ? 
        this.options.timeout : 250
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
    var time = (new Date()).getTime(), that = this;
    var connection = setTimeout(function() {
      var src, timeout, params = [],
          img = new Image();
      kv._time = time;
      for (var k in kv) {
        params.concat(
            ['&', encodeURIComponent(k), '=', encodeURIComponent(kv[k])]
        );
      }
      src = that.path + '?' + params.join('').substr(1);
      timeout = setTimeout(function() {
        img = null;
        that.removeConnection(connection);
      }, that.timeout);
      img.onload = img.onerror = function() {
        clearTimeout(timeout);
        that.removeConnection(connection);
      };
      img.src = src;
    }, this.defer);
    this.connections.push(connection);
  };
  BGIF.prototype.removeConnection = function(connection){
    for (var i = 0, l = this.connections.length; i < l; i++) {
      if (this.connections[i] == id) {
        this.connections.splice(i, 1);
        break;
      }
    }
  };
  ns.BGIF = BGIF;
})(n$);

