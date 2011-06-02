import tornado, tornado.httpserver, tornado.ioloop, tornado.web

class MainHandler(tornado.web.RequestHandler):
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
    (r'/', MainHandler),
])

if __name__ == '__main__':
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
