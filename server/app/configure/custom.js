/**
 * Created by alex.kozovski on 12/17/15.
 */
'use strict';

var mongoose = require('mongoose');
var RecoModel = mongoose.model('Reco');
var JiraApi = require('jira').JiraApi;

module.exports = function(app){


    var JiraConfig = app.getValue('env').JIRA;
    var jira = new JiraApi('https', JiraConfig.host,JiraConfig.port,JiraConfig.user, JiraConfig.password, '2');
    app.post("/update", function(req,res,next){

        //find issue code
        //jira.findIssue('NEW-1', function(error, issue) {
        //    console.log('Status: ' + issue.fields.status.name);
        //    var status = issue.fields.status.name;
        //    res.json(status);
        //});

        //add new issue
        var issue = req.body.params;
        //console.log(issue, "got issue")
        var payload =
            {
                "fields": {
                "project":
                {
                    "id": "10000"
                },
                    "summary": issue.name,
                    "description": issue.description,
                    "customfield_10026":issue.email,
                    "customfield_10027":issue.origin,
                    "customfield_10025": issue.subject,
                    "customfield_10024": issue.products,
                    "priority": {
                        "name":issue.priority
                    },
                    "issuetype": {
                        "name": "Task"
                    }
                }
            }

        //for mongodb
        var mongopayload =
            {
                summary: issue.name,
                description: issue.description,
                initiator: issue.email,
                customer: issue.origin,
                subject: issue.subject,
                products: issue.products,
                priority: issue.priority
            }

        jira.addNewIssue(payload, function(err, resp) {

            if(err) {
                console.log(err.errors, "err")
                return res.json(err);
            } else{
                console.log(resp, "...also Saving to DB")

                RecoModel.create(mongopayload, function(err, post){
                    if(err) return next(err);
                    return res.json(post);
                })
                //return res.json(resp);

            }
        });


    });

}

//https://mlexperiments.atlassian.net/rest/api/latest/issue/NEW-1.json
//curl -D- -u "admin:1NYP48" -X GET -H "Content-Type: application/json"  https://mlexperiment.atlassian.net/rest/api/2/issue/MFP
//curl -D- -u "admin:1NYP48" -X GET -H "Content-Type: application/json"  https://mlexperiment.atlassian.net/rest/api/2/project
//curl -u admin:1NYP48 -X POST --data @data.txt -H "Content-Type: application/json" https://mlexperiment.atlassian.net/rest/api/2/issue

//data.txt
//{
//    "fields": {
//    "project":
//    {
//        "id": "10000"
//    },
//    "summary": "No REST for the Wicked.",
//        "description": "Creating of an issue using ids for projects and issue types using the REST API",
//        "issuetype": {
//        "name": "Bug"
//      }
//  }
//}
