var User = require('../models/user');
var bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = process.env.SALT;

module.exports = {
  createUser: function(req, res, next){
    User.create({
      name: req.body.name,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password),
      email: req.body.email,
      loginMethod: req.body.login,
    }, function(err, user){
      if(!err){
        res.send(user);
      } else {
        res.send(err);
      }
    });
  },
  findAll: function(req, res, next){
    User.find(function(err, users){
      if(!err){
        res.send(users);
      } else {
        res.send(err);
      }
    });
  },
  findOne: function(req, res, next){
    User.findById(req.params.id, function(err, user){
      if(!err){
        res.send(user);
      } else {
        res.send(err);
      }
    });
  },
  updateUser: function(req, res, next){
    User.findByIdAndUpdate(req.params.id, {$set:req.body}, function(err, user){
      if(!err){
        res.send('updated!\n'+user);
      } else {
        res.send(err);
      }
    });
  },
  deleteUser: function(req, res, next){
    User.findByIdAndRemove(req.params.id, function(err, user){
      if(!err){
        res.send('data deleted!\n'+user);
      } else {
        res.send(err);
      }
    });
  },
  updateSearch: function(req,res,next) {
    User.findById(req.params.id, (err, user) => {
      if (err) res.send(err);
      else {
        if (User.keywords.includes(req.body.keyword)) {
          if (User.songs.includes(req.body.song)) {
            res.send('Keyword and song are already in the database');
          }
          else {
            User.songs.push(req.body.song);
            res.send('Song is inserted into database');
          }
        }
        else {
          User.keywords.push(req.body.keyword);
          if (User.songs.includes(req.body.song)) {
            res.send('Keyword is inserted into database');
          }
          else {
            User.songs.push(req.body.song);
            res.send('Keyword and song are inserted into the database');
          }
        }
      }
    });
  }
};
