/**
 * Created by MyPC on 27/02/2017.
 */
(function() {
    angular.module("app.components", ["app.utils", "app.constants", "app.services"])
        .component("home", {
            templateUrl: "app/views/home.html",
            bindings: {
                events: '<',
                main:'<'
            },
            controller: function (Utils, ContextStack, $scope, $stateParams) {
                var TAG = "HomeController";
                $scope.activeEventIndex = 0;
                $scope.events = [];
                var depth = 0;
                var group = '';
                var layer = 0;
                this.$onInit = function () {
                    Utils.log("State: " + $stateParams.fstate.name);
                    this.depth = $stateParams.fstate.context.depth;
                    this.group = $stateParams.fstate.group;
                    this.layer = $stateParams.fstate.layer;
                    if(this.events.length > 0){
                        $scope.events = this.events;
                        ContextStack.changeFocusView(this.depth,this.group, this.layer, $scope.events[$scope.activeEventIndex].getNameID());
                    }
                };
                this.itemOnFocused = function ($event, item, $index) {
                    $scope.activeEventIndex = $index;

                }
            }
        })
})();