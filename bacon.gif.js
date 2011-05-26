var n$ = {};
(function(ns){
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
        var params = [];
        kv._cb = (new Date()).getTime();
        for(var k in kv){
            params.push("&");
            params.push(encodeURIComponent(k));
            params.push("=");
            params.push(encodeURIComponent(kv[k]));
        }
        var src = this.beacon + this.queryPrefix + params.join("").substr(1);
        (new Image()).src = src;
    };
    ns.BGIF = BGIF;
})(n$);

