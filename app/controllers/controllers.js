(function(){

	angular.module("app.controllers", ["app.configuration"
									  ,"app.services"
									  ,"app.constants"
									  ,"app.utils"
									  ,"app.models"
                                      ,"caph.focus"])
		.controller("MainController", MainController);

	//This controller act as our main entry point to receive and communicate with
	//Main.js. This controller should be seen as the master controller that will
	//receive all keydown events then cleverly select the right child controller to pass
	//the keydown event to
	function MainController(ConfigData, Utils, keymap, focusController, HomePage, $scope, ContextStack, vlayers, fstates){
		var TAG = "Controller - MainController",
			isSmartTVMode = ConfigData.isSmartTVMode(),
			_THIS = this;

        var homeData = new HomePage();

        //Default layer show splash screen
        $scope.currentLayer = vlayers.LOADING;
        $scope.title = "Home Page";
        $scope.vlayers = vlayers;
        $scope.liveEvents = [];

        //Message truyen vao alert
		$scope.alertMessage = "";
        $scope.confirmOK =  function () {
			//Dummy function
        };
        $scope.confirmCancel = function () {
			//DummyFunction
        };
        $scope.isActiveLayer = function(layer){
        	return (layer == $scope.currentLayer);
		};

		//set application's global Main variable's controller to this controller
		Main.mainController = _THIS;
        ContextStack.setMainCtl(_THIS);

        /**
		 * Function thuc hien event goi tu Main.js
		 * - Khi onload
		 * - Khi unload
         */
		this.onApplicationOnLoadComplete = function(){
            /**
             * Note: Muon set focus default thi can fai delay 1 khoang thoi gian de component focusable co the compile
             */
            Utils.log("***onApplicationOnLoadComplete()***", TAG);
            Utils.dispatchCallbackUsingAngularTimeout(initHomPage,100);
		};

		this.onApplicationUnload = function(){
			Utils.log("***onApplicationUnload()***", TAG);
		};

		this.exitApp = function () {
            Utils.log("***onApplication Exit***", TAG);
            if(tizenApp != null){
                tizenApp.getCurrentApplication().exit();
            }
        };

		this.onApplicationSuspend = function () {
            Utils.log("***onApplication Suspend***", TAG);
            webapis.avplay.suspend();
        };

		this.onApplicationRestore = function () {
            Utils.log("***onApplication Restore***", TAG);
            webapis.avplay.restore();
        };
		//========================================================================

        /**
		 * Cac function nay se dc service ContextStack goi.
		 * Thuong cac component ko the goi truc tiep vao controller, nen se goi qua service ContextStack het
         */
        this.setLayer = function (layer) {
            Utils.log("Change layer to: " + layer, TAG);
            $scope.currentLayer = layer;
        };

        this.showLoading = function () {
            $scope.currentLayer = vlayers.LOADING;
        };

        this.showAlert = function (message) {
            $scope.alertMessage = message;
            $scope.currentLayer = vlayers.DIALOG_ALERT;
        };

        this.showConfirm = function (message, confirmOK, confirmCancel) {
            $scope.alertMessage = message;
            $scope.confirmOK = confirmOK;
            $scope.confirmCancel = confirmCancel;
            $scope.currentLayer = vlayers.DIALOG_CONFIRM;
        };
        //====================================================================================================

        this.showMenu = function () {
            ContextStack.showConfirm("Test confirm",
                function () {
                    Utils.log("User confirm ok", TAG);
                })
        };

        function initHomPage() {
            homeData.loadData(function (res) {
                if(homeData.liveEvents && homeData.liveEvents.events.length > 0){
                    angular.copy(homeData.liveEvents.events,$scope.liveEvents);
                }
                console.log($scope.liveEvents);
                ContextStack.routeState(null, fstates.HOME);
            }, function (res) {
                Utils.log("fail");
            });
        }

        /**
		 * Process pressed key
         */
        var timeLastPressed = Date.now();
        var prevKey = 0;
        function beforeHandleKey(context) {
            if(prevKey == context.event.keyCode && Utils.holdKey(timeLastPressed)){
                Utils.log("HoldKey " + prevKey, TAG);
                return false;
            }
            prevKey = context.event.keyCode;
            timeLastPressed = Date.now();

            Utils.log("Key: " + context.event.keyCode, TAG);
            Utils.log("Current layer: " + $scope.currentLayer, TAG);
            //Process back button
            if(context.event.keyCode == keymap.RETURN || context.event.keyCode == keymap.ESC){
                if($scope.currentLayer == vlayers.LOADING || $scope.currentLayer == vlayers.DIALOG_CONFIRM || $scope.currentLayer == vlayers.DIALOG_ALERT){
                    ContextStack.showFocusCurrentContext();
                }else {
                    ContextStack.popState();
                }
            }
            return true;
        }

        focusController.addBeforeKeydownHandler(beforeHandleKey);
    }

	//The base controller, any controller that wants to handle the keydown event
	//should extend from this controller.
	function CoreController($scope, FocusHandlerFactory, Utils){
		var _THIS = this;

		//Define if keyDown function should be listened or not
		$scope.isFocus = false;

		this.setFocus = function(value){
			if(value != $scope.isFocus){
				Utils.dispatchCallbackUsingAngularTimeout(function(){
					$scope.isFocus = value;
				});
			}
			if( value===true ){
				FocusHandlerFactory.setCurrentFocusController(_THIS);
			}
		};
	}

})();

