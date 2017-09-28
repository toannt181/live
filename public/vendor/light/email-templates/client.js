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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _push = __webpack_require__(1);

	var _push2 = _interopRequireDefault(_push);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $button = document.querySelector('.js-button');
	var activated = false;

	$button.addEventListener('click', function () {
	    if (!activated) {
	        $button.disabled = true;
	        _push2.default.subscribe();
	        $button.innerHTML = 'Disable Push Notifications';
	    } else {
	        $button.disabled = true;
	        _push2.default.unsubscribe();
	        $button.innerHTML = 'Enable Push Notifications';
	    }
	    activated = !activated;
	});

	_push2.default.on(_push2.default.SUBSCRIBED, function () {
	    activated = true;
	});
	_push2.default.on(_push2.default.UNSUBSCRIBED, function () {
	    activated = false;
	});

	_push2.default.on('*', function () {
	    // $button.disabled = false;
	});

	_push2.default.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mitt = __webpack_require__(2);

	var _mitt2 = _interopRequireDefault(_mitt);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var emitter = (0, _mitt2.default)();
	var SUPPORTED = 'supported';
	var ERROR = 'error';
	var SUBSCRIBED = 'subscribed';
	var UNSUBSCRIBED = 'unsubscribed';

	function buildApplicationServerKey() {
	    var base64 = 'BFl_S1ADvDhKnCGcvc_XP7dMO-6rM2tlBTxya09-U0C0d4bQaY8apyhUw75jOyp6tk0AoMQLrhJ9ZdZuxefbPjQ';
	    var rfc4648 = base64.replace(/-/g, '+').replace(/_/g, '/');
	    var characters = atob(rfc4648).split('').map(function (character) {
	        return character.charCodeAt(0);
	    });
	    return new Uint8Array(characters);
	}

	function sendSubscriptionToServer(subscription) {
	    // This is where you'd update the subscription on the server.
	    document.querySelector('.js-subscription').innerHTML = JSON.stringify(subscription.toJSON());
	}

	function removeSubscriptionFromServer(subscription) {
	    // This is where you'd remove the subscription from the server.
	}

	var registerServiceWorker = function registerServiceWorker() {
	    if ('serviceWorker' in navigator) {
	        // Unless you change the URL of the service worker script,
	        // `navigator.serviceWorker.register()` is effectively a no-op during subsequent visits.
	        navigator.serviceWorker.register('service-worker.js').then(function (registration) {
	            initializeState();
	            console.log('ServiceWorker registration successful.', registration);
	        }).catch(function (error) {
	            console.error('ServiceWorker registration failed.', error);
	        });
	    } else {
	        console.log('Service workers aren’t supported in this browser.');
	    }
	};

	var initializeState = function initializeState() {
	    // Are Notifications supported in the service worker?
	    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
	        console.error('Notifications aren’t supported.');
	        return;
	    }

	    // If the current notification permission is denied,
	    // it's a permanent block until the user changes the permission
	    if (Notification.permission === 'denied') {
	        console.error('The user has blocked notifications.');
	        return;
	    }

	    // Check if push messaging is supported
	    if (!('PushManager' in window)) {
	        console.error('Push messaging isn’t supported.');
	        return;
	    }

	    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
	        serviceWorkerRegistration.pushManager.getSubscription().then(function (subscription) {
	            emitter.emit(SUPPORTED);

	            // Do we already have a push message subscription?
	            if (subscription) {
	                console.log("da dang ky");
	                sendSubscriptionToServer(subscription);
	                emitter.emit(SUBSCRIBED);
	            } else console.log("chua dang ky");
	        }).catch(function (error) {
	            console.error('Error during getSubscription()', error);
	        });
	    });
	};

	var subscribe = function subscribe() {
	    function permissionDenied() {
	        emitter.emit(ERROR, 'Um Push-Benachrichtigungen zu erhalten, ' + 'müssen Sie Benachrichtigungen für diese Website in Ihrem Browser erlauben.');
	        unsubscribe();
	    }
	    function permissionGranted() {
	        navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
	            serviceWorkerRegistration.pushManager.subscribe({
	                userVisibleOnly: true,
	                applicationServerKey: buildApplicationServerKey()
	            }).then(function (subscription) {
	                sendSubscriptionToServer(subscription);
	                emitter.emit(SUBSCRIBED);
	            }).catch(function (error) {
	                console.error('Unable to subscribe to messaging server.', error);
	                emitter.emit(ERROR, 'Bei der Anmeldung am externen Benachrichtigungsdienst ist ein Fehler aufgetreten. ' + 'Bitte versuchen Sie es in ein paar Minuten wieder oder wenden sich an Ihren Ansprechpartner.');
	            });
	        });
	    }
	    if (Notification.permission === 'denied') {
	        permissionDenied();
	        return;
	    }
	    if (Notification.permission === 'default') {
	        Notification.requestPermission().then(function (result) {
	            if (result !== 'granted') {
	                permissionDenied();
	                return;
	            }
	            permissionGranted();
	        });
	        return;
	    }
	    permissionGranted();
	};

	var unsubscribe = function unsubscribe() {
	    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
	        serviceWorkerRegistration.pushManager.getSubscription().then(function (subscription) {
	            if (!subscription) {
	                emitter.emit(UNSUBSCRIBED);
	                return;
	            }
	            subscription.unsubscribe().then(function () {
	                emitter.emit(UNSUBSCRIBED);
	            }).catch(function (error) {
	                console.error('Unable to unsubscribe to messaging server.', error);
	                emitter.emit(ERROR, 'Bei der Abmeldung am externen Benachrichtigungsdienst ist ein Fehler aufgetreten. ' + 'Sie werden von uns dennoch keine Push-Benachrichtigungen mehr erhalten.');
	            });
	            removeSubscriptionFromServer();
	        }).catch(function (error) {
	            console.error('Error during getSubscription()', error);
	        });
	    });
	};

	exports.default = {
	    init: registerServiceWorker,
	    on: emitter.on,
	    SUPPORTED: SUPPORTED,
	    ERROR: ERROR,
	    SUBSCRIBED: SUBSCRIBED,
	    UNSUBSCRIBED: UNSUBSCRIBED,
	    subscribe: subscribe,
	    unsubscribe: unsubscribe
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	function n(n){return n=n||Object.create(null),{on:function(t,o){(n[t]||(n[t]=[])).push(o)},off:function(t,o){n[t]&&n[t].splice(n[t].indexOf(o)>>>0,1)},emit:function(t,o){(n[t]||[]).map(function(n){n(o)}),(n["*"]||[]).map(function(n){n(t,o)})}}}module.exports=n;
	//# sourceMappingURL=mitt.js.map

/***/ }
/******/ ]);