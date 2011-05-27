var n$ = {};
(function(ns){
    /**
     * THAT'S ONE BGIF!
     *
     * @param {String} beacon The fully qualified HTTP resource to handle beacon requests.
     * @param {Object} options
     *                 @param {Boolean} enabled Defaults to true, disable/enable HTTP requests.
     *                 @param {Boolean} queryPrefix Defaults to empty false, add or remove the ? prefix from passed beacon string. 
     */
    function BGIF(beacon, options){
        this.b = beacon;
        this.o = options || {};
        this.qP = this.o.queryPrefix ? '?' : '';
        this.e = this.o.hasOwnProperty('enabled') ? this.o.enabled : true;
    }
    /**
     * LOG DAT SHIT!
     *
     * @param {Object} kv A one-level deep object literal of key/value pairs. Don't worry about escaping BGIF do it!
     */
    BGIF.prototype.log = function(kv){
        if(!this.e){
            return;
        }
        var s,
            p = [],
            e = encodeURIComponent;
        kv._cb = (new Date()).getTime();
        for(var k in kv){
            p.concat([
                '&',
                e(k),
                '=',
                e(kv[k])
            ]);
        }
        s = this.b + this.qP + p.join('').substr(1);
        (new Image()).src = s;
    };
    ns.BGIF = BGIF;
})(n$);

