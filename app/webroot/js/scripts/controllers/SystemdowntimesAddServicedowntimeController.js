angular.module('openITCOCKPIT')
    .controller('SystemdowntimesAddServicedowntimeController', function($scope, $http, $timeout){

        $scope.init = true;
        $scope.errors = null;

        $scope.Downtime = {
            InitialListLoaded: null,
            service_id: null,
            Recurring: {
                Style: {
                    "display": "none"
                },
                ReverseStyle: {
                    "display": "block"
                },
                AllWeekdays: {},
                is_recurring: null
            },
            SuggestedServices: {}
        };

        $scope.post = {
            params: {
                'angular': true
            },
            Systemdowntime: {
                is_recurring: false,
                weekdays: {},
                day_of_month: null,
                from_date: null,
                from_time: null,
                to_date: null,
                to_time: null,
                duration: null,
                downtimetype: 'service',
                objecttype_id: null,
                object_id: {},
                comment: null
            }
        };

        $scope.loadRefillData = function(){
            $http.get("/systemdowntimes/getHostdowntimeRefillData.json", {
                params: {
                    'angular': true
                }
            }).then(function(result){
                $scope.post.Systemdowntime.from_date=result.data.from_date;
                $scope.post.Systemdowntime.from_time=result.data.from_time;
                $scope.post.Systemdowntime.to_date=result.data.to_date;
                $scope.post.Systemdowntime.to_time=result.data.to_time;
                $scope.post.Systemdowntime.comment=result.data.comment;
                $scope.post.Systemdowntime.duration=result.data.duration;
                $scope.errors = null;
            }, function errorCallback(result){
                console.error(result);
                if(result.data.hasOwnProperty('error')){
                    $scope.errors = result.data.error;
                }
            });
        };

        $scope.loadRefillData();

        $scope.saveNewServiceDowntime = function(){
            if($scope.post.Systemdowntime.is_recurring){
                $scope.post.Systemdowntime.to_time=null;
                $scope.post.Systemdowntime.to_date=null;
                $scope.post.Systemdowntime.from_date=null;
            }
            $http.post("/systemdowntimes/addServicedowntime.json?angular=true", $scope.post).then(
                function(result){
                    $scope.errors = null;
                    if($scope.Downtime.Recurring.is_recurring){
                        $('#RecurringDowntimeCreatedFlashMessage').show();
                        setTimeout(function(){ window.location.href = '/systemdowntimes'; }, 1000);
                    } else {
                        $('#DowntimeCreatedFlashMessage').show();
                        setTimeout(function(){ window.location.href = '/downtimes/service'; }, 1000);
                    }
                },
                function errorCallback(result){
                    console.error(result.data);
                    if(result.data.hasOwnProperty('error')){
                        $scope.errors = result.data.error;
                    }
                }
            );
        };

        $scope.loadServicelist = function(needle){
            http_params = {
                'angular': true,
                'filter[Service.servicename]': needle
            };
            if($scope.Downtime.InitialListLoaded!=true){
                http_params = {
                    'angular': true
                };
                $scope.Downtime.InitialListLoaded=true;
            }

            $http.get("/services/loadServicesByString.json", {
                params: http_params
            }).then(function(result){
                $scope.Downtime.SuggestedServices = {};

                function search(nameKey, myArray){
                    for (var i=0; i < myArray.length; i++) {
                        if (myArray[i].key === parseInt(nameKey)) {
                            return myArray[i];
                        }
                    }
                }

                if((window.location+"").split("/")[(window.location+"").split("/").length-1].split(":")[1]){
                    $scope.Downtime.service_id=(window.location+"").split("/")[(window.location+"").split("/").length-1].split(":")[1];
                    if(!search($scope.Downtime.service_id, result.data.services)){
                        $http.get("/services/view/"+$scope.Downtime.service_id+".json").then(function(result2){
                            $scope.Downtime.SuggestedServices[0] = {
                                "id": $scope.Downtime.service_id,
                                "group": result2.data.service.Host.name,
                                "label": result2.data.service.Servicetemplate.name
                            };
                        });
                    }
                }

                result.data.services.forEach(function(obj, index) {
                    if($scope.Downtime.service_id){
                        index=index+1;
                    }
                    $scope.Downtime.SuggestedServices[index] = {
                        "id": obj.value.Service.id,
                        "group": obj.value.Host.name,
                        "label": obj.value.Servicetemplate.name
                    };
                });

                $scope.errors = null;
            }, function errorCallback(result){
                console.error(result);
                if(result.data.hasOwnProperty('error')){
                    $scope.errors = result.data.error;
                }
            });
        };

        $scope.loadServicelist();

        $scope.$watch('Downtime.Recurring.is_recurring', function(){
            if($scope.Downtime.Recurring.is_recurring === true){
                $scope.post.Systemdowntime.is_recurring=1;
                $scope.Downtime.Recurring.Style["display"]="block";
                $scope.Downtime.Recurring.ReverseStyle["display"]="none";
                if($scope.errors && $scope.errors['from_time']){
                    delete $scope.errors['from_time'];
                }
            }
            if($scope.Downtime.Recurring.is_recurring === false){
                $scope.post.Systemdowntime.is_recurring=0;
                $scope.Downtime.Recurring.Style["display"]="none";
                $scope.Downtime.Recurring.ReverseStyle["display"]="block";
            }
        });

        $scope.$watch('Downtime.service_id', function(){
            $scope.post.Systemdowntime.object_id = { 0: $scope.Downtime.service_id };
        });


        $( document ).ready(function(){

            var $ = window.jQuery || window.Cowboy || ( window.Cowboy = {} ), jq_throttle;
            $.throttle = jq_throttle = function( delay, no_trailing, callback, debounce_mode ) {
                var timeout_id,
                    last_exec = 0;
                if ( typeof no_trailing !== 'boolean' ) {
                    debounce_mode = callback;
                    callback = no_trailing;
                    no_trailing = undefined;
                }
                function wrapper() {
                    var that = this,
                        elapsed = +new Date() - last_exec,
                        args = arguments;
                    function exec() {
                        last_exec = +new Date();
                        callback.apply( that, args );
                    };
                    function clear() {
                        timeout_id = undefined;
                    };

                    if ( debounce_mode && !timeout_id ) {
                        exec();
                    }
                    timeout_id && clearTimeout( timeout_id );
                    if ( debounce_mode === undefined && elapsed > delay ) {
                        exec();
                    } else if ( no_trailing !== true ) {
                        timeout_id = setTimeout( debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay );
                    }
                };
                if ( $.guid ) {
                    wrapper.guid = callback.guid = callback.guid || $.guid++;
                }
                return wrapper;
            };

            $.debounce = function( delay, at_begin, callback ) {
                return callback === undefined
                    ? jq_throttle( delay, at_begin, false )
                    : jq_throttle( delay, callback, at_begin !== false );
            };

            var search = $('select').chosen().data('chosen');
            search.search_field.on('keyup', $.debounce( 250, function(e){
                var needle = $(this).val();
                if(needle != false){
                    $scope.loadServicelist(needle);
                }
            } ));

        });

    });