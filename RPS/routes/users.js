var express = require('express');
var router = express.Router();

var loggedin = function (req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/login')
    }
  }

var User = require('../db/User');
var Student = require('../db/Student');
var Teacher = require('../db/Teacher');
var Trimester = require('../db/Trimester');
var Course = require('../db/Course');
var Result = require('../db/Result');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Add Students
router.get('/add_students', loggedin, function(req, res, next) {
  res.render('add_students', {msg: ''});
});

router.post('/add_students', function(req, res, next) {
  console.log(req.body)

  var body = req.body,
            username = body.username,
            firstname = body.firstname,
            lastname = body.lastname,
            dept = body.dept,
            batch = body.batch;
  
            Student.findOne({
              username: username
          }, function (err, doc) {
              if (err) {
                  res.status(500).send('error occured')
              } else {
                  if (doc) {
                      res.status(500).render('add_students', {msg: 'ID already exists'});
                  } else {
                      var record = new Student()
                      record.username = username;
                      record.firstname = firstname;
                      record.lastname = lastname;
                      record.dept = dept;
                      record.batch= batch;
                      record.save(function (err, student) {
                          if (err) {
                              res.status(500).render('add_students', {msg: 'DB error'});
                          } else {
                              res.render('signup', {msg: ''})
                          }
                      })
                  }
              }
          })
});


router.get('/view_users', loggedin, function(req,res,next){
	User.find(function(err,results){
    	if (err) return console.error(err);
    	else{
    		res.render('view_users',{info:results});
    	}
  	});
});

router.get('/view_students', loggedin, function(req,res,next){
	Student.find(function(err,results){
    	if (err) return console.error(err);
    	else{
    		res.render('view_students',{info:results});
    	}
  	});
});

// Add Teacher
router.get('/add_teachers', loggedin,  function(req, res, next) {
    res.render('add_teachers', {msg: ''});
  });

router.post('/add_teachers', function(req, res, next) {
    console.log(req.body)
  
    var body = req.body,
              username = body.username,
              firstname = body.firstname,
              lastname = body.lastname,
              dept = body.dept,
              designation = body.designation;
    
              Teacher.findOne({
                username: username
            }, function (err, doc) {
                if (err) {
                    res.status(500).send('error occured')
                } else {
                    if (doc) {
                        res.status(500).render('add_teachers', {msg: 'ID already exists'});
                    } else {
                        var record = new Teacher()
                        record.username = username;
                        record.firstname = firstname;
                        record.lastname = lastname;
                        record.dept = dept;
                        record.designation= designation;
                        record.save(function (err, teacher) {
                            if (err) {
                                res.status(500).render('add_teachers', {msg: 'DB error'});
                            } else {
                                res.render('signup', {msg: ''})
                            }
                        })
                    }
                }
            })
  });

  router.get('/view_teachers', loggedin, function(req,res,next){
	Teacher.find(function(err,results){
    	if (err) return console.error(err);
    	else{
    		res.render('view_teachers',{info:results});
    	}
  	});
});

router.get('/add_trimesters', loggedin, function(req, res, next) {
    res.render('add_trimesters', {msg: ' '});
  });


  router.post('/add_trimesters', function(req, res, next) {
    console.log(req.body)
  
    var body = req.body,
    trimester_id = body.trimester_id,
    trimester_name = body.trimester_name,
    year = body.year;
              
    
              Trimester.findOne({
                trimester_id: trimester_id
            }, function (err, doc) {
                if (err) {
                    res.status(500).send('error occured')
                } else {
                    if (doc) {
                        res.status(500).render('add_trimesters', {msg: 'ID already exists'})
                    } else {
                        var record = new Trimester()
                        record.trimester_id = trimester_id;
                        record.trimester_name = trimester_name;
                        record.year = year;
                        
                        record.save(function (err, trimester) {
                            if (err) {
                                res.status(500).render('add_trimesters', {msg: 'DB error'})
                            } else {
                                res.render('add_trimesters', {msg: ''})
                            }
                        })
                    }
                }
            })
  });







router.get('/add_courses', loggedin, function(req, res, next) {
    res.render('add_courses',{msg: ''});
  });


  router.post('/add_courses', function(req, res, next) {
    console.log(req.body)
  
    var body = req.body,
    course_id = body.course_id,
    course_name = body.course_name,
    dept = body.dept,
    credit = body.credit;

              
    
              Course.findOne({
                course_id: course_id
            }, function (err, doc) {
                if (err) {
                    res.status(500).send('error occured')
                } else {
                    if (doc) {
                        res.status(500).render('add_courses',{msg: 'ID already exists'});
                    } else {
                        var record = new Course()
                        record.course_id = course_id;
                        record.course_name = course_name;
                        record.dept = dept;
                        record.credit = credit;
                        
                        record.save(function (err, course) {
                            if (err) {
                                res.status(500).render('add_courses',{msg: 'DB error'});
                            } else {
                                res.render('add_courses', {msg: ''})
                            }
                        })
                    }
                }
            })
  });


  router.get('/add_results', loggedin, function(req, res, next) {
    res.render('add_results',{msg: ''});
  });


  router.post('/add_results', loggedin, function(req, res, next) {

    var body = req.body,
    username = body.username,
    course_id = body.course_id,
    trimester_id = body.trimester_id,
    grade = body.grade;
    
    Student.findOne({
        username: username
    }, function (err, doc) {
        if (err) {
            res.status(500).send('error occured')
        } else {
            if (doc) {
                /**************************************************************************** */
                Course.findOne({
                    course_id: course_id
                }, function (err, doc) {
                    if (err) {
                        res.status(500).send('error occured')
                    } else {
                        if (doc) {
                            /********************************************************************** */
                            Trimester.findOne({
                                trimester_id: trimester_id
                            }, function (err, doc) {
                                if (err) {
                                    res.status(500).send('error occured')
                                } else {
                                    if (doc) {
                                        // Adding to database
                                        Result.findOne({
                                            username:username,
                                            course_id:course_id,
                                            trimester_id:trimester_id
                                            
                                        }, function (err, doc) {
                                            if (err) {
                                                res.status(500).send('error occured')
                                            } else {
                                                if (doc) {
                                                    res.status(500).render('add_results',{msg: 'Result already exists'})
                                                } else {
                                                    var record = new Result()
                                                     record.username = username;
                                                     record.course_id = course_id;
                                                     record.trimester_id = trimester_id;
                                                    record.grade = grade;
                                                    
                                                    record.save(function (err, result) {
                                                        if (err) {
                                                            res.status(500).send('db error')
                                                        } else {
                                                            res.render('add_results_success', {msg: 'Result Added Successfully!'})
                                                        }
                                                    })
                                                }
                                            }
                             })
        
                                    } else {
                                        res.render('add_results_error', {msg_std:'', msg_crs:'', msg_tmr: 'No trimesters found'})
                                    }
                                }
                            })
                            /********************************************************************** */
                        } else {
                            res.render('add_results_error', {msg_std:'', msg_crs:'No courses found', msg_tmr: ''})
                            
                        }
                    }
                })
                /**************************************************************************** */
            } else {
                res.render('add_results_error', {msg_std:'ID doesn\'t exist', msg_crs:'', msg_tmr: ''})
            }
        }
    })
    //res.render('add_results');
  });


  router.post('/student_choice', loggedin, function(req, res, next) {
    var username = req.user.username;
    var trimester_id = req.body.trimester_id
    console.log('User ID: ' + username + '\n' + 'Trimester: ' + trimester_id)

    Result.find({'username': username, 'trimester_id': trimester_id}, (err, results) => {
        if(err) {
            res.redirect('/dashboard')
        } else {
            // *************** Seperating Grades *****************************
            var grades_array = new Array(results.length)
            for(var i = 0; i < results.length; i++) {
                grades_array[i] = results[i].grade
            }
            // ***************************************************************

            // *************** calculating GPA *******************************
            var sum_grades = grades_array.reduce((a,b) => {return a+b})
            var gpa = sum_grades / grades_array.length
            // ***************************************************************

            console.log(results + '\n' + 'Grade Array: ' + grades_array + '\n' + 'Sum: ' + sum_grades + grades_array + '\n' + 'GPA: ' + gpa)
            res.render('view_results', {info: results, gpa:gpa})
        }
    })
  });

module.exports = router;
