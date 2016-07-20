console.log('Sanity check: search.js has been called');

var app = angular.module('algolia-challenge', ['algoliasearch']);

app.controller('SearchCtrl', ['$scope', 'algolia', function($scope, algolia) {

  $scope.search = {
    query: '',
    hits: [],
    keywords: []
  };





  // API access tokens
  var appId = 'LSTLHX1M78',
      apiKey = '2d33957a1e2b70a7d312983b2a1058d7';

  // Setup Algolia client and indices
  var client = algolia.Client(appId, apiKey),
      searchIndex = client.initIndex('best_buy-demo_data'),
      brandIndex = client.initIndex('best_buy-brand'),
      nameIndex = client.initIndex('best_buy-name'),
      categoriesIndex = client.initIndex('best_buy-categories');





  $scope.$watch('search.query', function() {

    // SEARCH RESULTS
    searchIndex.search($scope.search.query)
      .then(function searchSuccess(content) {
        var hits = content.hits;

        // add content of search results to scope for display in view
        $scope.search.hits = hits;

      }, function searchFailure(err) {
        console.error(err);
      }
    );


    // Generate keywords for Autocomplete
    var createAutoComp = function (keyType, index) {
      $scope.search.keywords = [];
      index.search($scope.search.query)
        .then(function searchSuccess(content) {
            var thisKeyArray = generateKeywords(content.hits, keyType);
            while (thisKeyArray.length > 0) {
              $scope.search.keywords.push(thisKeyArray.pop());
              $scope.search.keywords = dedupe($scope.search.keywords).sort().splice(0, 10);

            }
        }, function searchFailure(err) {
          console.error(err);
        }
      );
    };

    // var query = $scope.search.query;
    // console.log('search.js - query = ', query);

    createAutoComp('brand', brandIndex);
    createAutoComp('name', nameIndex);
    // createAutoComp('categories', categoriesIndex, query);



  });

  $scope.setQuery = function(newQuery) {
    $scope.search.query = newQuery;
  };
}]);




// only show unique items
app.filter('unique', function() {
  return function(collection, keyname) {
    var output = [],
        keys = [];

    angular.forEach(collection, function(item) {
      var key = item[keyname];
      if(keys.indexOf(key) === -1) {
        keys.push(key);
        output.push(item);
      }
    });
    return output;
  };
});
