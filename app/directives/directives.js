(function () {
    angular.module("app.directives", ["app.utils", "app.services", "app.constants", "app.configuration"])
        .directive("falert", function () {
            return {
                restrict: "E",
                templateUrl: "app/views/alert.html",
                scope: true,
                controller: function falert($scope, Utils, ContextStack, contexts) {
                    $scope.depth = contexts.DIALOG_ALERT.depth;
                }
            }
        })
        .directive("fconfirm", function fconfirm() {
            return {
                restrict: "E",
                templateUrl: "app/views/confirm.html",
                scope: true,
                controller: function fconfirm($scope, Utils, ContextStack, contexts) {
                    $scope.depth = contexts.DIALOG_CONFIRM.depth;
                }
            }
        })
        .directive("liveEvent", function liveEvent($compile, sportTypes, systemEvents, Utils) {
            var soccerTemplate = '\
                <div class="icon-small icon-bongda"></div>\
                <div class="item-sport">\
                    <div class="item-home left text-center text-uppercase">\
                        <img class="text-right" src="{{eventItem.match.teams[0].flag_url}}">\
                        <div class="name">{{eventItem.match.teams[0].short_name}}</div>\
                    </div>\
                    <div class="item-home score-center left text-center">\
                        <div class="second"><span class=" icon icon-live-icon" ng-show="eventItem.is_live"></span>{{eventItem.match.current_minute}}\'</div>\
                        <div class="score">\
                            <div class="home-score left">{{eventItem.match.teams[0].score}}</div>\
                            <div class="home-score half left">:</div>\
                            <div class="home-score left">{{eventItem.match.teams[1].score}}</div>\
                        </div>\
                    </div>\
                    <div class="item-home away left text-center text-uppercase">\
                        <img class="text-left" src="{{eventItem.match.teams[1].flag_url}}">\
                        <div class="name">{{eventItem.match.teams[1].short_name}}</div>\
                    </div>\
                </div> ';

            var tennisTemplate = '\
                <div class="icon-small icon-tenis"></div>\
                <div class="item-sport tenis">\
                    <div class="item-tenis left text-center text-uppercase">\
                        <div class="tenis-left text-left">\
                            <div class="tenis-home">\
                                <div class="tenis-header">\
                                    <img src="{{eventItem.match.teams[0].country_flag}}">\
                                    <div class="name text-uppercase">{{eventItem.match.teams[0].short_name}}</div>\
                                </div>\
                                <div class="box-tenis">\
                                    <div ng-repeat="tnset in eventItem.match.teams[0].score" class="box" ng-class="{\'score\': tnset.played}">{{tnset.score}}</div>\
                                </div>\
                            </div>\
                            <div class="tenis-home">\
                                <div class="tenis-header">\
                                    <img src="{{eventItem.match.teams[1].country_flag}}">\
                                    <div class="name text-uppercase">{{eventItem.match.teams[1].short_name}}</div>\
                                </div>\
                                <div class="box-tenis">\
                                    <div ng-repeat="tnset in eventItem.match.teams[0].score" class="box" ng-class="{\'score\': tnset.played}">{{tnset.score}}</div>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="tenis-right">\
                            <div class="time">23:00</div>\
                            <div class="date">13/03/2017</div>\
                        </div>\
                    </div>\
                </div>';
            var golfTemplate = '\
                <div class="icon-small icon-golf"></div>\
                <div class="item-sport golf">\
                    <div class="item-golf text-center ">\
                        <div class="header-golf">\
                            <div class="date">23:00 </div>\
                            <div class="time">13/03/2017</div>\
                        </div>\
                        <div class="golf-score">\
                            <div ng-repeat="team in eventItem.match.teams" class="list-golf">\
                                <div class="box">{{team.position}}</div>\
                                <div class="name">{{team.short_name}}</div>\
                                <div class="box score right">{{team.score}}</div>\
                            </div>\
                        </div>\
                    </div>\
                </div>';
            var basketballTemplate = '\
                <div class="icon-small icon-bongro"></div>\
                <div class="item-sport bongro">\
                    <div class="item-home left text-center text-uppercase">\
                        <img class="text-right" src="{{eventItem.match.teams[0].flag_url}}">\
                    </div>\
                    <div class="item-home score-center left text-center">\
                        <div class="second">{{eventItem.match.current_minute}}\'</div>\
                        <div class="score bongro">\
                            <div class="home">\
                                <div class="name">{{eventItem.match.teams[0].short_name}}</div>\
                                <div class="box-score">{{eventItem.match.teams[0].score}}</div>\
                            </div>\
                            <div class="home half">\
                                <div class="name">Per</div>\
                                <div class="box-score half">{{eventItem.match.current_per}}</div>\
                            </div>\
                            <div class="home">\
                                <div class="name">{{eventItem.match.teams[1].short_name}}</div>\
                                <div class="box-score">{{eventItem.match.teams[1].score}}</div>\
                            </div>\
                        </div>\
                        <div class="time">23:00</div>\
                        <div class="date">14/03/2017</div>\
                    </div>\
                    <div class="item-home away left text-center text-uppercase">\
                        <img class="text-left" src="{{eventItem.match.teams[1].flag_url}}">\
                    </div>\
                </div>';

            var getTemplate = function (event) {
                var template = '';

                switch (parseInt(event.type)) {
                    case sportTypes.SOCCER:
                        template = soccerTemplate;
                        break;
                    case sportTypes.TENNIS:
                        template = tennisTemplate;
                        break;
                    case sportTypes.GOLF:
                        template = golfTemplate;
                        break;
                    case sportTypes.BASKETBALL:
                        template = basketballTemplate;
                        break;
                }
                return template;
            };

            var linker = function (scope, element, attrs) {
                scope.eventItem = scope.eventLoaded;
                var newEl = angular.element(getTemplate(scope.eventLoaded));
                element.append(newEl);
                $compile(newEl)(scope);

                if (attrs.dynamicUpdate != undefined && attrs.dynamicUpdate == "1") {
                    scope.$on(systemEvents.CHANGE_LIVE_EVENT, function (event, data) {
                        var newEl = angular.element(getTemplate(data));
                        scope.eventItem = data;
                        element.html(newEl);
                        $compile(newEl)(scope);
                    });
                }
            };
            return {
                restrict: "E",
                replace: true,
                link: linker,
                scope: {
                    eventLoaded: "=eventitem"
                }
            };
        })
        .directive("iMediaPlayer", function imediaPlayer(systemEvents, ConfigData) {
            const TAG = "iMediaPlayer";
            return {
                restrict: "E",
                template: '<object id="i-player" type="application/avplayer" style="width:100%;height:100%"></object>',
                scope: {
                    eventLoad: "=eventitem"
                },
                controller: function iMediaPlayer($scope, Utils, systemEvents, ConfigData) {
                    var defaultResolutionWidth = 1920;
                    var self = this;
                    var playerObj = document.getElementById("i-player");
                    $scope.eventItem = $scope.eventLoad;
                    //Check the screen width so that the AVPlay can be scaled accordingly

                    var listener = {
                        onbufferingstart: function () {
                            Utils.log("Buffering start.", TAG);
                        },
                        onbufferingprogress: function (percent) {
                            Utils.log("Buffering progress data : " + percent, TAG);
                        },
                        onbufferingcomplete: function () {
                            Utils.log("Buffering complete.", TAG);
                        },
                        onevent: function (eventType, eventData) {
                            Utils.log("event type: " + eventType + ", data: " + eventData, TAG);
                        },
                        onstreamcompleted: function () {
                            Utils.log("Stream Completed", TAG);
                            self.stop();
                        },
                        onerror: function (eventType) {
                            Utils.log("event type error : " + eventType, TAG);
                        }
                    };

                    this.play = function(url) {
                        if (!url) {
                            Utils.log("Url empty", TAG);
                        }
                        Utils.log('videoPlayer open: ' + url, TAG);
                        try {
                            webapis.avplay.open(url);
                            webapis.avplay.setDisplayRect(playerObj.offsetLeft, playerObj.offsetTop, playerObj.offsetWidth, playerObj.offsetHeight);
                            webapis.avplay.setListener(listener);
                        } catch (e) {
                            Utils.log(e, TAG);
                        }
                        webapis.avplay.prepareAsync(function() { webapis.avplay.play(); });
                    };

                    this.stop = function() {
                        webapis.avplay.stop();
                    };

                    /**
                     * Suspend playback for multitasking
                     */
                    this.suspend = function() {
                        webapis.avplay.pause();
                        webapis.avplay.suspend();
                    };

                    /**
                     * resume playback for multitasking
                     */
                    this.resume = function() {
                        webapis.avplay.restore();
                        webapis.avplay.play();
                    };
                    Utils.dispatchCallbackUsingAngularTimeout(function () {
                        if($scope.eventItem != undefined){
                            self.play($scope.eventItem.url_streaming);
                        }
                    },500);

                    $scope.$on(systemEvents.MEDIA_PLAY_EVENT, function (event, data) {
                        if(data.id != $scope.eventItem.id){
                            Utils.log("Start play video", TAG);
                            self.stop();
                            $scope.eventItem = data;
                            self.play($scope.eventItem.url_streaming);
                        }else{
                            Utils.log("Ignore play", TAG);
                        }
                    })
                },
                link: function link(scope, element, attrs) {
                    element.on('$destroy', function () {
                        Utils.log("On Destroy", "iMediaPlayer")
                        webapis.avplay.close();
                    });
                }
            }
        })
    ;
})();