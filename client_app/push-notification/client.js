import push from './push';

const $enableNotification = document.getElementById('enable-notification');
let activated = false;

$enableNotification.addEventListener('click', () => {
    if (!activated) {
        push.subscribe();
    } else {
        push.unsubscribe();
    }
    activated = !activated;
});

push.on(push.SUBSCRIBED, () => {
    activated = true;
    $enableNotification.checked = true;
});

push.on(push.UNSUBSCRIBED, () => {
    activated = false;
    $enableNotification.checked = false;
});

push.on(push.ERROR, (error) => {
    console.log("error", error);
    $enableNotification.checked = false;
});

push.init();
