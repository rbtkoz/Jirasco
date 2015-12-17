/**
 * Created by alex.kozovski on 12/17/15.
 */
app.factory('JiraFactory',function($http) {

    function updateReco(payload){
        console.log("hitting factory");

        return $http.post('update/',payload).then(function(response){
            console.log(response)

        })

    }

    return {
        updateReco: updateReco,
    }
});
