/**
 * ---------------------------------------
 * Application Initialisation Phase
 * ---------------------------------------
 */
var app = angular.module("FlixSamsung", [
										"ui.router"
										,"app.configuration"
										,"app.constants"
										,"app.models"
									  	,"app.controllers"
										,"app.directives"
    									,"app.components"
									  	,"app.services"
									  	,"app.utils"]);
/**
 * ---------------------------------------
 * Application Configuration Phase
 * ---------------------------------------
 */
app.config(function($stateProvider, fstates) {
	console.log("Init config");
    var states =  [
        {
            name: fstates.HOME.name,
            url: 'home',
            views: {
                home: 'home'
            },
			params:{
            	fstate: fstates.HOME
			}
        }
    ];
    states.forEach(function(state) {
        $stateProvider.state(state);
    });
});
/**
 * ---------------------------------------
 * Application Creation Complete phase
 * ---------------------------------------
 */
app.run(function( $http,
				  ConfigData,
				  Utils, $transitions, ContextStack){
	var TAG = "***Application RUN PHASE***",
		path = document.URL,
		configUrl = path.substring(0, path.lastIndexOf('/')) + "/" + "appConfig.json";
	$http.get(configUrl)
		.then(function(data){
			setupApplication(data.data);
			Utils.log("Application Config loaded completed", TAG);
		});

	function setupApplication(configData){
		ConfigData.init(configData);
	}

    /**
	 * Transaction Lifecycle
	 * Create --> Before -> Start -> Retain -> Enter -> Finish -> Success
     */
    $transitions.onBefore({}, function($transition$, $state$) {
        console.log("onBefore");
    });
    $transitions.onCreate({}, function($transition$, $state$) {
        console.log("onCreate");
    });
    $transitions.onRetain({}, function($transition$, $state$) {
        console.log("onRetain");
    });
    $transitions.onStart({}, function($transition$, $state$) {
        console.log("onStart");
    });
    $transitions.onFinish({}, function($transition$, $state$) {
        console.log("onFinish");
    });
    $transitions.onEnter({}, function($transition$, $state$) {
        console.log("onEnter");
    });
    $transitions.onSuccess({}, function($transition$) {
        var toState = $transition$.to().params.fstate;
        var fromState = ($transition$.from())?$transition$.from().params.fstate:null;
        ContextStack.pushState(toState, fromState)
    });
});