import Subscription from '../models/Subscription';
const webpush = require('web-push');

export default async function({adminId, title, body}) {
    try {
        console.log("web push notification run", adminId);
        if (!adminId) {
            console.error('admin id is required to push notification');
        }

        let subscriptions = null;

        if (adminId === 'all') {
            subscriptions = await
            Subscription.findAll({
                attributes: ['subscription'],
           sudo });
        }
        else {
            subscriptions = await
            Subscription.findAll({
                attributes: ['subscription'],
                where: {
                    adminId: adminId
                }
            });
        }
        subscriptions = subscriptions.map(subscription => subscription.dataValues.subscription);
        console.log("pushhhhh", subscriptions);
        webpush.setVapidDetails(
            'mailto:example@yourdomain.org',
            'BFl_S1ADvDhKnCGcvc_XP7dMO-6rM2tlBTxya09-U0C0d4bQaY8apyhUw75jOyp6tk0AoMQLrhJ9ZdZuxefbPjQ',
            'Owudh9mfmFlNwgI_JRXqtjXs-qCRRYq_UL4QL3P0iNk'
        );
        subscriptions.forEach(subscription => {
            const notification = JSON.stringify({
                title: title || 'Title',
                body: body || 'body',
                url: 'https://test.fbchat.teko.vn/room',
            });

            webpush.sendNotification(JSON.parse(subscription), notification)
                .then(success => console.log("push notification success"))
                .catch(error => console.log(error));
        });
    } catch (err) {
        console.log("Error whle pushing notificaiton", err);
    }
}
