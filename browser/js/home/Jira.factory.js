/**
 * Created by alex.kozovski on 12/17/15.
 */
app.factory('JiraFactory',function($http) {

    function updateReco(payload0, payload1, payload2, payload3,payload4, payload5, payload6){
        var payload = arguments;

        return $http.post('update/',
            {params:{ description :payload[0], email :payload[1],  name :payload[2], origin :payload[3], priority :payload[4], products :payload[5], subject: payload[6]}})
            .then(function(response){
                return response;
            })

    }

    return {
        updateReco: updateReco,
    }
});
