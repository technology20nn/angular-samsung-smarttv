(function(){
	angular.module("app.utils", ["app.configuration", "app.constants"])
		.provider("Utils", function(){
			var logMessageEnabled = null,
				useConsoleLogMethod = true;

			this.$get = function($timeout, ConfigData, timeEffects){
				var publicMethods = {},
					targetLogTag = null;

				publicMethods.log = function(message, logTag, isError){
					var logMsg = "Log message is not available",
						extraTag = (isError===true) ? "[ERROR] " : "";

                    logMessageEnabled = ConfigData.isLogMessageEnabled();
                    if(logMessageEnabled===false){
                        return;
                    }

					if( logMessageEnabled===true){
						if(!angular.isString(logTag)){
							logTag = "Application";
						}
						logMsg = "---" + logTag + "---" + extraTag + message + "\n";

						performLogging();
					}

					function performLogging(){
						if(useConsoleLogMethod === true){
							console.log(logMsg);
						}else{
							alert(logMsg);
						}
					}
				};

				publicMethods.dispatchCallbackUsingAngularTimeout = function(callback, delay){
					if(angular.isFunction(callback)){
						if(!delay){
							return $timeout(callback);
						}else{
							return $timeout(callback, delay);
						}
					}
				};
                publicMethods.holdKey = function (lastTimePressed) {
                    var diff = Date.now() - lastTimePressed;
                    publicMethods.log("Diff time: " + diff);
                    return (diff <= timeEffects.TIME_DETERMINE_HOLD_KEY);
                };

				return publicMethods;
			};
		})
	;
})();