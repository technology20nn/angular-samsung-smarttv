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
            controller: function (Utils, systemEvents, ContextStack, $scope, $stateParams) {
                var TAG = "HomeController";
                $scope.activeEventIndex = 0;
                $scope.events = [];
                $scope.activeEvent = null;
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
                        $scope.activeEvent = $scope.events[$scope.activeEventIndex];
                        ContextStack.changeFocusView(this.depth,this.group, this.layer, $scope.activeEvent.getNameID());
                    }
                };
                this.itemOnFocused = function ($event, item, $index) {
                    document.getElementById('live-events').style.transform = 'translate3d(-' + ($index * 356) + 'px, 0, 0)';
                    $scope.activeEventIndex = $index;
                    $scope.activeEvent = $scope.events[$index];
                    Utils.dispatchCallbackUsingAngularTimeout(function () {
                        $scope.$broadcast(systemEvents.CHANGE_LIVE_EVENT, $scope.activeEvent);
                    },500);
                };

                this.itemOnSelected = function ($event, item, $index) {
                    $scope.activeEvent = $scope.events[$index];
                    $scope.$broadcast(systemEvents.MEDIA_PLAY_EVENT, $scope.activeEvent);
                }

            }
        })
})();