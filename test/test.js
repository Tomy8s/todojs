process.env.NODE_ENV = 'test';

var Browser = require('zombie');
var http = require('http');
var app = require('../server.js');
// var expect = require('chai').expect;
var assert = require('assert');

describe('toDoJS', function() {
    before(function() {
        this.server = http.createServer(app).listen(8081);
        this.browser = new Browser({ site: 'http://localhost:8081' });
    });
    before(function(done) {
        this.browser.visit('/', done);
    });


    //Tests begin
    it('should return 200 status', function() {
        assert.ok(this.browser.success);
    });

    it('should display the app\'s name', function() {
        assert.equal(this.browser.text('h1'), 'MEANTeam\'s Vietnam');
    });

    after(function(done) {
        this.browser.pressButton('Delete');
    });

    // it('should display a placeholder', function() {
    //     this.browser.assert.attribute('input', 'placeholder', 'test');
    // });

    it('should allow a todo to be posted', function(done) {
        var browser = this.browser;
        browser.fill('#todo-text-input', 'New Todo');
        browser.pressButton('Add').then(function() {
          assert.ok(browser.success);
          assert.equal(browser.text('#todo-list div div:last-child'), 'New Todo');
        }).then(done, done);
    });


    //Tests end
    after(function(done) {
        this.server.close(done);
    });
});
