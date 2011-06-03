var n$ = {};
(function(ns) {
  /**
   * THAT'S ONE BGIF!
   *
   * @param {String} beacon The fully qualified HTTP resource to handle
   *                 beacon requests.
   * @param {Object} options Optional object literal of options.
   *                 @param {Boolean} enabled Defaults to true,
   *                                  disable/enable HTTP requests.
   *                 @param {Boolean} queryPrefix Defaults to empty false,
   *                                  add or remove the ? prefix from passed
   *                                  beacon string.
   *                 @param {Number}  timeout Defaults to 0, rate-limits
   *                                  requests to the beacon.
   *                 @param {Number}  concurrent Defaults to 1, max concurrent connections.
   */
  function BGIF(beacon, options) {
    var t = this;
    t.beacon = beacon;
    t.o = options || {};
    t.queryPrefix = t.o.queryPrefix ? '?' : '';
    t.enabled = t.o.hasOwnProperty('enabled') ? t.o.enabled : true;
    t.timeout = t.o.hasOwnPoperty('timeout') ? t.o.timeout : 0;
    t.concurrent = t.o.hasOwnProperty('concurrent') ? t.o.concurrent : 1;
    t.connections = [];
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
    var s,
        p = [],
        e = encodeURIComponent;
    kv._cb = (new Date()).getTime();
    (function(kv) {
      if (this.connections.length>=this.concurrent){
        clearTimeout(this.concurrent.shift());
      }
      var connection = setTimeout(
        (function(connection) {
          return function() {
            for (var k in kv) {
              p.concat([
                '&',
                e(k),
                '=',
                e(kv[k])
              ]);
            }
            s = this.beacon + this.queryPrefix + p.join('').substr(1);
            (new Image()).src = s;
            for (var i=0, l=this.connections.length; i<l; i++) {
              if (this.connections[i]==connection) {
                this.connections.splice(i);
                break;
              }
            }
          }
        })(connection),
        this.timeout
      );
      this.connections.push(connection);
    })(kv);
  };
  ns.BGIF = BGIF;
})(n$);

