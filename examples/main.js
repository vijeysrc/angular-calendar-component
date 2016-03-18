angular.module("app", ["vj.calendar"])

.controller("MainCtrl", [function () {
    var vm = this;
    vm.from = new Date("1985-05-28");
    vm.to = new Date();
}]);