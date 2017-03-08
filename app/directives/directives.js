(function(){
	angular.module("app.directives",["app.utils", "app.services", "app.constants"])
		.directive("falert", function(){
			return {
				restrict : "E",
                templateUrl: "app/views/alert.html",
				scope:true,
                controller: function falert($scope, Utils, ContextStack, contexts) {
					$scope.depth = contexts.DIALOG_ALERT.depth;
                }
			}
		})
        .directive("fconfirm", function fconfirm(){
            return {
                restrict : "E",
                templateUrl: "app/views/confirm.html",
                scope:true,
                controller: function fconfirm($scope, Utils, ContextStack, contexts) {
                    $scope.depth = contexts.DIALOG_CONFIRM.depth;
                }
            }
        })
        .directive("liveEvent", function liveEvent($compile, sportTypes){
            var soccerTemplate = '\
                <div class="icon-small icon-bongda"></div>\
                <div class="item-sport">\
                    <div class="item-home left text-center text-uppercase">\
                        <img class="text-right" src="assets/img/mu.png">\
                        <div class="name">Mu</div>\
                    </div>\
                    <div class="item-home score-center left text-center">\
                        <div class="second"><span class=" icon icon-live-icon"></span>15\'</div>\
                        <div class="score">\
                            <div class="home-score left">0</div>\
                            <div class="home-score half left">:</div>\
                            <div class="home-score left">1</div>\
                        </div>\
                    </div>\
                    <div class="item-home away left text-center text-uppercase">\
                        <img class="text-left" src="assets/img/man-city.png">\
                        <div class="name">MCIty</div>\
                    </div>\
                </div> ';

            var tennisTemplate = '\
                <div class="icon-small icon-tenis"></div>\
                <div class="item-sport tenis">\
                    <div class="item-tenis left text-center text-uppercase">\
                        <div class="tenis-left text-left">\
                            <div class="tenis-home">\
                                <div class="tenis-header">\
                                    <img src="assets/img/italia-logo.png">\
                                    <div class="name text-uppercase">Lepchenko</div>\
                                </div>\
                                <div class="box-tenis">\
                                    <div class="box score">3</div>\
                                    <div class="box"></div>\
                                    <div class="box"></div>\
                                    <div class="box"></div>\
                                    <div class="box"></div>\
                                </div>\
                            </div>\
                            <div class="tenis-home">\
                                <div class="tenis-header">\
                                    <img src="assets/img/italia-logo.png">\
                                    <div class="name text-uppercase">Mladenovic(2)</div>\
                                </div>\
                                <div class="box-tenis">\
                                    <div class="box score">3</div>\
                                    <div class="box"></div>\
                                    <div class="box"></div>\
                                    <div class="box"></div>\
                                    <div class="box"></div>\
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
                            <div class="list-golf">\
                                <div class="box">1</div>\
                                <div class="name">Woods</div>\
                                <div class="box score right">-6</div>\
                            </div>\
                            <div class="list-golf">\
                                <div class="box">1</div>\
                                <div class="name">Woods</div>\
                                <div class="box score right">-1</div>\
                            </div>\
                            <div class="list-golf">\
                                <div class="box">1</div>\
                                <div class="name">Woods</div>\
                                <div class="box score right">5</div>\
                            </div>\
                        </div>\
                    </div>\
                </div>';
            var basketballTemplate = '\
                <div class="icon-small icon-bongro"></div>\
                <div class="item-sport bongro">\
                    <div class="item-home left text-center text-uppercase">\
                        <img class="text-right" src="assets/img/bong-ro01.png">\
                    </div>\
                    <div class="item-home score-center left text-center">\
                        <div class="second">15\'</div>\
                        <div class="score bongro">\
                            <div class="home">\
                                <div class="name">Guest</div>\
                                <div class="box-score">17</div>\
                            </div>\
                            <div class="home half">\
                                <div class="name">Per</div>\
                                <div class="box-score half">4</div>\
                            </div>\
                            <div class="home">\
                                <div class="name">Home</div>\
                                <div class="box-score">14</div>\
                            </div>\
                        </div>\
                        <div class="time">23:00</div>\
                        <div class="date">14/03/2017</div>\
                    </div>\
                    <div class="item-home away left text-center text-uppercase">\
                        <img class="text-left" src="assets/img/bong-ro02.png">\
                    </div>\
                </div>';

            var getTemplate = function(event){
                var template = '';

                switch(parseInt(event.type)){
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

            var linker = function(scope, element, attrs){
                if(scope.events.length > 0){
                    var newEl = angular.element(getTemplate(scope.events[attrs.eventItem]));
                    element.html(newEl);
                    $compile(newEl)(scope);
                }
                if(attrs.dynamicUpdate != undefined && attrs.dynamicUpdate == "1"){
                    attrs.$observe('eventItem', function(val) {
                        if(scope.events.length > 0){
                            var newEl = angular.element(getTemplate(scope.events[val]));
                            element.html(newEl);
                            $compile(newEl)(scope);
                        }
                    });
                }
            };
            return {
                restrict: "E",
                replace: true,
                link: linker
            };
        })
	;
})();