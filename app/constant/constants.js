/**
 * Created by MyPC on 20/02/2017.
 */
(function(){
    const contexts = {
        HOME: {
            id: 1,
            depth: 1,
            needHide: false,
            name: "Home Context"
        },
        LIST: {
            id: 2,
            depth: 2,
            hide: false,
            name: "List Context"
        },
        DETAIL: {
            id: 3,
            depth: 3,
            needHide: false,
            name: "Detail Context"
        },
        DIALOG_ALERT: {
            id: 99,
            depth: 99,
            needHide: true,
            name: "Dialog Context"
        },
        DIALOG_CONFIRM: {
            id: 100,
            depth: 100,
            needHide: true,
            name: "Dialog Context"
        }
    };
    const viewLayers = {
        LOADING:1,
        SPLASH:2,
        HOME:3,
        CONTENT:4,
        DIALOG_ALERT:5,
        DIALOG_CONFIRM:6
    };
    angular.module("app.constants", [])
        .constant(
            'api',
            {
                'base_url':'http://210.245.125.16/isport',
                'key':''
            }
        )
        .constant(
            'keymap',
            {
                ENTER:13,
                UP:38,
                DOWN:40,
                LEFT:37,
                RIGHT:39,
                RETURN: 10009,
                ESC: 27,
                NUM_0:48,
                NUM_1:49,
                NUM_2:50,
                NUM_3:51,
                NUM_4:52,
                NUM_5:53,
                NUM_6:54,
                NUM_7:55,
                NUM_8:56,
                NUM_9:57
            }
        )
        .constant(
            'sportTypes',{
                SOCCER:1,
                TENNIS:2,
                GOLF:3,
                BASKETBALL:4
            }
        )
        .constant(
            'contexts', contexts)
        .constant(
            'vlayers', viewLayers
        )
        .constant('fstates', {
                HOME: {
                    id: 1,
                    context: contexts.HOME,
                    name: "home",
                    layer: viewLayers.HOME,
                    init_focus:"",
                    group:""
                },
                LIST_NEW: {
                    id: 2,
                    context: contexts.LIST,
                    name: "news",
                    layer: viewLayers.CONTENT,
                    init_focus:"",
                    group:""
                },
                LIST_LIVE: {
                    id: 3,
                    context: contexts.LIST,
                    name: "channels",
                    layer: viewLayers.CONTENT,
                    init_focus:"",
                    group:""
                },
                LIST_VOD: {
                    id: 4,
                    context: contexts.LIST,
                    name: "vods",
                    layer: viewLayers.CONTENT,
                    init_focus:"",
                    group:""
                },
                DETAIL_LIVE: {
                    id: 5,
                    context: contexts.DETAIL,
                    name: "detail-live",
                    layer: viewLayers.CONTENT,
                    init_focus:"",
                    group:""
                },
                DIALOG_ALERT: {
                    id:99,
                    context: contexts.DIALOG_ALERT,
                    name:"dialog",
                    layer: viewLayers.DIALOG_ALERT,
                    init_focus:"",
                    group:""
                },
                DIALOG_CONFIRM: {
                    id:100,
                    context: contexts.DIALOG_CONFIRM,
                    name:"dialog",
                    layer: viewLayers.DIALOG_CONFIRM,
                    init_focus:"callback-ok",
                    group:""
                }
            }
        )

})();
