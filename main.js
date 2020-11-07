var http = require('http');
var fs = require('fs');
var url = require('url');
//var express = require('express');

const css = fs.readFileSync('style.css', 'utf8')
 
var app1 = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;

    if(_url == '/'){
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
      var templete = `
      <!doctype html>
      <html>
      	<head>
      		<title>Taiko - ${title}</title>
              <meta charset="utf-8">
              <style>
              ${css}
              </style>
      	</head>
          <body>
              <h1><a href="index.html">Taiko's Blog</a></h1>
              <div id="grid">
                  <ol>
                      <li><a href="/?id=Profile" class="saw">Profile</a></li>
                      <li><a href="2.html" class="saw" id="active">Book Review</a></li>
                      <li><a href="3.html">Coding</a></li>
                      <li><a href="4.html">Device Physics</a></li>
                  </ol>
                  <div id="article">
                      <h2>${title}</h2>
                      <p>${description}</p>
                  </div>
              </div>
              
          </body>
      </html>
      `;
      response.end(templete);
    })
 
 
});
app1.listen(3000);