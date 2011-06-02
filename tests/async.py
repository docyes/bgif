import tornado, tornado.httpserver, tornado.ioloop, tornado.web

class HomeHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("""
        <html>
            <head><title>async</title></head>
            <body>
                <script>
                    var img = new Image();
                    img.src = '/img.jpg?' + (new Date()).getTime();
                    alert('test');
                </script>
            </body>
        </html>
        """)

class ImgHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous 
    def get(self):
        content = open('async.jpg').read()
        show = 0.75
        self.set_header('Content-Type', 'image/jpeg')
        self.set_header('Accept-Ranges', 'bytes')
        size = int((1 - show) * len(content))
        self.write(content[:-size])
        self.flush()
    
    def _on_close(self):
        print '-'

application = tornado.web.Application([
    (r'/', HomeHandler),
    (r'/img.jpg', ImgHandler),
])

if __name__ == '__main__':
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
