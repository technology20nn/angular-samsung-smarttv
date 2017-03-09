var productInfo = null;
var tizenInfo = null;
var tizenApp = null;
if(typeof webapis != 'undefined'){
    productInfo = webapis.productinfo;
    tizenInfo = tizen.systeminfo;
    tizenApp = tizen.application;
}


var Main = {
    mainController: null
};

Main.onLoad = function()
{
    console.log("************************Main.onLoad()*************************");
    if( Main.mainController!=null
        && Main.mainController.onApplicationOnLoadComplete!=null){
        Main.mainController.onApplicationOnLoadComplete();
    }
};

//This process is to active the native volume control
Main.onUnload = function(){
    //Stop the Player plugin right after the app exit
    console.log("************************Main.onUnload()*************************");
    if( Main.mainController!=null
        && Main.mainController.onApplicationUnload!=null){
        Main.mainController.onApplicationUnload();
    }
};

document.addEventListener('visibilitychange', function() {
    if(document.hidden){
        if( Main.mainController!=null
            && Main.mainController.onApplicationUnload!=null){
            Main.mainController.onApplicationSuspend();
        }
    } else {
        if( Main.mainController!=null
            && Main.mainController.onApplicationUnload!=null){
            Main.mainController.onApplicationRestore();
        }
    }
});