﻿window.mobSocial.lazy.controller("applicationController",
    [
        "$scope", "applicationService", '$state', function ($scope, applicationService, $state) {
            $scope.availableApplicationTypes = [
                {
                    Id: "1",
                    Text : "Native/Web"
                },
                {
                    Id: "2",
                    Text: "Javascript"
                }
            ];

            $scope.getApplications = function() {
                applicationService.get(function(res) {
                    if (res.Success) {
                        $scope.applications = res.ResponseData.Applications;
                    }
                });
            }

            $scope.getApplication = function () {
                $scope.application = { Id : 0};
                var id = $state.params.id;
                if (!id || id == 0) {
                    return;
                }
                applicationService.getById(id,
                    function(res) {
                        if (res.Success) {
                            $scope.application = res.ResponseData.Application;
                        }
                    });
            }

            $scope.save = function() {
                if ($scope.application == null)
                    return;

                applicationService.post($scope.application,
                    function(res) {
                        if (res.Success) {
                            $scope.application = res.ResponseData.Application;
                        }
                    });
            }

            $scope.regenerateSecret = function() {
                if ($scope.application == null || $scope.application.Id == 0)
                    return;
                applicationService.regenerateSecret($scope.application.Id,
                    function (res) {
                        if (res.Success) {
                            $scope.application = res.ResponseData.Application;
                        }
                    });
            }

            $scope.delete = function () {
                if ($scope.application == null)
                    return;
                if (!confirm("Are you sure you wish to delete this application?"))
                    return;
                applicationService.delete($scope.application.Id,
                    function (res) {
                        if (res.Success) {
                            $state.go("layoutApplication.twoColumns.listApplications");
                        }
                    });
            }

            $scope.getLogins = function() {
                applicationService.getLogins(function(res) {
                    if (res.Success) {
                        $scope.logins = res.ResponseData.Logins;
                    }
                });
            }

            $scope.removeLogin = function (id) {
                if (!confirm("Are you sure you wish to revoke access for this application?"))
                    return;
                applicationService.removeLogin(id, function (res) {
                    if (res.Success) {
                        for (var i = 0; i < $scope.logins.length; i++) {
                            if ($scope.logins[i].Id == id) {
                                $scope.logins.splice(i, 1);
                                break;
                            }
                        }
                    }
                });
            }
        }     
    ]);