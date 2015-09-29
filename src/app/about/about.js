angular.module( 'ngBoilerplate.about', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'about', {
    url: '/about',
    views: {
      "main": {
        controller: 'AboutCtrl',
        templateUrl: 'about/about.tpl.html'
      }
    },
    data:{ pageTitle: 'What is It?' }
  });
})

.filter('prettyJSON', function () {
    function syntaxHighlight(json) {
      return JSON ? JSON.stringify(json, null, '  ') : 'your browser doesnt support JSON so cant pretty print';
    }
    return syntaxHighlight;
})

.controller( 'AboutCtrl', function AboutCtrl( $scope, $http ) {
  // This is simple a demo for UI Boostrap.
  $scope.dropdownDemoItems = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
  $scope.query = "";
  $scope.data = "";
  $scope.url = "http://localhost:9002/";
  $scope.datastore = "store";
  $scope.datastores = [];

  $scope.queryChanged = function() {
      var r = $scope.query.split(' ').join('+');
      var url = $scope.url + $scope.datastore + "/query/?query=" + r;
      $http.get(url).then(function(response) {
          $scope.data = response.data;
      });
  };

  $scope.loadUrl = function() {
      $scope.query = "";
      $scope.data = "";
      var url = $scope.url + "datastores/";
      console.log(url);
      $http.get(url).then(function(response) {
          $scope.datastores = response.data;
      });
  };

  $scope.notSorted = function(obj){
        if (!obj) {
            return [];
        }
        return Object.keys(obj);
    };
})

;
