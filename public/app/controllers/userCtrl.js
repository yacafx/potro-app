angular.module('userCtrl', ['userService'])

.controller('userController', function(User) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all the users at page load
	User.all()
		.then(function(res) {

			// when all the users come back, remove the processing variable
			vm.processing = false;

			// bind the users that come back to vm.users
			vm.users = res.data;
		});

	// function to delete a user
	vm.deleteUser = function(id) {
		vm.processing = true;

		User.delete(id)
			.then(function(res) {

				// get all users to update the table
				// you can also set up your api 
				// to return the list of users with the delete call
				User.all()
					.then(function(res) {
						vm.processing = false;
						vm.users = res.data;
					});

			});
	};

})

// controller applied to user creation page
.controller('userCreateController', function(User) {
	
	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a user
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';

		// use the create function in the userService
		User.create(vm.userData)
			.then(function(res) {
				vm.processing = false;
				vm.userData = {};
				vm.message = res.data.message;
			});
			
	};	

})

// controller applied to user edit page
.controller('userEditController', function($routeParams, User) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the user data for the user you want to edit
	// $routeParams is the way we grab data from the URL
	User.get($routeParams.user_id)
		.then(function(res) {
			vm.userData = res.data;
		});

	// function to save the user
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';

		// call the userService function to update 
		User.update($routeParams.user_id, vm.userData)
			.then(function(res) {
				vm.processing = false;

				// clear the form
				vm.userData = {};

				// bind the message from our API to vm.message
				vm.message = res.data.message;
			});
	};

});