require('dotenv').config()
const express = require('express');
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {UserModel} = require("../model/db");
const jwt = require("jsonwebtoken")


const google_auth_router  = express.Router()

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/google/auth/signup/callback"
},
async (accessToken, refreshToken, profile, cb) => {
  try {
    // Check if user already exists
    let user = await UserModel.findOne({email: profile.emails[0].value,});
    

    // If user doesn't exist, create a new user
    if (!user) {
      user={
        name: profile.displayName,
        email: profile.emails[0].value, 
        };
        user.alreadyexist = false; 
      }else{
        user.alreadyexist = true; 
      }

      return cb(null,user);
  } catch (err) {
    return cb(err);
  }
}));

google_auth_router.use(session({ secret: 'secretkey', resave: false, saveUninitialized: true }));
google_auth_router.use(passport.initialize());
google_auth_router.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser( async (email, done)=> {
  try{
    const user = await UserModel.findOne({email})
    done(null, user);
  } catch(err){
    done(err , null);
  }
 
});


google_auth_router.get('/signup',
  passport.authenticate('google', { scope: ['profile','email'] }));

google_auth_router.get('/signup/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/signup' }),
  function(req, res) {
    
    const user = req.user;
   
    const alreadyexist = user.alreadyexist;
    const token = jwt.sign(
      { email: user.email, UserId: user._id, isAdmin: user.isAdmin ,name:user.name},
      process.env.SecretKey,
    );
    if(alreadyexist){
       // Send the token to the frontend (you can return it in the response or set it in a cookie)
    res.cookie('jwt_token', token, { httpOnly: true });  // Optional: Set token as an HTTP-only cookie
    res.redirect(`http://localhost:5173/home?token=${token}`);
    }else{
// Send the token to the frontend (you can return it in the response or set it in a cookie)
res.cookie('jwt_token', token, { httpOnly: true });  // Optional: Set token as an HTTP-only cookie
res.redirect(`http://localhost:5173/setpassword?token=${token}`);
    }

    
  });

module.exports = {google_auth_router}
