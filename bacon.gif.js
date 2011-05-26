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
        this.beacon = beacon;
        this.options = options || {};
        this.queryPrefix = (this.options.queryPrefix)?"?":"";
        this.enabled = this.options.hasOwnProperty("enabled")?this.options.enabled:true;
    }
    BGIF.prototype.log = function(kv){
        if(!this.enabled){
            return;
        }
        var p = [];
        kv._cb = (new Date()).getTime();
        for(var k in kv){
            p.push("&");
            p.push(encodeURIComponent(k));
            p.push("=");
            p.push(encodeURIComponent(kv[k]));
        }
        var src = this.beacon + this.queryPrefix + p.join("").substr(1);
        (new Image()).src = src;
    };
    ns.BGIF = BGIF;
})(n$);

