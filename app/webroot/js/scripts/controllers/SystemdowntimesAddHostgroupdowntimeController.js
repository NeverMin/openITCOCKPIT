angular.module('openITCOCKPIT')
    .controller('SystemdowntimesAddHostgroupdowntimeController', function($scope, $http){

        $scope.init = true;
        $scope.errors = null;

        $scope.Downtime = {
            Type1: "1",
            Type2: "0",
            AllWeekdays: {},
            is_recurring: false,
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
                downtimetype: 'hostgroup',
                downtimetype_id: 0,
                objecttype_id: 1024,    //1 << 10
                object_id: null,
                comment: null
            }
        };

        $scope.loadRefillData = function(){
            $http.get("/angular/downtime_host.json", {
                params: {
                    'angular': true
                }
            }).then(function(result){
                if(result.data.preselectedDowntimetype == 1){
                    $scope.Downtime.Type1 = "0";
                    $scope.Downtime.Type2 = "1";
                }
            });
            $http.get("/systemdowntimes/getHostdowntimeRefillData.json", {
                params: {
                    'angular': true
                }
            }).then(function(result){
                $scope.post.Systemdowntime.from_date = result.data.from_date;
                $scope.post.Systemdowntime.from_time = result.data.from_time;
                $scope.post.Systemdowntime.to_date = result.data.to_date;
                $scope.post.Systemdowntime.to_time = result.data.to_time;
                $scope.post.Systemdowntime.comment = result.data.comment;
                $scope.post.Systemdowntime.duration = result.data.duration;
                $scope.errors = null;
            }, function errorCallback(result){
                console.error(result);
                if(result.data.hasOwnProperty('error')){
                    $scope.errors = result.data.error;
                }
            });
        };

        $scope.loadRefillData();

        $scope.saveNewHostgroupDowntime = function(){
            $scope.post.Systemdowntime.object_id = $scope.hostgroupIds;
            $scope.post.Systemdowntime.downtimetype_id = "0";
            if($scope.Downtime.Type2){
                $scope.post.Systemdowntime.downtimetype_id = "1";
            }
            if($scope.post.Systemdowntime.is_recurring){
                $scope.post.Systemdowntime.to_time = null;
                $scope.post.Systemdowntime.to_date = null;
                $scope.post.Systemdowntime.from_date = null;
            }
            $http.post("/systemdowntimes/addHostgroupdowntime.json?angular=true", $scope.post).then(
                function(result){
                    $scope.errors = null;
                    if($scope.post.Systemdowntime.is_recurring){
                        window.location.href = '/systemdowntimes';
                    }else{
                        window.location.href = '/downtimes/host';
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

        $scope.loadHostgroups = function(searchString){
            $http.get("/hostgroups/loadHostgroupsByString.json", {
                params: {
                    'angular': true,
                    'filter[Containers.name]': searchString,
                    'selected[]': $scope.hostgroupIds
                }
            }).then(function(result){
                $scope.hostgroups = result.data.hostgroups;
                $scope.errors = null;
            }, function errorCallback(result){
                console.error(result);
                if(result.data.hasOwnProperty('error')){
                    $scope.errors = result.data.error;
                }
            });
        };

        $scope.loadHostgroups('');

        $scope.$watch('Downtime.is_recurring', function(){
            if($scope.Downtime.is_recurring === true){
                $scope.post.Systemdowntime.is_recurring = 1;
                if($scope.errors && $scope.errors['from_time']){
                    delete $scope.errors['from_time'];
                }
            }
            if($scope.Downtime.is_recurring === false){
                $scope.post.Systemdowntime.is_recurring = 0;
            }
        });

    });
