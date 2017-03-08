(function() {
	angular.module("app.configuration", ["app.constants"])
		.factory("ConfigData", function ($http) {
			var isProductionMode = false,
				isSmartTVMode,
				logMessageEnabled = true,
				deviceInfo = {},
				publicMethods = {};

			//widgetAPI object only exists in real device mode so we base on this variable to tell if the app is being run
			//on a real tv device or on a web browser
			if (productInfo != null) {
				isSmartTVMode = true;
                deviceInfo.platform = tizenInfo.getCapabilities().platformName;
                deviceInfo.model = productInfo.getModel();
                deviceInfo.version = productInfo.getVersion();
                deviceInfo.firmware = productInfo.getFirmware();
                deviceInfo.duid = productInfo.getDuid();
                if(deviceInfo.duid == ''){
                	//Fake for developer
                	deviceInfo.duid = "123456";
				}
			} else {
				isSmartTVMode = false;
				deviceInfo.platform = "Tizen";
                deviceInfo.model = "UKS9000";
                deviceInfo.version = "1.0";
                deviceInfo.firmware = "T-HKPAKUC-0000.0";
                deviceInfo.duid = "123456";
			}

            deviceInfo.smartTVMode = isSmartTVMode;

			publicMethods.init = function (configData) {
				if(configData.appConfig){
					var appConfig = configData.appConfig;
					isProductionMode = (appConfig.isProductionMode) ? true : false;

					if(isProductionMode==true){
						logMessageEnabled = false;
					}else{
						logMessageEnabled = appConfig.logMessageEnabled;
					}
				}
			};

			publicMethods.isProductionMode = function(){
				return isProductionMode;
			};

			publicMethods.isSmartTVMode = function(){
				return isSmartTVMode;
			};

			publicMethods.isLogMessageEnabled = function(){
				return logMessageEnabled;
			};

			publicMethods.getDeviceInfo = function () {
				return deviceInfo;
            };

			return publicMethods;
		})
})();