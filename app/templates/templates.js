'use strict';

angular.module('myApp.templates', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/templates', {
	templateUrl: 'templates/templates.html',
    controller: 'templatesCtrl'
  });
}])

.controller('templatesCtrl', ["$scope","fileReader", function($scope, fileReader) {

	// parse CSV file to a 2D array
	var parseData = function(inputContents){
		var row = inputContents.split("\n");
		$scope.rowNumber = row.length;
		var column = row[0].split(",");
		$scope.columnNumber = column.length;
		$scope.data = [];
		for(var i=0; i<$scope.rowNumber; i++){
			$scope.data[i] = row[i].split(",");
		}
		console.log("data ", $scope.data);
	}

	// get CSV file context and file name, validation for the format of the uploaded file 
	$scope.getTextFile = function () {
		console.log("$scope.file: ", $scope.file);
		if($scope.file && $scope.file.name.split(".").pop() == "csv"){		
			$scope.fileTitle = $scope.file.name;
			fileReader.readAsText($scope.file, $scope).then(function(result) {
				$scope.text = result;
				parseData(result);
			})
		}else{
			alert("Please submit a csv file");
		}
	};
}])

.directive("readText", function() {
	return {
		link: function($scope,el) {
			el.bind("change", function(e) {
				$scope.file = (e.srcElement || e.target).files[0];
				$scope.getTextFile();
			});
		}
	};
});
