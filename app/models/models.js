/**
 * Created by MyPC on 20/02/2017.
 */
(function () {
    angular.module("app.models", ['app.constants', 'app.utils'])
        .factory('LiveEventSoccer', function ($http) {
                /*
                 {
                 type = 1
                 }
                 */
                function LiveEventSoccer(data) {
                    this.name = "soccer";
                    if (data) {
                        this.setData(data);
                    }
                    // Some other initializations related to book
                }

                LiveEventSoccer.prototype = {
                    setData: function (data) {
                        angular.extend(this, data);
                    },
                    getFocusable: function (depth,index) {
                        var focustable = '{depth: ' + depth + ', name: "'+this.getNameID()+'"}';
                        return focustable;
                    },
                    getNameID: function () {
                        return this.name + this.id;
                    }
                };
                return LiveEventSoccer;
            }
        )
        .factory('LiveEventTennis', function ($http) {
                /*
                 type = 2
                 */
                function LiveEventTennis(data) {
                    this.name = "tennis";
                    if (data) {
                        this.setData(data);
                    }
                    // Some other initializations related to book
                }

                LiveEventTennis.prototype = {
                    setData: function (data) {
                        angular.extend(this, data);
                    },
                    getFocusable: function (depth,index) {
                        var focustable = '{depth: ' + depth + ', name: "'+this.getNameID()+'"}';
                        return focustable;
                    },
                    getNameID: function () {
                        return this.name + this.id;
                    }
                };
                return LiveEventTennis;
            }
        )
        .factory('LiveEventGolf', function ($http) {
                /*
                 {
                 type = 3
                 }
                 */
                function LiveEventGolf(data) {
                    this.name = "golf";
                    if (data) {
                        this.setData(data);
                    }
                    // Some other initializations related to book
                }

                LiveEventGolf.prototype = {
                    setData: function (data) {
                        angular.extend(this, data);
                    },
                    getFocusable: function (depth,index) {
                        var focustable = '{depth: ' + depth + ', name: "'+this.getNameID()+'"}';
                        return focustable;
                    },
                    getNameID: function () {
                        return this.name + this.id;
                    }
                };
                return LiveEventGolf;
            }
        )
        .factory('LiveEventBasketBall', function ($http) {
                /*
                 {
                 type = 4
                 }
                 */
                function LiveEventBasketBall(data) {
                    this.name = "basketball";
                    if (data) {
                        this.setData(data);
                    }
                    // Some other initializations related to book
                }

                LiveEventBasketBall.prototype = {
                    setData: function (data) {
                        angular.extend(this, data);
                    },
                    getFocusable: function (depth,index) {
                        var focustable = '{depth: ' + depth + ', name: "'+this.getNameID()+'"}';
                        return focustable;
                    },
                    getNameID: function () {
                        return this.name + "-" + this.id;
                    }
                };
                return LiveEventBasketBall;
            }
        )
        .factory('LiveEvents', function ($http, sportTypes, LiveEventSoccer, LiveEventTennis, LiveEventGolf, LiveEventBasketBall) {
            /*
             */
            function LiveEvents(data) {
                this.events = [];
                if (data) {
                    this.setData(data);
                }
            }

            LiveEvents.prototype = {
                setData: function (data) {
                    if (data || data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            var event = data[i];
                            var item = null;
                            if(event.type == sportTypes.SOCCER){
                                item = new LiveEventSoccer();
                            }else if(event.type == sportTypes.TENNIS){
                                item = new LiveEventTennis();
                            }else if(event.type == sportTypes.GOLF){
                                item = new LiveEventBasketBall();
                            }else if(event.type == sportTypes.BASKETBALL){
                                item = new LiveEventBasketBall();
                            }
                            item.setData(event);
                            this.events.push(item);
                        }
                    }
                }
            };
            return LiveEvents;
        })
        .factory('HomePage', function ($http, LiveEvents, api, Utils) {
            /*
             {
             "home": "iSport",
             "version": "0.1",
             "live_events": [
             {}
             ]
             */
            const TAG = "HomePage";
            function HomePage() {
                this.home = "";
                this.version = 0;
                this.liveEvents = null;
                this.liveScores = [];
            }

            HomePage.prototype = {
                loadData: function (successCallback, failCallback) {
                    var self = this;
                    $http.get(api.base_url + '/home.json')
                        .then(function (res) {
                                var data = res.data;
                                console.log(data);
                                self.home = data.home;
                                self.version = data.version;
                                self.liveEvents = new LiveEvents(data.live_events);
                                successCallback(res);
                            }, function (res) {
                                failCallback(res);
                            }
                        )
                }
            };
            return HomePage;
        })
})();