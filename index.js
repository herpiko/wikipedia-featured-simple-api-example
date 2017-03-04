'use strict';

const pkg = require('./package.json');

// Modules
const fs = require('fs');
const bb = require('express-busboy');
const express = require('express')
const async = require('async');

// Server instance
/**
 * Server instance
 * @param {object} opts - Option values
 * @param {string} opts.port - Instance port
 *
 */
var Server = function(opts) {
 
  // Init. The sequences is important and should not be changed
  const app = express();
  bb.extend(app)
  this.http = require('http').Server(app);
  
  /**
   * @namespace REST API
   */
  // HTTP router
  app.get('/', (req, res) => {
    res.send('hai');
  })
  app.get('/articles', (req, res) => {
    var list = require('./list.json');
    if (req.query.id) {
      res.send(list[parseInt(req.query.id) - 1]);
    } else {
      res.send(list);
    }
  })
  app.get('/image/:id', (req, res) => {
    let id = req.params.id;
    if (parseInt(id) == 0) {
      return res.send();
    }
    res.setHeader('content-type', 'image/jpeg');
    fs.createReadStream('./images/' + id + '.jpg').pipe(res);
  })
  
  this.http.listen(opts.port, (err) => {
    if (err) {
      throw err;
    }
    console.log('member get member : listening on port ' + opts.port);
  });
  
  return this;
}

new Server({port : 3000});
module.exports = Server;
