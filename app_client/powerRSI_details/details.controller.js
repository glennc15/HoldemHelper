(function (){

  angular
    .module('loc8rApp')
    .controller('detailsCtrl', detailsCtrl);

    detailsCtrl.$inject = ['$routeParams', '$interval'];
    function detailsCtrl ($routeParams, $interval) {
      var vm = this;

      // vm.data = "SPY";
      vm.data = {symbol: $routeParams.symbolid};


    }

})();