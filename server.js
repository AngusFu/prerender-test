/**
 * @author angusfu1126@qq.com
 * @date   2017-01-17
 */
'use strict';

const http = require('http');
const fs   = require('fs');
const url  = require('url');
const path = require('path');

const MINE_MAP = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
};
const staticDir = path.join(__dirname, 'static');

http.createServer(function (req, res) {
  let { pathname } = url.parse(req.url);
  console.log(req.url);
  
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  let filePath = path.join(staticDir, pathname);
  fs.readFile(filePath, (err, data) => {
     let code = 200;
     if (err) {
       code = 404;
       data = '404 Not Found';
     }
     
     res.writeHead(code, { 'Content-Type': MINE_MAP[path.extname(filePath)] || 'text/html' });
     res.end(data);
  });
}).listen(12345);

console.log('server running at port 12345');
