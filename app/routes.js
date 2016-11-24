"use strict";

var Todo = require('./models/todo');
var Account = require('./models/account');
var passport = require('passport');

module.exports = function(app) {

  // api ---------------------------------------------------------------------
  // get all todos
  app.get('/api/todos', function(req, res) {

      // use mongoose to get all todos in the database
      Todo.find(function(err, todos) {

          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err)
              res.send(err);

          res.json(todos); // return all todos in JSON format
      });
  });

  // create todo and send back all todos after creation
  app.post('/api/todos', function(req, res) {

      // create a todo, information comes from AJAX request from Angular
      Todo.create({
          text : req.body.text,
          done : false
      }, function(err, todo) {
          if (err)
              res.send(err);

          // get and return all the todos after you create another
          Todo.find(function(err, todos) {
              if (err)
                  res.send(err);
              res.json(todos);
          });
      });

  });

// mark todo as done
  app.put('/api/todos/:todo_id', function(req, res) {

    Todo.findOne({_id: req.params.todo_id}, function(err,doc) {
      if (err)
          res.send(err);
      doc.done = !doc.done;
      doc.save();
    });

    Todo.find(function(err, todos) {
      if (err)
          res.send(err);
      res.json(todos);
    });
  });

  // delete a todo
  app.delete('/api/todos/:todo_id', function(req, res) {
      Todo.remove({
          _id : req.params.todo_id
      }, function(err, todo) {
          if (err)
              res.send(err);

          // get and return all the todos after you create another
          Todo.find(function(err, todos) {
              if (err)
                  res.send(err);
              res.json(todos);
          });
      });
  });

  app.get('/register', function(req, res) {
    res.render('register', { });
  });

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      if (err)
          res.send(err);

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
  });

  app.get('/login', function(req, res) {
    res.render('login', { user : req.user });
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendFile('/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};
