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

    app.post("/slack", function(req,res,next){

        //initial call with "idea" -> response= Great, let's add some feature suggestions. I will ask you 7 questions( type cancel at any point to stop process) Let's get started
        //What's your email address?
        //What is the name of this improvement?
        //Can you briefly describe the improvement?
        //Who recommended this improvement(type their email)
        //What subject(s) does it affect?
        //Which of our Macmillan Learning Products does it affect?
        //How important is this suggestion( LOW, NEUTRAL, HIGH)



        var response = {
            "attachments": [
                {
                    "fallback": "Click to start improving!",
                    "color": "#36a64f",
                    "pretext": "Created by Macmillan Learning Digital Innovation",
                    "title": "Click to start improving our products!",
                    "title_link": "https://jirasco-app.herokuapp.com/",
                    "fields": [
                        {
                            "title": "Priority",
                            "value": "High",
                            "short": false
                        }
                    ],
                }
            ]
        }

        res.json(response);
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
