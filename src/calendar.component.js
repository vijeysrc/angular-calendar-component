angular.module("vj.calendar", ["vj.calendar.service"])

.component("vjCalendar", {
    bindings: {
        ngModel: "="
    },
    templateUrl: "../src/calendar.template.html",
    controller: ["CalendarService", function (CalendarService) {
        var vm = this;

        vm.service = CalendarService.getInstance(vm.ngModel);

        vm.updateMatrix = function () {
            vm.matrix = vm.service.getMatrix();
        };

        vm.goTo = function (type, dir) {
            vm.service.goTo(type, dir);
            vm.updateMatrix();
        }

        vm.selectDate = function (day) {
            if (day === -1) {
                return;
            }
            vm.service.setSelectedDate(day);
            vm.updateMatrix();
            vm.ngModel = vm.service.getSelectedDate();
        }

        vm.updateMatrix();

    }]
});