/**
 * Created by alex.kozovski on 12/17/15.
 */
'use strict';
var JiraApi = require('jira').JiraApi;

module.exports = function(app){


    var JiraConfig = app.getValue('env').JIRA;
    var jira = new JiraApi('https', JiraConfig.host,JiraConfig.port,JiraConfig.user, JiraConfig.password, '2');
    app.post("/update", function(req,res){

        //console.log(JSON.stringify(req.body));
        var issue = req.body;

        //find issue code
        //jira.findIssue('NEW-1', function(error, issue) {
        //    console.log('Status: ' + issue.fields.status.name);
        //    var status = issue.fields.status.name;
        //    res.json(status);
        //});

        //add new issue

        jira.addNewIssue = function(issue, callback) {

            //send the issue {} to jira



        };


    });

}

//https://mlexperiments.atlassian.net/rest/api/latest/issue/NEW-1.json
//curl -D- -u "admin:1NYP48" -X GET -H "Content-Type: application/json"  https://mlexperiments.atlassian.net/rest/api/2/issue/NEW-1
