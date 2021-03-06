app.controller('headerCtrl', [ 'userService', '$window', '$rootScope', function(userService, $window, $rootScope) {
	var ctrl = this;

    ctrl.loginDto = { };
    ctrl.registerBetaDto = { };
    ctrl.action = 'login';
    ctrl.user = '';

	ctrl.searchType = 'Pokemon';
    ctrl.search = function () {
        var type = ctrl.searchType.toLowerCase();
        if (type == 'trainer')
            type = 'stats';
        else if (type != 'pokemon')
            type = '';
        //$location.path('/' + type + '/' + ctrl.searchText);
        $window.location.assign('/' + type + '/' + ctrl.searchText);
    }

    ctrl.load = function() {
        userService.getUser().then(function(response) {
            if (response !== undefined && response != null && response != '') {
                $rootScope.username = response;
            }
        });
    }

    ctrl.load();

    ctrl.switchPage = function(action) {
        ctrl.action = action;
        ctrl.error = undefined;
        ctrl.success = undefined;
        ctrl.errorArray = undefined;
    }

    ctrl.login = function() {
        userService.login(ctrl.loginDto);
    }

    ctrl.logout = function() {
        userService.logout().then(function(response) {
             if (response.status == 200) {
                $window.location.reload();
             }
             else {
                // TODO
                // Let the user know they were not successfully logged out?
             }
        });
    }
}]);

app.directive('loginModal', function() {
    return {
        restrict: 'E',
        templateUrl: "/pokemonurpg-dot-com/site-header/modals/login-modal.component.html"
    };
});

app.directive('siteDirectory', function() {
   return {
       restrict: 'E',
       templateUrl: "/pokemonurpg-dot-com/site-header/modals/site-directory.component.html"
   };
});