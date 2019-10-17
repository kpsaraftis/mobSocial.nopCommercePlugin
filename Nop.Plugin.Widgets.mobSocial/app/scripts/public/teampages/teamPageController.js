﻿window.mobSocial.lazy.controller("teamPageController",
[
    "$scope", "teamPageService", "$stateParams", function ($scope, teamPageService, $stateParams) {
        var sortByDisplayOrder = function (groups) {
            groups.sort(function (a, b) { return (a.DisplayOrder > b.DisplayOrder) ? 1 : ((b.DisplayOrder > a.DisplayOrder) ? -1 : 0); });
        }
        //ctor;
        $scope.init = function () {
            var teamId = $stateParams.teamId;
            if (teamId > 0) {
                teamPageService.Get(teamId,
                   function (response) {
                       if (response.Success)
                           $scope.TeamPage = response.TeamPage;
                   },
                   function (response) {
                       alert("An error occured while retrieving team page");
                   });
            }
        }

        $scope.GetMyPages = function() {
            teamPageService.GetMyPages(function(response) {
                    if (response.Success) {
                        $scope.TeamPages = response.TeamPages;
                    } else {
                        alert($scope.Message);
                    }
                },
                function(response) {
                    alert("An error occured while retrieving team pages");
                });
        }

        $scope.DeletePage = function (id) {
            if (!confirm("Are you sure you wish to delete this page? The action can't be undone")) {
                return;
            }

            teamPageService.Delete(id,
                function (response) {
                    if (response.Success) {
                       for (var i = 0; i < $scope.TeamPages.length; i++) {
                           var teamPage = $scope.TeamPages[i];
                           if (teamPage.Id == id) {
                               $scope.TeamPages.splice(i, 1);
                           }
                       }
                    } else {
                        alert(response.Message);
                    }
                }, function () {
                    alert("An error occured while deleting page");
                });
        }

        $scope.LoadGroups = function () {
            $scope.TeamPage.Groups = [];
            $scope.ProgressGroupLoading = true;
            teamPageService.GetGroups($scope.TeamPage.Id,
                function (response) {
                    $scope.ProgressGroupLoading = false;
                    if (response.Success) {
                        $scope.TeamPage.Groups = response.TeamGroups;
                    }
                },
                function (response) {
                    alert("An error occured while retriving groups");
                    $scope.ProgressGroupLoading = false;
                });
        }

        $scope.SaveGroup = function (group) {
            if (group.Name == "") {
                alert("A group must have a name");
                return;
            }
            if (!group.Id) {
                teamPageService.InsertGroup(group,
                    function (response) {
                        if (response.Success) {
                            group.Id = response.Id;
                            group.Edit = false;
                            $scope.GroupEditorActive = false;
                            sortByDisplayOrder($scope.TeamPage.Groups);
                        } else {
                            alert(response.Message);
                        }
                    },
                    function (response) {
                        alert("An error occured while saving group");
                    });
            } else {
                teamPageService.UpdateGroup(group,
                   function (response) {
                       if (response.Success) {
                           group.Edit = false;
                           $scope.GroupEditorActive = false;
                           sortByDisplayOrder($scope.TeamPage.Groups);
                       } else {
                           alert(response.Message);
                       }
                   },
                   function () {
                       alert("An error occured while saving group");
                   });
            }
        }

        $scope.SetDefaultGroup = function (group) {
            //set all groups' default to false
            for (var i = 0; i < $scope.TeamPage.Groups.length; i++)
                $scope.TeamPage.Groups[i].IsDefault = false;

            group.IsDefault = true;
            $scope.SaveGroup(group);
        }

        $scope.membersToAdd = [];
        $scope.groupsToAdd = [];
        $scope.CustomerSelected = function (callbackObject) {
            if (callbackObject) {
                console.log($scope.membersToAdd);
                $scope.membersToAdd.push(callbackObject.originalObject);
                $scope.$broadcast('angucomplete-alt:clearInput', 'customer-autocomplete');
            }
        }



        $scope.GroupEditorActive = false;
        $scope.GroupEditor = function (id) {
            $scope.GroupEditorActive = true;
            if (id == 0) {
                $scope.TeamPage.Groups.push({
                    Name: "",
                    Description: "",
                    DisplayOrder: $scope.TeamPage.Groups.length + 1,
                    Edit: true,
                    TeamPageId: $scope.TeamPage.Id,
                    Id: 0,
                    GroupMembers: []
                });
            } else {
                for (var i = 0; i < $scope.TeamPage.Groups.length; i++) {
                    var group = $scope.TeamPage.Groups[i];
                    if (group.Id == id)
                        group.Edit = true;
                    else
                        group.Edit = false;
                }
            }

        }
        $scope.CancelEdit = function (group) {
            group.Edit = false;
            $scope.GroupEditorActive = false;
            if (group.Id == 0)
                $scope.TeamPage.Groups.pop();
        }
        $scope.AddMembersToGroups = function () {

            var _memberIds = [];
            for (var i = 0; i < $scope.membersToAdd.length; i++)
                _memberIds.push($scope.membersToAdd[i].Id);
            teamPageService.InsertGroupMembers($scope.groupsToAdd,
                _memberIds,
                $scope.TeamPage.Id,
                function (response) {
                    if (response.Success) {
                        $scope.groupsToAdd = [];
                        $scope.membersToAdd = [];
                        alert("Member(s) added to group successfully");
                        //reload groups to show updated members
                        $scope.LoadGroups();
                    }
                    else {
                        alert(response.Message);

                    }
                },
                function (response) {
                    alert("An error occured while adding member(s)");
                });
        }

        $scope.RemoveMember = function (id) {
            //remove the manager from the array
            for (var i = 0; i < $scope.membersToAdd.length; i++) {
                var mgr = $scope.membersToAdd[i];
                if (mgr.Id === id) {
                    $scope.membersToAdd.splice(i, 1);
                    break;
                }
            }
        }

        $scope.DeleteMember = function (group, member) {
            if (!confirm("Are you sure you wish to remove this member from group?")) {
                return;
            }
            teamPageService.DeleteGroupMember(group.Id,
                member.Id,
                function (response) {
                    if (response.Success) {
                        //delete member from the list
                        for (var i = 0; i < $scope.TeamPage.Groups.length; i++) {
                            var g = $scope.TeamPage.Groups[i];
                            if (g.Id == group.Id) {
                                for (var j = 0; j < group.GroupMembers.length; j++) {
                                    var m = group.GroupMembers[j];
                                    if (member.Id == m.Id) {
                                        group.GroupMembers.splice(j, 1);
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    } else {
                        alert(response.Message);
                    }
                },
                function () {
                    alert("An error occured while removing member");
                });
        }

        $scope.DeleteGroup = function (group) {
            if (group.IsDefault && group.GroupMembers.length > 0) {
                alert("This is a default group and can't be deleted. Please make another group as default and try again.");
                return;
            }
            var msg = "Are you sure you wish to delete this group?";

            if (!confirm(msg)) {
                return;
            }

            teamPageService.DeleteGroup(group.Id,
                function (response) {
                    if (response.Success) {
                        for (var i = 0; i < $scope.TeamPage.Groups.length; i++) {
                            var g = $scope.TeamPage.Groups[i];
                            if (g.Id == group.Id) {
                                $scope.TeamPage.Groups.splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        alert(response.Message);
                    }
                },
                function () {
                    alert("An error occured while deleting group");
                });
        }

        $scope.UploadCoverSuccess = function (fileItem, data, status, headers) {

            if (data.Success) {
                $scope.TeamPage.TemporaryCoverImageUrl = data.Image.ImageUrl;
                $scope.TeamPage.TemporaryCoverId = data.Image.ImageId;
                $scope.TeamPage.TemporaryCover = true;
            }
        };

        $scope.SetPictureAsCover = function (pictureId, set) {
            if (!set) {
                $scope.TeamPage.TemporaryCoverId = 0;
                $scope.TeamPage.TemporaryCover = false;
                $scope.TeamPage.TemporaryCoverImageUrl = false;
                return;
            }

            var teamId = $scope.TeamPage.Id;
            teamPageService.UpdateCover(teamId, pictureId,
                function (response) {
                    if (response.Success) {
                        $scope.TeamPage.TeamPictureUrl = $scope.TeamPage.TemporaryCoverImageUrl;
                        $scope.TeamPage.TemporaryCoverId = 0;
                        $scope.TeamPage.TemporaryCover = false;
                        $scope.TeamPage.TemporaryCoverImageUrl = false;
                    } else {
                        alert(response.Message);
                    }
                },
                function (response) {
                    alert("An error occured while performing the operation");
                });
        }

    }
]);

window.mobSocial.lazy.controller("TeamPageEditorController",
[
    "$scope", "TeamPageService", "routeProvider", function ($scope, TeamPageService, routeProvider) {

        $scope.init = function (model) {
            if (model.Id > 0) {
                TeamPageService.Get(model.Id,
                    function (response) {
                        if (response.Success)
                            $scope.TeamPage = response.TeamPage;
                        else
                            alert(response.Message);

                    },
                    function (response) {
                        alert("An error occured while retrieving team page");
                    });
            } else {
                $scope.TeamPage = {
                    Name: "",
                    Description: ""
                };
            }
        };

        $scope.$watch("createTeamPageForm.$valid", function (newVal) {
            $scope.FormValid = newVal;
        });

        $scope.processing = false;
        $scope.recordSaved = false;

        $scope.SaveTeamPage = function () {
            if ($scope.FormValid) {
                $scope.processing = true;
                var method = !$scope.TeamPage.Id || $scope.TeamPage.Id == 0 ? "Insert" : "Update";
                TeamPageService[method]($scope.TeamPage,
                    function (response) {
                        $scope.processing = false;
                        if (response.Success) {
                            $scope.recordSaved = true;
                            window.location.href = routeProvider.routeUrl("TeamPage", { teamId: response.ResponseData.TeamPage.Id });
                        } else {
                            alert(response.Message);
                        }
                    },
                    function (response) {
                        $scope.processing = true;
                        alert("An error occured while saving team page");
                    });
            }
        }
    }
]);