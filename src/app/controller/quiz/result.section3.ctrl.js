angular.module('app').controller('ResultSection3Ctrl', function($scope, $state, $filter, StudentDataSvc, LocationIndicatorSvc) {

    var activate = function() {
        $scope.studentData = StudentDataSvc.getStudentData();
        $scope.comparisonType = 'youngProportion';
        $scope.currentDepartment = {};
        LocationIndicatorSvc.getNeighbourhoodList().then(function(data) {
        	$scope.departmentList = data;
        });
		$scope.percent = 0;
        $scope.pieChartOptions = {
       		animate:{
                duration:0,
                enabled:false
            },
            barColor: function(percent) {
                var ctx = this.renderer.getCtx();
                var canvas = this.renderer.getCanvas();
                var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
                    gradient.addColorStop(0, "#45E3C1");
                    gradient.addColorStop(1, "#00CAF6");
                return gradient;
              },
            scaleColor:false,
            lineWidth:6,
            lineCap:'round',
            size: 70,
            trackColor: "#EEEEEE"
        };

        //$scope.$watch($scope.comparisonType, comparisonTypeChanged);
    };

  	var updateNormalizedValue = function() {
  		if($scope.currentDepartment) {
	      	if($scope.comparisonType == 'avgPersonsPerHouse') {
	          	$scope.currentValue = Math.round($scope.currentDepartment[$scope.comparisonType]);
	        } else {
	        	$scope.currentValue = Math.round($scope.currentDepartment[$scope.comparisonType] * 100);
	        	$scope.percent = $scope.currentValue;
	        }
        }
  	};

    $scope.showDepartmentTooltip = function(event) {

    	$scope.$apply(function(){
    		var departmentId = parseInt(event.currentTarget.id);
	        var department = $filter('filter')($scope.departmentList, {id: departmentId})[0];
	        $scope.currentDepartment = department;

            var selectedDepartment = event.currentTarget;
            selectedDepartment.classList.toggle("active");
            
	        var description = document.getElementById("descriptionDiv");
	        var mapWrapper = document.getElementById("comparisonMap");
	        description.className = "description active";
		     //Position Tooltip were mouse clicked
	        description.style.left = event.clientX + mapWrapper.offsetLeft + "px";
	        //the 100 is used because of the tooltip height
	      	description.style.top =  event.clientY + mapWrapper.offsetTop - 118 + "px";
	      	updateNormalizedValue();
    	});
    };

    activate();

});