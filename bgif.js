(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  }  else {
    root.BGIF = factory();
  }
}(this, function() {
  /**
   * THAT'S ONE BGIF!
   *
   * @param {String} beacon The fully qualified HTTP resource to handle
   *                 requests.
   * @param {Object} options Optional object literal of optional config
   *                                  params..
   *                 @param {Boolean} enabled Defaults to true, disable/enable HTTP requests.
   *                 @param {Number} defer Defaults to 0, the total ms to wait before making a request.
   *                 @param {Number} concurrent Defaults to 1, the maximum number of concurrent connections.
   *                 @param {Number} timeout Defaults to 250, how long to wait for a request before timing out.
   *                 @param {Number} retry Defaults to 0, the number of times to retry a failed request.
   */
  function BGIF(path, options) {
    this.path = path;
    this.options = options || {};
    this.enabled = this.options.hasOwnProperty('enabled') ?
        this.options.enabled : true;
    this.defer = this.options.hasOwnProperty('defer') ? this.options.defer : 0;
    this.concurrent = this.options.hasOwnProperty('concurrent') ?
        this.options.concurrent : 1;
    this.timeout = this.options.hasOwnProperty('timeout') ? 
        this.options.timeout : 250
    this.retry = this.options.hasOwnProperty('retry') ?
        this.options.retry : 0;
    this.connections = [];
    this.tzoffset = (new Date()).getTimezoneOffset();
  }
  /**
   * LOG DAT!
   *
   * @param {Object} kv A one-level deep object literal of key/value pairs.
   *                    Don't worry about escaping BGIF do it!
   * @param {Object} options Optional object literal of optional config params...
   *                 @param {Function} error Callback for when a log request could not be fullfilled.
   *                 @param {Function} success Callback for when a log request is fullfilled.
   *                 @param {Number} count Comparison against retry setting.
   */
  BGIF.prototype.log = function(kv, options) {
    if (!this.enabled) {
      return;
    }
    var options = options || {},
      errorCallback = options.error,
      successCallback = options.success,
      count = options.hasOwnProperty('count') || 0;
    if (this.connections.length >= this.concurrent) {
      if (errorCallback && count >= this.retry) {
        errorCallback('max', kv, options);
      } else {
        options.count = count++;
        this.log(kv, options);
      }
      return;
    }
    var time = (new Date()).getTime(), that = this;
    var connection = setTimeout(function() {
      var src, timeout, params = [],
        img = new Image();
      kv.client_time = time;
      kv.client_tzoffset = that.tzoffset;
      for (var k in kv) {
        params = params.concat(
          ['&', encodeURIComponent(k), '=', encodeURIComponent(kv[k])]
        );
      }
      src = that.path + '?' + params.join('').substr(1);
      timeout = setTimeout(function() {
        img = null;
        that.removeConnection(connection);
        if (errorCallback && count >= this.retry) {
          errorCallback('timeout', kv, options); 
        } else {
          options.count = count++;
          this.log(kv, options);
        }
      }, that.timeout);
      img.onload = img.onerror = function() {
        var etype = event.type;
        clearTimeout(timeout);
        that.removeConnection(connection);
        if (errorCallback && etype === 'error') {
          if (count >= this.retry) {
            errorCallback('load', kv, options);
          } else {
            options.count = count++;
            this.log(kv, options);       
          }
        }
        if (successCallback && etype === 'load') {
          successCallback('load', kv, options);
        }
      };
      img.src = src;
    }, this.defer);
    this.connections.push(connection);
  };
  BGIF.prototype.removeConnection = function(connection){
    for (var i = 0, l = this.connections.length; i < l; i++) {
      if (this.connections[i] == connection) {
        this.connections.splice(i, 1);
        break;
      }
    }
  };
  return BGIF;
}));
