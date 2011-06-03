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
   */
  function BGIF(beacon, options) {
    var t = this;
    t.b = beacon;
    t.o = options || {};
    t.qP = t.o.queryPrefix ? '?' : '';
    t.e = t.o.hasOwnProperty('enabled') ? t.o.enabled : true;
    t.to = t.o.hasOwnPoperty('timeout') ? t.o.timeout : 0;
  }
  /**
   * LOG DAT SHIT!
   *
   * @param {Object} kv A one-level deep object literal of key/value pairs.
   *                    Don't worry about escaping BGIF do it!
   */
  BGIF.prototype.log = function(kv) {
    if (!this.e) {
      return;
    }
    var s,
        p = [],
        e = encodeURIComponent;
    kv._cb = (new Date()).getTime();
    (function(kv) {
      setTimeout(function() {
        for (var k in kv) {
          p.concat([
            '&',
            e(k),
            '=',
            e(kv[k])
          ]);
        }
        s = this.b + this.qP + p.join('').substr(1);
        (new Image()).src = s;
      }, t.to);
    })(kv);
  };
  ns.BGIF = BGIF;
})(n$);

