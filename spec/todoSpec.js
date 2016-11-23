// require('jasmine-jquery');
var req = require('request');
var todoApp = require('../server.js');
var base_url = 'http://localhost:8080/';

describe('Todo App', function() {
     describe('GET /', function() {
         it('returns status code 200', function(end) {
             req.get(base_url, function(error, response, body) {
                 expect(response.statusCode).toBe(200);
                 end();
             });
         });

         it('displays "toDoJS"', function(end) {
             req.get(base_url, function(err, response, body) {
                 expect(body).toContain('toDoJS');
                 end();
             });
         });
     });
});