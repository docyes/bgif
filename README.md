    #######  #     #     #     #######   ###    #####   
       #     #     #    # #       #      ###   #     #  
       #     #     #   #   #      #       #    #        
       #     #######  #     #     #      #      #####   
       #     #     #  #######     #                  #  
       #     #     #  #     #     #            #     #  
       #     #     #  #     #     #             #####   

                #######  #     #  #######  
                #     #  ##    #  #        
                #     #  # #   #  #        
                #     #  #  #  #  #####    
                #     #  #   # #  #        
                #     #  #    ##  #        
                #######  #     #  #######  

          ######    #####   ###  #######   ###   
          #     #  #     #   #   #         ###   
          #     #  #         #   #         ###   
          ######   #  ####   #   #####      #    
          #     #  #     #   #   #               
          #     #  #     #   #   #         ###   
          ######    #####   ###  #         ###   

overview
--------
Inspired by the spacer.gif, bgif is a little bitty javascript library for logging from the browser to http access logs, asyncronously and fast. Based on the original work from www.geobacon.com

example
-------
``` html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title></title>
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div id="container">
        <a href="#" id="buynow">Buy Now!</a>
    </div>
    <script src="bgif.js"></script>
    <script>
    var bgif = new BGIF('http://featureblend.com/static/beacon.gif');
    document.getElementById('buynow').addEventListener('mouseover', function(){
        bgif.log({
            type: 'mouseover',
            target: 'a',
            goal: 'buynow'
        });
    }, false);
    </script>
</body>
</html>
```

access.log
----------
    $ tail -f /var/log/access.log
    XXX.XXX.XXX.XXX - - [26/May/2011:14:56:29 -0500] "GET /static/img/beacon.gif?v=32547type=mouseover&target=a&goal=buynow&_cb=1306439789042 HTTP/1.1" 200 356 "http://geobacon.com/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0.1) Gecko/20100101 Firefox/4.0.1" "-"


