console.log('Sanity check: search.js has been called');

angular
  .module('algolia-challenge', ['algoliasearch'])
  .controller('SearchCtrl', ['$scope', 'algolia', function($scope, algolia) {

    $scope.search = {
      query: '',
      hits: []
    };

    // API access tokens
    var appId = 'LSTLHX1M78',
        apiKey = '2d33957a1e2b70a7d312983b2a1058d7',
        searchIndexName = 'best_buy-demo_data';

    var client = algolia.Client(appId, apiKey);
    var index = client.initIndex(searchIndexName);

    $scope.$watch('search.query', function() {
      index.search($scope.search.query)
        .then(function searchSuccess(content) {
          console.log(content);
          // add content of search results to scope for display in view
          $scope.search.hits = content.hits;
        }, function searchFailure(err) {
          console.log(err);
      });
    });
  }]);
