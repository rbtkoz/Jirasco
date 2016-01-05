app.controller('RecoCtrl', function($scope, JiraFactory){

    $scope.sendReco = function(value){

        JiraFactory.updateReco(value.desc, value.email, value.name,value.origin, value.priority, value.products, value.subject);
        console.log(value, "logging it yeah")
    }

});
