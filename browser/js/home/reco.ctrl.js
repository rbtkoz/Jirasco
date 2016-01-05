app.controller('RecoCtrl', function($scope, JiraFactory, $state){
    console.log($scope)
    $scope.sendReco = function(value){

        JiraFactory.updateReco(value.desc, value.email, value.name,value.origin, value.priority, value.products, value.subject)
            .then(function(response){
                if(response.data.errors){
                    console.log(response.data.errors)
                    $scope.warning = response.data.errors;
                }else{
                    $scope.loginForm.$setPristine();
                    $scope.reco = {};
                    $state.go('success');
                }

        });
        //console.log(value, "logging it yeah")
    }



});
