app.factory('MoviesService', function ($rootScope, $http, $state, $ionicLoading, APP_CONFIG, GlobalService) {
    return new (function () {
        var service = this;
        service.data = {};


        service.getMovies = function (callback) {
            var req = {
                method: "GET",
                url: APP_CONFIG.getApiUrl("moviesPopular")
            };
            $http(req).success(function (response) {
                service.data.movies = response.results;
                if (callback) callback();
            }).error(function (data, status, headers, config) {
                console.error("error");
            });
        };


        service.getMovieById = function (id) {
            var selectedMovie = {};
            if (service.data.movies) {
                angular.forEach(service.data.movies, function (movie) {
                    if (movie.id == id) selectedMovie = movie;
                })
                return selectedMovie;
            }
        };


        service.getWatchedMoviesFromStorage = function(){
            var watchedMovies;
            try{
                watchedMovies = JSON.parse(GlobalService.getStorageItem("watched_movies")) || [];
            } catch (e){
                watchedMovies = [];
                console.warn("Invalid JSON string")
            }
            return watchedMovies
        };


        service.movieIsWatched = function(id){
            var watchedMovies = service.getWatchedMoviesFromStorage();
            return !!~watchedMovies.indexOf(id)
        };


        service.markAsWatched = function(id){
            var watchedMovies = service.getWatchedMoviesFromStorage();
            var occurenceIndex = watchedMovies.indexOf(id);
            if(~occurenceIndex)
                watchedMovies.splice(occurenceIndex,1);
            else
                watchedMovies.push(+id);
            GlobalService.setStorageItem("watched_movies", JSON.stringify(watchedMovies));
            service.markWatchedMovies(); //for update movie data in the list
        };


        service.markWatchedMovies = function(){
            var watchedMovies = service.getWatchedMoviesFromStorage();
            angular.forEach(service.data.movies, function(movie){
                movie.watched = ~watchedMovies.indexOf(movie.id);
            })
        };


        service.getMovies(function(){
            service.markWatchedMovies();
        });

    })();
});
