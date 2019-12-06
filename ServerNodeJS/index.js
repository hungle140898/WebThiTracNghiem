var express = require("express");
var app = express();    
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
app.use (express.static("public"));
var passport = require('passport');
var session  = require('express-session');
// var cookieParser = require('cookie-parser');
// app.use(cookieParser());
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var url = require('url');

app.use(bodyParser.urlencoded({ extended: false }));
var FacebookStrategy = require('passport-facebook').Strategy;

app.listen("3000");


var cors = require('cors');
app.use(cors({origin:"http://localhost:4200"}));
//body-parser
var bodyParser = require('body-parser');

var privatekey='nodejs';
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    /*var err = new Error('Not Found');
   err.status = 404;
   next(err);*/

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});

//--Connect Mongodb
const mongoose = require('mongoose');
mongoose.set('useFindAndModify',false);
mongoose.connect('mongodb+srv://hoanghung:Hunghung324@cluster0-n1myw.mongodb.net/WebTN?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true},function(err){
    if(err)
        console.log("---->>>> Connect MongoDB Error !");
    else
        console.log("---->>>> Connect MongoDB Success !");
    }   
);

const Lession = require("./Models/Lession");
const Question = require("./Models/Question");
const User = require('./Models/User');
const Account = require('./Models/Account');
const Result = require('./Models/Result')

//--Get All Lession
app.post("/api/lession/",function(req,res){
   // console.log(req.url);
    Lession.find({} ,function(err,items){
        if(err){
            res.json({kq:0},{"err" :err});
        }
        else{
        res.json(items);
    }    
    });
});

//--Views Lession
app.post("/api/lession/views/:id",function(req,res){
     Question.find({Lession_id :req.params.id},function(err,items){
            if(err){
                    res.json({kq:0},{"err" :err});
                }
                else{
                    res.json(items);
            }    
    });
});

//--Delete Lession
app.post("/api/lession/delete/:id",function(req,res){
    //console.log(req.params.id);
    var id = req.params.id;
    Lession.deleteOne({_id :id},function(err,items){
           if(err){
                    res.send(err);
               }
               else{
                res.json(items);
            }      
   });
});

//--Edit Lession
app.post("/api/editlession/:id",function(req,res){
    //console.log( req.params.id);
    var id = req.params.id;
     Lession.find({_id :id} ,function(err,items){
         if(err){
             res.json({kq:0},{"err" :err});
         }
         else{
         res.json(items);
     }    
     });
 });



//--Add Lessions Page
app.get("/managelession",function(req,res)
{
    res.render("managelession");
});

//--Update Lession
app.get("/api/editlession/save/:id",function(req,res)
{
    console.log(req.params.id+"/"+req.query.namelession+"/"+req.query.themelession+"/"
    +req.query.numques+"/"+req.query.time+"/"
    +req.query.level+"/"+req.query.score);
    Lession.findOneAndUpdate({_id:req.params.id},{$set: {NameOfLession : req.query.namelession,ThemeOfLession : req.query.themelession,NumberOfQuestions : req.query.numques,
        Timing : req.query.time,Level : req.query.level,Score : req.query.score}},{},
        function(err){
            if(err)
                {
                    console.log("Save Error "+err);
                }
            else{
                console.log("Save Sucess!");
            }    
        });
});

//--Save Add Lession
app.get("/api/addlession/save",function(req,res)
{
    console.log(req.query.namelession+"/"+req.query.themelession+"/"
    +req.query.numques+"/"+req.query.time+"/"
    +req.query.level+"/"+req.query.score);
    var newLession = new Lession({
        //Question_id:[] ,
        NameOfLession : req.query.namelession,
        ThemeOfLession : req.query.themelession,
        NumberOfQuestions : req.query.numques,
        Timing : req.query.time,
        Level : req.query.level,
        Score : req.query.score
    });
   //  res.json(newLession)
    newLession.save(function(err){
        if(err)
            {
                console.log("Save Error "+err);
            }
        else{
            console.log("Save Sucess!");
        }    
    });
});

//--Manage Questions
//--Add question
app.get("/managequestion",function(req,res)
{
    Lession.find(function(err,items){
        if(err){
            res.send("Error");
        }
        else{
            //console.log(items);
            res.render("managequestion",{Lessions:items});
        }
    });
});

app.post("/api/editquestion/:id",function(req,res){
    var id = req.params.id;
     Question.find({_id :id} ,function(err,items){
         if(err){
             res.json({kq:0},{"err" :err});
         }
         else{
         res.json(items);
     }    
     });
});

app.post("/api/deletequestion/:id",function(req,res){
    var id = req.params.id;
    Question.deleteOne({_id :id},function(err,items){
           if(err){
                    res.send(err);
               }
               else{
                res.json(items);
            }      
   });
});
//--Save Add Question
app.get("/api/addquestion/save",function(req,res)
{
   // console.log(req.query.less_id+"/"+req.query.title+"/"+req.query.ansA+"/"+req.query.ansB+"/"+req.query.ansC+"/"+req.query.ansD+"/"+req.query.result);
    var newQuestion = new Question({
        Lession_id:req.query.less_id,
        TitleOfQuestion : req.query.title ,
        Answer_A : req.query.ansA ,
        Answer_B : req.query.ansB ,
        Answer_C : req.query.ansC ,
        Answer_D : req.query.ansD ,
        Result :req.query.result
    });
     //res.json(newQuestion)
    newQuestion.save(function(err){
        if(err)
            {
                console.log("Save Error "+err);
                res.json({kq:0});
            }
        else{
            Lession.findOneAndUpdate(
                {_id:newQuestion._id},
                {$push: {Lession_id:newQuestion.Lession_id}},
                function(err){
                    if(err)
                        res.json({kq:0,"err":err});
                    else
                        res.json({kq:1});
            });
           
        }    
    });
});

//Update Question
app.get("/api/editquestion/save/:id",function(req,res){
    console.log(req.query.less_id+"/"+req.query.ques_id+"/"+req.query.title+"/"+req.query.ansA+"/"+req.query.ansB+"/"+req.query.ansC+"/"+req.query.ansD+"/"+req.query.result);
    Question.findOneAndUpdate({_id:req.params.id},{$set: {Lession_id : req.query.less_id,TitleOfQuestion : req.query.title,Answer_A : req.query.ansA,
        Answer_B : req.query.ansB,Answer_C : req.query.ansC,Answer_D : req.query.ansD,Result : req.query.result}},{},
        function(err){
            if(err)
                {
                    console.log("Save Error "+err);
                }
            else{
                console.log("Save Sucess!");
            }    
        });
});

//Get Question TestPage
app.post("/api/testpage/:id",function(req,res)
{
    //console.log(req.params.id);
    Question.find({Lession_id :req.params.id},function(err,items){
        if(err){
                res.json({kq:0},{"err" :err});
            }
            else{
                res.json(items);
        }    
    });
});

// //Login Admin
app.get("/api/login/" ,function(req,res,next){
    console.log(req.query.user);
    console.log(req.query.pass);
   Account.find({Username:req.query.user,Password:req.query.pass},function(err,items){
       if(err){
           console.log("Error");
   }
    else{
       //  console.log(items.length);
        if(items.length != 0)
            {
                console.log("Find Success");
               
               }
        else
             console.log("No Account"); 
       }       
   });
});
//----------------------LOGIN FACEBOOK---------------------------------------
app.use(session({ 
    secret: "myproject",
    name: "hoanghung",
     // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
// Passport session setup. 
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

//--Go to home page
app.get("/",function(req,res){
    res.render("home");
});

app.get('/auth/facebook',passport.authenticate('facebook',{scope:['email']}));
app.get("/auth/facebook/profile", function(req,res){
   // console.log({ user: req.user });
    res.render("profile",{ user: req.user });
});
app.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { successRedirect : 'http://localhost:4200/managelession', failureRedirect: 'home' }),
	  function(req, res) {
	    res.redirect('profile');
      });
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
passport.use(new FacebookStrategy({
    clientID        : "2519241238198248",
    clientSecret    :"2046811c28f382e2aef6488651b4f587",
    callbackURL     : "http://localhost:3000/auth/facebook/callback",
    profileFields: ['email','gender','locale','displayName']
 },function(token, refreshToken, profile, done)
 {
    process.nextTick(function () {
       // console.log(token, refreshToken, profile, done);
        return done(null, profile);
      });
    console.log(profile._json.email);
    process.nextTick(function() {
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
            if (err)
                return done(err);
            if (user) {
                return done(null, user);
            } else {
                // if there is no user found with that facebook id, create them
                var newUser            = new User();
 
                // set all of the facebook information in our user model
                newUser.facebook.id    = profile.id; // set the users facebook id                   
                newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                newUser.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
                newUser.facebook.email  = profile._json.email;
                // save our user to the database
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    // if successful, return the new user
                    return done(null, newUser);
                });
            }
        });
    });
  }));

// app.get("/",function(req,res){
//     console.log({ user: req.user });
//     res.render("profile",{ user: req.user });
// });

app.get("/api/checkloginFB",function(req,res){
    // console.log("Name : "+req.query.name);
    // console.log("Email : "+req.query.email);
    // console.log("ID : "+req.query.id);
    User.findOne({ id : req.query.id }, function(err, user) {
        if (err)
            res.json(err);
        if (user) {
            res.json("User Exist!");
            
        } else {
            var token = jwt.sign({
                username: req.query.name,
                email: req.query.email,
                id:req.query.id
            },privatekey,{ expiresIn: '1h' })

            var newUser            = new User();
            // set all of the facebook information in our user model
            newUser.id    = req.query.id; 
            newUser.name  = req.query.name;    
            newUser.email  = req.query.email;              
            newUser.save(function(err) {
                if (err)
                    throw err;
                res.json({user:newUser,token:token});
            });
        }
    });
})

app.get("/api/testpage/saveresults/",function(req,res){
    var newResult = new Result();
    newResult.User_ID = req.query.id;
    newResult.UserName = req.query.name;
    newResult.TitleLession = req.query.title;
    newResult.Result = req.query.values;
    newResult.save(function(err) {
        if (err)
            throw err;
        res.json(newResult);
});
    
})
app.get("/api/gethistory/:id",function(req,res){
    Result.find({User_ID :req.params.id},function(err,items){
        if(err){
                res.json({kq:0},{"err" :err});
            }
            else{
                res.json(items);
                //console.log(items);
        }    
    });
})

app.get("/api/adminlogin",function(req,res){
    //console.log(req.query.name +''+req.query.pass)
    Account.find({UserName:req.query.name,Password:req.query.pass},function(err,items){
        if(err){
            res.json({kq:0},{"err" :err});
        }
        else{
            res.json(items);
            //console.log(items);
    }    
    })
})