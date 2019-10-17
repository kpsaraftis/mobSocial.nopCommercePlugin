﻿/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var bundles = {
    essentials: [
        "./app/libraries/moment/moment.min.js",
        //angular
        "./app/libraries/angular/angular.min.js",
        "./app/libraries/angular/angular-ui-router.js",
        "./app/libraries/angular/angular-local-storage.min.js",
        "./app/libraries/angular/angular-moment.min.js",
        "./app/libraries/ocLazyLoad/ocLazyLoad.min.js",
        "./app/libraries/angular/angular-sanitize.min.js",
        "./app/libraries/angular/signalr-hub.js",
        "./app/libraries/angular/angular-slimscroll.js",
        //mentio
        "./app/libraries/mentio/mentio.min.js",
        //mobSocial app
        "./app/scripts/common/functions.js",
        "./app/scripts/app.js",
        "./app/scripts/common/router.js",
        "./app/scripts/common/authProvider.js",
        "./app/scripts/common/controllerProvider.js",
        "./app/scripts/common/requestInterceptor.js",
        "./app/scripts/common/services/webClientService.js",
        "./app/scripts/common/services/entityPropertyService.js",
        "./app/scripts/common/services/autoCompleteService.js",
        "./app/scripts/common/services/notificationService.js",
        "./app/scripts/common/services/conversationService.js",
        "./app/scripts/common/helpers/arrayHelper.js",
        //directives
        "./app/scripts/common/directives/blockUi.js",
        "./app/scripts/common/directives/iCheck.js",
        "./app/scripts/common/directives/wyswyg.js",
        "./app/scripts/common/directives/datePicker.js",
        "./app/scripts/common/directives/userProfileMini.js",
        //filters
        "./app/scripts/common/filters/ms2timestr.js",
        "./app/scripts/common/filters/unescape.js",
        //controllers
        "./app/scripts/common/controllers/navigationController.js",
        "./app/scripts/common/services/loginService.js",
        "./app/scripts/public/authentication/loginController.js",
        "./app/scripts/public/social/notificationController.js",
        //hubs
        "./app/scripts/common/hubs/notificationHub.js",
        "./app/scripts/common/hubs/conversationHub.js"
    ],
    install: [
        "./app/scripts/admin/installation/installService.js",
        "./app/scripts/admin/installation/installController.js"
    ],
    register: [
        "./app/scripts/common/services/registerService.js",
        "./app/scripts/public/authentication/registerController.js"
    ],
    fileUpload: [
        "./app/libraries/angular/angular-file-upload.min.js",
        "./app/scripts/common/directives/fileUploadButton.js"
    ],
    videogular: [
        "./app/libraries/videogular/videogular.min.js",
        "./app/libraries/videogular/vg-controls.min.js",
        "./app/libraries/videogular/vg-overlay-play.min.js",
        "./app/libraries/videogular/vg-poster.min.js",
        "./app/libraries/videogular/vg-buffering.min.js",
        "./app/libraries/videogular/vg-ima-ads.min.js",
        "./app/libraries/videogular/youtube.js",
        "./app/libraries/videogular/humanize-duration.js",
        "./app/libraries/angular/angular-timer.js"
    ],
    users: [
        "./app/scripts/common/services/userService.js",
        "./app/scripts/common/services/roleService.js",
        "./app/scripts/admin/users/userController.js",
        "./app/scripts/admin/users/userEditController.js",
        "./app/scripts/public/users/userProfileController.js"
    ],
    emailAccounts: [
        "./app/scripts/admin/emails/emailAccountService.js",
        "./app/scripts/admin/emails/emailAccountController.js",
        "./app/scripts/admin/emails/emailTemplateService.js",
        "./app/scripts/admin/emails/emailTemplateController.js"
    ],
    settings: [
        "./app/scripts/common/services/settingService.js",
        "./app/scripts/admin/settings/settingEditController.js"
    ],
    timeline: [
        "./app/scripts/common/services/timelineService.js",
        "./app/scripts/public/timeline/timelineController.js"
    ],
    social: [
        "./app/scripts/common/services/commentService.js",
        "./app/scripts/common/services/followService.js",
        "./app/scripts/common/services/likeService.js",
        "./app/scripts/common/services/friendService.js",
        "./app/scripts/common/directives/commentsBox.js",
        "./app/scripts/common/directives/followButton.js",
        "./app/scripts/common/directives/likeButton.js",
        "./app/scripts/common/directives/friendButton.js",
        "./app/scripts/public/social/followController.js",
        "./app/scripts/public/social/friendController.js"
    ],
    media: [
        "./app/scripts/common/services/mediaService.js",
        "./app/scripts/public/media/mediaController.js",
        "./app/scripts/common/directives/mediaButton.js",
        "./app/scripts/common/directives/mediaModal.js"
    ],
    education: [
        "./app/scripts/common/services/schoolService.js",
        "./app/scripts/common/services/educationService.js",
        "./app/scripts/public/education/educationController.js"
    ],
    skillPublic: [
        "./app/scripts/common/services/skillService.js",
        "./app/scripts/public/skills/skillController.js"
    ],
    skillAdmin: [
        "./app/scripts/common/services/skillService.js",
        "./app/scripts/admin/skills/skillController.js"
    ],
    applicationPublic: [
        "./app/scripts/common/services/applicationService.js",
        "./app/scripts/public/application/applicationController.js"
    ],
    customField: [
        "./app/scripts/common/customFieldProvider.js",
        "./app/scripts/common/services/customFieldService.js",
        "./app/scripts/public/customfields/customFieldEditorDirective.js",
        "./app/scripts/common/directives/customField.js",
        "./app/scripts/public/customfields/customFieldController.js"
    ]
}
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('scripts', function () {
    return gulp.src(bundles.essentials)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest("dest/b"));
});