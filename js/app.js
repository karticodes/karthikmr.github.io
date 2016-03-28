var app = angular.module('kartiApp', ['ngRoute', "App.filters"]);
app.config(function($routeProvider){
      $routeProvider
          .when('/',{
                templateUrl: 'pages/home.html',
                controller: 'homeController'
          })
          .when('/projects',{
                templateUrl: 'pages/projects.html',
                controller: 'projectsController'
          })
          .otherwise({ redirectTo: '/' });
});

app.service('projectService', function() {
    var platform = "ios";
    
    this.setPlatform = function (x) {
        platform = x;
    };
    
    this.getPlatform = function () {
        return platform;
    };
});

app.controller('homeController', ['$scope', '$window', 'projectService', function($scope, $window, projectService) {

    $scope.DisplayProjectsForPlatform = function (ptm) {
        projectService.setPlatform(ptm);
        $window.location.href = "#/projects";
    }
    $scope.rootPageFunction = function () {
        $window.location.href = "#/";
    }
    $scope.socialLinkForPlatform = function (platform) {
        switch (platform){
            case "email":
            return "mailto:karthik.mrt@gmail.com?Subject=Hello%20Karthik";
            case "twitter":
            return "https://www.twitter.com/karthik_mrt";
            case "github":
            return "https://github.com/karticodes";
            case "linkedin":
            return "https://in.linkedin.com/in/karticodes";
            case "facebook":
            return "https://www.facebook.com/karthik.mrt";
            case "youtube":
            return "http://www.youtube.com/c/KarthikMR";
            case "blogger":
            return "http://www.mittaai.in";
            case "quora":
            return "https://www.quora.com/profile/Karthik-MR";
            default:
            return "";
        }
    }
}]);

app.controller('projectsController', ['$scope', 'projectService', '$http', '$q', '$sce', function($scope, projectService, $http, $q, $sce) {
    var platform = projectService.getPlatform();
    $scope.platform = platform;
    $scope.open_select_options = false;
    $http.get('data/projects.json').success(function(data) {
        $scope.projects = data;
    });
    $scope.TrustDangerousSnippet = function(desc) {
      return $sce.trustAsHtml(desc);
    }; 
    $scope.UpdatePlatform = function(prm) {
      $scope.platform = prm;
      $scope.ToggleSelectOptions();
    };
    $scope.ToggleSelectOptions = function() {
        $scope.open_select_options = !$scope.open_select_options;
    }
}]);

angular.module('App.filters', []).filter('platformFilter', [function () {
    return function (projects, selectedPlatform) {
        if (!angular.isUndefined(projects)){
            var tempProjects = [];
            angular.forEach(projects, function (project) {
                if (angular.equals(project.platform, selectedPlatform)) {
                    tempProjects.push(project);
                }
            });
            return tempProjects;
        } else {
            return projects;
        }
    };
}]);