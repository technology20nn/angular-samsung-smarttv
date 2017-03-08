(function(){
	angular.module("app.services", ["app.utils", "ui.router", "app.constants", "caph.focus"])
        .factory("ContextStack", function(Utils, $state, contexts, vlayers, fstates, focusController) {
            var TAG = "Services - ContextStack",
                contextStack = [],
                currentState = {
            		restore: true,
                    state:null
				},
                prevState = {
                    restore: true,
                    state:null
				},
				mainCtl = null,
                publicMethods = {};


            /**
			 * Function thuc hien quan ly stack
			 * ========================================================================================
			 * Thuc hien check xem co nen push context moi ko.
			 * Ham nay se dc goi trong event success cua url-route ($transaction.onSuccess)
             * @param fromFstate
             * @param toFsate
             * @returns {boolean} Xem co push vao array context stack ko.
             */
            publicMethods.pushState = function(toFsate, fromFstate){
            	var pushContext = true;
                /**
				 * Neu chuyen doi state cua 2 context khach nhau:
				 * - Push state vao stack
				 * - Set prev state will restore state
                 */
				if(
                    fromFstate!==null
                    && fromFstate!==undefined){
					pushContext = fromFstate.context.id != toFsate.context.id;
				}

				if(pushContext){
					if(contextStack.length > 0){
						contextStack[contextStack.length - 1].restore = true;
					}
					currentState.restore = true;
					currentState.state = toFsate;
					contextStack.push(currentState);
				}else {
                    if(contextStack.length > 0){
                        currentState.restore = false;
                        currentState.state = toFsate;
                        contextStack[contextStack.length - 1].restore = currentState;
                    }
				}
				Utils.log("ContextStack Lenght: " + contextStack.length + "| current state: " + currentState.state.name);
				publicMethods.changeFocusView(currentState.state.context.depth,currentState.state.group,currentState.state.layer, currentState.state.init_focus);
				return pushContext;
            };

            publicMethods.popState = function(){
                Utils.log("ContextStack Lenght: " + contextStack.length + "| current state: " + currentState.state.name);
                if(contextStack.length > 1){
                	contextStack.pop();
                }else{
                    publicMethods.showConfirm("Bạn có muốn thoát khỏi ứng dụng?", function () {
                        if(mainCtl && mainCtl != undefined){
                            mainCtl.exitApp();
                        }
                    })
                }
            };
            //============================================End==================================================

            /**
			 * Thuc hien routing va change focus
			 * ================================================================================================
			 * Chuyen sang trang moi, cac component hay controller muon chuyen sang trang moi can phai goi ham nay
             * @param from
             * @param to
			 * @param params
             * @param onSuspend function callback de save du lieu hien tai
             */
            publicMethods.routeState = function (from, to, params, onSuspend) {
                Utils.log("Route to state : " + to.name);
                var isSuspend = true;
                /**
                 * Neu chuyen doi state cua 2 context khach nhau:
                 * - Push state vao stack
                 * - Set prev state will restore state
                 */
                if(
                    from!==null
                    && from!==undefined && from.context.id == to.context.id){
                    isSuspend = false;
                }
				if(isSuspend &&  typeof onSuspend == "function"){
					onSuspend();
				}

                $state.go(to.name, params);
            };

            publicMethods.changeFocusView = function (depth, group, layer, initFocus) {
                //Change focus vs view layer
                Utils.dispatchCallbackUsingAngularTimeout(function () {
                    focusController.setDepth(depth, group);
                    if(initFocus != undefined){
                        focusController.focus(initFocus)
                    }
                    /**
                     * Hidden main page, and show new component
                     */
                    if(mainCtl && mainCtl != undefined){
                        mainCtl.setLayer(layer);
                    }
                },100);
            };

            publicMethods.saveCurrentFocus = function () {
                if(currentState.state){
            		currentState.state.init_focus = focusController.getCurrentFocusItem();
				}
            };

            publicMethods.showFocusCurrentContext = function () {
                Utils.log("ContextStack Lenght: " + contextStack.length + "| current state: " + currentState.state.name);
                if(currentState.state){
                    publicMethods.changeFocusView(currentState.state.context.depth, currentState.state.group, currentState.state.layer, currentState.state.init_focus);
                }
            };
			//=============================================End==============================================

            /**
			 * Nhom function build san cac thanh phan co ban: alert, confirm, loading...
			 * ==============================================================================================
			 * Hiển thị loading: Khi bắt đầu thực hiện chuyển trạng thái
             */
            publicMethods.showLoading = function () {
                /**
                 * HIen thi loading
				 * Khi muon an di chi can thay doi layer
                 */
                if(mainCtl && mainCtl != undefined){
                    mainCtl.showLoading();
                }

            };

            publicMethods.showAlert = function ($message) {
                publicMethods.saveCurrentFocus();
                /**
                 * Hien thi alert
                 */
                if(mainCtl && mainCtl != undefined){
                    mainCtl.showAlert($message);
                }
                //TODO: Chuyen focus va back.
            };

            publicMethods.showConfirm = function ($message, confirmOK) {
                publicMethods.saveCurrentFocus();
                /**
                 * Hien thi alert
                 */
                if(mainCtl && mainCtl != undefined){
                    mainCtl.showConfirm($message,confirmOK, function () {
                    	Utils.log("User click cancel");
						//Thuc hien khi nguoi dung click cancel
						if(currentState.state){
                            publicMethods.changeFocusView(currentState.state.context.depth, currentState.state.group, currentState.state.layer, currentState.state.init_focus);
                        }
                    });
                }
                //Change focus
                publicMethods.changeFocusView(contexts.DIALOG_CONFIRM.depth, fstates.DIALOG_CONFIRM.group, vlayers.DIALOG_CONFIRM, fstates.DIALOG_CONFIRM.init_focus);
            };
            //============================================ END =========================================

            publicMethods.getCurrentState = function () {
				return currentState;
            };


            publicMethods.setMainCtl = function (main) {
				mainCtl = main;
            };

            return publicMethods;
        })
	;
})();
