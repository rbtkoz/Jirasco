app.controller('RecoCtrl', function($scope, JiraFactory){

    $scope.sendReco = function(value){

        JiraFactory.updateReco(value);
        console.log(value, "logging it yeah")
    }

})
