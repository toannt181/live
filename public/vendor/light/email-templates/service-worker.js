/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	self.addEventListener('push', function (event) {
	    if (event.data) {
	        var data = event.data.json();

	        var title = data.title;
	        var options = {
	            body: data.body,
	            //icon: data.icon || 'https://pbs.twimg.com/profile_images/717346718870859776/vsyH7GEi.jpg',
	            tag: data.tag || 'default',
	            data: data.url
	        };

	        event.waitUntil(self.registration.showNotification(title, options));
	    }
	});

	self.addEventListener('pushsubscriptionchange', function (event) {
	    var options = event.oldSubscription.options;
	    // Fetch options if they do not exist in the event.
	    event.waitUntil(self.registration.pushManager.subscribe(options).then(function (subscription) {// eslint-disable-line no-unused-vars
	        // Send new subscription to application server.
	    }));
	});

	self.addEventListener('notificationclick', function (event) {
	    var url = 'http://localhost:8080/';
	    if (event.notification.data) {
	        url = event.notification.data;
	    }

	    event.notification.close();

	    event.waitUntil(self.clients.matchAll({
	        type: 'window'
	    }).then(function (clientList) {
	        for (var i = 0; i < clientList.length; i += 1) {
	            var client = clientList[i];
	            var found = client.url === url || client.url === url + '/';
	            if (found && 'focus' in client) {
	                client.focus();
	                return;
	            }
	        }
	        if (self.clients.openWindow) {
	            self.clients.openWindow(url);
	        }
	    }));
	});

/***/ }
/******/ ]);