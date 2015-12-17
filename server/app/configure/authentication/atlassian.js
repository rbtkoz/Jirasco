/**
 * Created by alex.kozovski on 12/17/15.
 */

var passport = require('passport');
var AtlassianOAuthStrategy = require('passport-attlassian-oauth').Strategy;
var mongoose =require('mongoose');

module.exports = function(app){

    var atlassianConfig = app.getValue('env').ATLASSIAN;

    var atlassianCredentials = {
        ATLA_RSA_PRIVATE_KEY: atlassianConfig.RsaPrivateKey,
        ATLA_RSA_PUBLIC_KEY: atlassianConfig.RsaPublicKey

    };

    // Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Atlassian profile is serialized
//   and deserialized.
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });


// Use the AtlassianOauthStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Atlassian
//   profile), and invoke a callback with a user object.
    passport.use(new AtlassianOAuthStrategy({
            applicationURL:"http://localhost:2990/jira",
            callbackURL:"http://localhost:5000/auth/atlassian-oauth/callback",
            consumerKey:"atlassian-oauth-sample",
            consumerSecret:atlassianCredentials.ATLA_RSA_PRIVATE_KEY
        },
        function (token, tokenSecret, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {

                // To keep the example simple, the user's Atlassian profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Atlassian account with a user record in your database,
                // and return that user instead.
                return done(null, profile);
            });
        }
    ));
}






