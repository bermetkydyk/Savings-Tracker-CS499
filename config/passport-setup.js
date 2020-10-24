const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const { Users } = require('../models');


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( (id, done) => {
  Users.findOne({
    where: {
      id: id
    }
  }).then(user => {
    done(null, user);
  })
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, 
    (accessToken, refreshToken, profile, done) => {
        // console.log('accessToken', accessToken);
        // console.log('refreshToken', refreshToken);
        // console.log('profile:', profile);
        Users.findOne({
            where: {
              googleId: profile.id
            }
          })
          .then( (existingUser) => {
  
              if(existingUser){
                console.log('find existing user', existingUser);
                done(null, existingUser);
              } else{
                Users.create({
                    fullName: profile.displayName,
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    familyName: profile.name.familyName,
                    givenName: profile.name.givenName,
                    username: profile.displayName
                  })
                .then(user => done(null, user));
              }
  
          });

    })
);

