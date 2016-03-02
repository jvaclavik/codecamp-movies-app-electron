app.controller('MoviesTopRatedCtrl', function ($scope, $state, GlobalService, MoviesService) {
    $scope.data = MoviesService.data;
})