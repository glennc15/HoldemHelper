(function () {

  angular.module('holdemApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/holdemHome/holdemHome.view.html',
        controller: 'holdemHomeCtrl',
        controllerAs: 'vm'
      })
      // .when('/about', {
      //   templateUrl: '/common/views/genericText.view.html',
      //   controller: 'aboutCtrl',
      //   controllerAs: 'vm'
      // })
      // .when('/location/:locationid', {
      //   templateUrl: '/locationDetail/locationDetail.view.html',
      //   controller: 'locationDetailCtrl',
      //   controllerAs: 'vm'
      // })
      // .when('/PowerRSI/overview', {
      //   templateUrl: '/powerRSI_overview/overview.view.html',
      //   controller: 'overviewCtrl',
      //   controllerAs: 'vm'
      // })
      // .when('/PowerRSI/overview/:symbolid', {
      //   templateUrl: '/powerRSI_details/details.view.html',
      //   controller: 'detailsCtrl',
      //   controllerAs: 'vm'
      // })
      // .when('/PatternMatcherEngine/overview', {
      //   templateUrl: '/pattern_engine_overview/overview.view.html',
      //   controller: 'pattern_overviewCtrl',
      //   controllerAs: 'vm'
      // })
      // .when('/PatternMatcherEngine/overview/:symbolid/:patternid', {
      //   templateUrl: '/pattern_engine_details/details.view.html',
      //   controller: 'pattern_detailsCtrl',
      //   controllerAs: 'vm'
      // })
      // .otherwise({redirectTo: '/PowerRSI/overview'});
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  angular
    .module('holdemApp')
    .config(['$routeProvider', '$locationProvider', config]);

})();