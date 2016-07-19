console.log('Sanity check: app.js has been called');

angular
  .module('algolia-challenge', ['algoliasearch'])
  .controller('SearchCtrl', ['$scope', 'algolia', function($scope, algolia) {

    var vm = this;

    $scope.search = {
      query: '',
      hits: []
    };

    $scope.test = {
      text: 'testing this.'
    };

    // var client = algolia.Client('ApplicationID', 'apiKey');
    // var index = client.initIndex('indexName');
    //
    // $scope.$watch('search.query', function() {
    //   index.search($scope.search.query)
    //     .then(function searchSuccess(content) {
    //       console.log(content);
    //       // add content of search results to scope for display in view
    //       $scope.search.hits = content.hits;
    //     }, function searchFailure(err) {
    //       console.log(err);
    //   });
    // });
  }]);
