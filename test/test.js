process.env.NODE_ENV = 'test';

var Browser = require('zombie');
var http = require('http');
var app = require('../server.js');
// var expect = require('chai').expect;
var assert = require('assert');

describe('toDoJS', function() {
    before(function(done) {
        this.server = http.createServer(app).listen(8081);
        this.browser = new Browser({ site: 'http://localhost:8081' });
        var browser = this.browser;
        done();
    });
    before(function(done) {
        this.browser.visit('/', done);
    });


    //Tests begin
    it('should return 200 status', function() {
        assert.ok(this.browser.success);
    });

    it('should display the app\'s name', function() {
        assert.equal(this.browser.text('h1'), 'MEANTeam\'s Vietnam 6');
    });

    // it('should display a placeholder', function() {
    //     this.browser.assert.attribute('input', 'placeholder', 'test');
    // });

    it('should allow a todo to be posted', function(done) {
        var browser = this.browser;
        browser.fill('#todo-text-input', 'Todo Test');
        browser.pressButton('Add').then(function() {
          assert.ok(browser.success);
          assert.equal(browser.text('#todo-list tr:last-child td:nth-child(3)'), 'Todo Test');
        }).then(done, done);
    });

    it('should chaneg status from false to true when checkbox is checked', function(done) {
        var browser = this.browser;
        browser.check('#todo-list tr:last-child input');
        browser.check('#todo-list tr:nth-child(2) input');
        assert.equal(browser.text('#todo-list tr:last-child td:nth-child(2)'), 'true');
        done();
    });


    //Tests end

    after(function(done) {
        this.browser.clickLink('Delete').then(done);
    });

    after(function(done) {
        this.server.close(done);
    });


});
