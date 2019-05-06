var express = require('express');
var router = express.Router();
var User = require('../db/User');

/* GET home page. */


module.exports = function (passport) {
    router.post('/signup', function (req, res) {
        var body = req.body,
            username = body.username,
            password = body.password;
            role = body.role;
        User.findOne({
            username: username
        }, function (err, doc) {
            if (err) {
                res.status(500).send('error occured')
            } else {
                if (doc) {
                    res.status(500).render('signup', {msg: 'User already exists'})
                } else {
                    var record = new User()
                    record.username = username;
                    record.password = record.hashPassword(password);
                    record.role = role;
                    record.save(function (err, user) {
                        if (err) {
                            res.status(500).send('db error')
                        } else {
                            if(role == 'student') {
                                console.log(username);
                                res.render('add_students', {username:username});
                            } else if(role == 'teacher') {
                                console.log(username);
                                res.render('add_teachers', {username:username});
                            }
                             else {
                                res.render('signup', {msg: ''});
                            }
                        }
                    })
                }
            }
        })
    });


    router.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/dashboard',
    }), function (req, res) {
        res.send('hey')
    })
    return router;
};