import mitt from 'mitt';
import * as config from '../src/config/config';
import axios from 'axios';

const emitter = mitt();
const SUPPORTED = 'supported';
const ERROR = 'error';
const SUBSCRIBED = 'subscribed';
const UNSUBSCRIBED = 'unsubscribed';

function buildApplicationServerKey() {
    const base64 = 'BFl_S1ADvDhKnCGcvc_XP7dMO-6rM2tlBTxya09-U0C0d4bQaY8apyhUw75jOyp6tk0AoMQLrhJ9ZdZuxefbPjQ';
    const rfc4648 = base64.replace(/-/g, '+').replace(/_/g, '/');
    const characters = atob(rfc4648).split('').map(character => character.charCodeAt(0));
    return new Uint8Array(characters);
}

function sendSubscriptionToServer(subscription) {
    // This is where you'd update the subscription on the server.
    axios.post(config.SEND_SUBSCRIPTION_TO_SERVER, {"subscription": JSON.stringify(subscription)})
        .catch((error) => {
            console.error("error while posting subscription to server", error);
            unsubscribe();
        });
}

function removeSubscriptionFromServer(subscription) {
    // This is where you'd remove the subscription from the server.
    axios.post(config.REMOVE_SUBSCRIPTION_TO_SERVER, {"subscription": JSON.stringify(subscription)})
        .catch((error) => console.error("error while removing subscription to server", error));
}

const registerServiceWorker = function () {
    if ('serviceWorker' in navigator) {
        // Unless you change the URL of the service worker script,
        // `navigator.serviceWorker.register()` is effectively a no-op during subsequent visits.
        navigator.serviceWorker.register('service-worker.js')
            .then((registration) => {
                initializeState();
                console.log('ServiceWorker registration successful.', registration);
            }).catch((error) => {
                console.error('ServiceWorker registration failed.', error);
            });
    } else {
        console.log('Service workers aren’t supported in this browser.');
    }
};

const initializeState = function () {
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

    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
        serviceWorkerRegistration.pushManager.getSubscription()
            .then((subscription) => {
                emitter.emit(SUPPORTED);

                // Do we already have a push message subscription?
                if (subscription) {
                    sendSubscriptionToServer(subscription);
                    emitter.emit(SUBSCRIBED);
                    console.log("subsrcibed", JSON.stringify(subscription));
                } else console.log("chua dang ky");
            })
            .catch((error) => {
                console.error('Error during getSubscription()', error);
            });
    });
};

const subscribe = function () {
    function permissionDenied() {
        emitter.emit(ERROR, 'permission denied');
        unsubscribe();
    }

    function permissionGranted() {
        navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
            serviceWorkerRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: buildApplicationServerKey(),
            })
                    .then((subscription) => {
                        console.log("subscrbing", subscription);
                        sendSubscriptionToServer(subscription);
                        emitter.emit(SUBSCRIBED);
                    })
                    .catch((error) => {
                        console.error('Unable to subscribe to messaging server.', error);
                        emitter.emit(ERROR, 'Unable to subscribe to messaging server.');
                    });
        });
    }

    if (Notification.permission === 'denied') {
        permissionDenied();
        return;
    }

    if (Notification.permission === 'default') {
        Notification.requestPermission().then((result) => {
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

const unsubscribe = function () {
    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
        serviceWorkerRegistration.pushManager.getSubscription()
            .then((subscription) => {
                console.log("subscription", subscription);
                if (!subscription) {
                    emitter.emit(UNSUBSCRIBED);
                    return;
                }
                subscription.unsubscribe().then(() => {
                    emitter.emit(UNSUBSCRIBED);
                }).catch((error) => {
                    console.error('Unable to unsubscribe to messaging server.', error);
                    emitter.emit(ERROR,
                        'Unable to unsubscribe to messaging server.',
                    );
                });
                removeSubscriptionFromServer(subscription);
            })
            .catch((error) => {
                console.error('Error during getSubscription()', error);
            });
    });
};

export default {
    init: registerServiceWorker,
    on: emitter.on,
    SUPPORTED,
    ERROR,
    SUBSCRIBED,
    UNSUBSCRIBED,
    subscribe,
    unsubscribe,
};
