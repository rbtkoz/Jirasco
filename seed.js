/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('Reco'));

var seedRecos = function () {

    var recos = [
        {
            summary: 'Recommendation for better homework',
            description: 'If we make the homework easier it will be better',
            initiator: 'kozovski.a@gmail.com',
            customer: 'alex.kozovski@macmillan.com',
            subject: 'Molecular Biology',
            products: 'Launchpad',
            priority: 'Medium'
        },
        {
            summary: 'Recommendation for better stuffed grape leaves',
            description: 'If we make the grapeleaves easier it will be better',
            initiator: 'kozovski.a@gmail.com',
            customer: 'alex.kozovski@macmillan.com',
            subject: 'Molecular Grape Leaves',
            products: 'Grapepad',
            priority: 'HIGH'
        }
    ];

    return Reco.createAsync(recos);

};

connectToDb.then(function () {
    Reco.findAsync({}).then(function (reco) {
        if (reco.length === 0) {
            return seedRecos();
        } else {
            console.log(chalk.magenta('Seems to already be reco data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
