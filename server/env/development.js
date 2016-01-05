module.exports = {
    "DATABASE_URI": "mongodb://localhost:27017/fsg-app",
    "SESSION_SECRET": "Optimus Prime is my real dad",
    "TWITTER": {
        "consumerKey": "INSERT_TWITTER_CONSUMER_KEY_HERE",
        "consumerSecret": "INSERT_TWITTER_CONSUMER_SECRET_HERE",
        "callbackUrl": "INSERT_TWITTER_CALLBACK_HERE"
    },
    "FACEBOOK": {
        "clientID": "INSERT_FACEBOOK_CLIENTID_HERE",
        "clientSecret": "INSERT_FACEBOOK_CLIENT_SECRET_HERE",
        "callbackURL": "INSERT_FACEBOOK_CALLBACK_HERE"
    },
    "GOOGLE": {
        "clientID": "INSERT_GOOGLE_CLIENTID_HERE",
        "clientSecret": "INSERT_GOOGLE_CLIENT_SECRET_HERE",
        "callbackURL": "INSERT_GOOGLE_CALLBACK_HERE"
    },

    "ATLASSIAN": {
        RsaPrivateKey: "-----BEGIN RSA PRIVATE KEY----------END RSA PRIVATE KEY-----",
        //Use this public key when configuring the Incoming authentication in the Applink in the
        //Atlassian application.
        RsaPublicKey: "-----BEGIN PUBLIC KEY----------END PUBLIC KEY-----"
    },

    "JIRA":{

        host: "mlexperiment.atlassian.net",
        port: "443",
        user: "admin",
        password : "1NYP48"

    }
}
