app.controller('MoviesDetailCtrl', function ($scope, MoviesService, $stateParams, GlobalService) {
    if($stateParams){
        $scope.movieId = +$stateParams.id
        $scope.movie = MoviesService.getMovieById($scope.movieId);
    }


    $scope.markAsWatched = function(){
        MoviesService.markAsWatched($scope.movieId);
        $scope.movieWatched = MoviesService.movieIsWatched($scope.movieId); //for change text in button
    };


    $scope.movieWatched = MoviesService.movieIsWatched($scope.movieId);
})
