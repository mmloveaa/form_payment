'use strict';

var app = angular.module('myApp', []);


app.controller('mainCtrl' , function ($scope, $http) {

	$scope.user = {}

	$scope.reset = function(){
		$scope.user = {};
	}

	$scope.submit = function() {
		// console.log('the form is valid and will be submitted')
		// console.log('submitted')
		$http.post('/submit', $scope.newUser).then(function(response){
			console.log(response.data)
		})
	}

	$scope.validateEmail = function(email) {
		if (email === undefined) return

	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}

	$scope.validateCredit = function(value) {
		if (value === undefined) return
	  	// accept only digits, dashes or spaces
		if (/[^0-9-\s]+/.test(value)) return false;

		// The Luhn Algorithm. It's so pretty.
		var nCheck = 0, nDigit = 0, bEven = false;
		value = value.replace(/\D/g, "");

		for (var n = value.length - 1; n >= 0; n--) {
			var cDigit = value.charAt(n),
				  nDigit = parseInt(cDigit, 10);

			if (bEven) {
				if ((nDigit *= 2) > 9) nDigit -= 9;
			}

			nCheck += nDigit;
			bEven = !bEven;
		}

		return (nCheck % 10) == 0;
	}

	$scope.validatePwconf = function(pwconf) {
		if (pwconf === undefined) return 

		return pwconf === $scope.user.pw
	}

	$scope.validateCvv = function(cvv) {
		if (cvv === undefined) return

		return cvv.match(/\d(3)/)
	}

	$scope.validatePostal = function(postal) {
		if (postal === undefined) return

		return postal.match(/\d(5)/)
	}



});


app.directive('validEmail', function(){
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attr, ngModel) {
	
			ngModel.$parsers.unshift(function(value){
				var valid = scope.validateEmail(value)
				ngModel.$setValidity('validEmail', valid)
				return valid ? value : undefined;
			})
			ngModel.$formatters.unshift(function(value){
				var valid = scope.validateEmail(value)
				ngModel.$setValidity('validEmail', valid)
				return valid;
			})
		}
	}
})

app.directive('validCredit', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attr, ngModel) {

			ngModel.$parsers.unshift(function(value){
				var valid = scope.validateCredit(value)
				ngModel.$setValidity('validCredit', valid)
				return valid ? value : undefined;
			})
			ngModel.$formatters.unshift(function(value){
				var valid = scope.validateCredit(value)
				ngModel.$setValidity('validCredit', valid)
				return valid;
			})
		}
	}
})

app.directive('validPwconf', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attr, ngModel) {

			ngModel.$parsers.unshift(function(value){
				var valid = scope.validatePwconf(value)
				ngModel.$setValidity('validPwconf', valid)
				return valid ? value : undefined;
			})
			ngModel.$formatters.unshift(function(value){
				var valid = scope.validatePwconf(value)
				ngModel.$setValidity('validPwconf', valid)
				return valid;
			})
		}
	}
})

app.directive('validCvv', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attr, ngModel) {

			ngModel.$parsers.unshift(function(value){
				var valid = scope.validateCvv(value)
				ngModel.$setValidity('validCvv', valid)
				return valid ? value : undefined;
			})
			ngModel.$formatters.unshift(function(value){
				var valid = scope.validateCvv(value)
				ngModel.$setValidity('validCvv', valid)
				return valid;
			})
		}
	}
})

app.directive('validPostal', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attr, ngModel) {

			ngModel.$parsers.unshift(function(value){
				var valid = scope.validatePostal(value)
				ngModel.$setValidity('validPostal', valid)
				return valid ? value : undefined;
			})
			ngModel.$formatters.unshift(function(value){
				var valid = scope.validatePostal(value)
				ngModel.$setValidity('validPostal', valid)
				return valid;
			})
		}
	}
})