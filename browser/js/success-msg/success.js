app.config(function ($stateProvider) {

    // Register our *success* state.
    $stateProvider.state('success', {
        url: '/success',
        controller: 'RecoCtrl',
        templateUrl: 'js/success-msg/success.html'
    });

});
