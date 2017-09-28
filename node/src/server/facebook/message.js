const fs = require('fs');
const path = require('path');

export let messagelist = {
    'attachment': {
        'type': 'template',
        'payload': {
            'template_type': 'list',
            'top_element_style': 'large',
            'elements': [
                {
                    'title': 'Classic T-Shirt Collection',
                    'subtitle': 'See all our colors',
                    'image_url': 'https://files.muzli.space/15171d60fa68877cd717869eb1865bb4.png',
                    'buttons': [
                        {
                            'title': 'View',
                            'type': 'web_url',
                            'url': 'https://peterssendreceiveapp.ngrok.io/collection',
                        }
                    ]
                },
                {
                    'title': 'Classic White T-Shirt',
                    'subtitle': 'See all our colors',
                    'default_action': {
                        'type': 'web_url',
                        'url': 'https://peterssendreceiveapp.ngrok.io/view?item=100',
                    }
                },
                {
                    'title': 'Classic Blue T-Shirt',
                    'image_url': 'https://files.muzli.space/15171d60fa68877cd717869eb1865bb4.png',
                    'subtitle': '100% Cotton, 200% Comfortable',
                    'default_action': {
                        'type': 'web_url',
                        'url': 'https://peterssendreceiveapp.ngrok.io/view?item=101',
                    },
                    'buttons': [
                        {
                            'title': 'Shop Now',
                            'type': 'web_url',
                            'url': 'https://peterssendreceiveapp.ngrok.io/shop?item=101',
                        }
                    ]
                }
            ],
            'buttons': [
                {
                    'title': 'View More',
                    'type': 'postback',
                    'payload': 'payload'
                }
            ]
        }
    }
};

export let messageButton = {
    'attachment': {
        'type': 'template',
        'payload': {
            'template_type': 'button',
            'text': 'What do you want to do next?',
            'buttons': [
                {
                    'type': 'web_url',
                    'url': 'https://www.messenger.com',
                    'title': 'Visit Messenger'
                },
                {
                    'type': 'web_url',
                    'url': 'https://www.messenger.com',
                    'title': 'Visit Technical'
                },
                {
                    'type': 'web_url',
                    'url': 'https://www.messenger.com',
                    'title': 'Visit Teko'
                },
            ]
        }
    }
};

export let general = {
    'attachment': {
        'type': 'template',
        'payload': {
            'template_type': 'generic',
            'elements': [
                {
                    'title': 'Welcome to Peter\'s Hats',
                    'image_url': 'https://files.muzli.space/15171d60fa68877cd717869eb1865bb4.png',
                    'subtitle': 'We\'ve got the right hat for everyone.',
                    'default_action': {
                        'type': 'web_url',
                        'url': 'https://peterssendreceiveapp.ngrok.io/view?item=103',
                    },
                    'buttons': [
                        {
                            'type': 'web_url',
                            'url': 'https://petersfancybrownhats.com',
                            'title': 'View Website'
                        }, {
                            'type': 'postback',
                            'title': 'Start Chatting',
                            'payload': 'DEVELOPER_DEFINED_PAYLOAD'
                        }
                    ]
                },
                {
                    'title': 'Welcome to Peter\'s Hats',
                    'image_url': 'https://files.muzli.space/15171d60fa68877cd717869eb1865bb4.png',
                    'subtitle': 'We\'ve got the right hat for everyone.',
                    'default_action': {
                        'type': 'web_url',
                        'url': 'https://peterssendreceiveapp.ngrok.io/view?item=103',
                    },
                    'buttons': [
                        {
                            'type': 'web_url',
                            'url': 'https://petersfancybrownhats.com',
                            'title': 'View Website'
                        }, {
                            'type': 'postback',
                            'title': 'Start Chatting',
                            'payload': 'DEVELOPER_DEFINED_PAYLOAD'
                        }
                    ]
                },
                {
                    'title': 'Welcome to Peter\'s Hats',
                    'image_url': 'https://files.muzli.space/15171d60fa68877cd717869eb1865bb4.png',
                    'subtitle': 'We\'ve got the right hat for everyone.',
                    'default_action': {
                        'type': 'web_url',
                        'url': 'https://peterssendreceiveapp.ngrok.io/view?item=103',
                    },
                    'buttons': [
                        {
                            'type': 'web_url',
                            'url': 'https://petersfancybrownhats.com',
                            'title': 'View Website'
                        }, {
                            'type': 'postback',
                            'title': 'Start Chatting',
                            'payload': 'DEVELOPER_DEFINED_PAYLOAD'
                        }
                    ]
                }
            ]
        }
    }
};

export let quickrep = {
    'quick_replies': [
        {
            'content_type': 'text',
            'title': 'Search',
            'payload': '<POSTBACK_PAYLOAD>',
            'image_url': 'http://example.com/img/red.png'
        },
        {
            'content_type': 'location'
        },
        {
            'content_type': 'text',
            'title': 'Something Else',
            'payload': '<POSTBACK_PAYLOAD>'
        }
    ]
};

function readSource() {
    return JSON.parse(fs.readFileSync(path.resolve('src/client/source.json'), 'utf8'));
}

export function getMessageTypeTopic() {

    const obj = {
        'text': 'Chào bạn. Tôi có thể giúp gì cho bạn?',
        'quick_replies': []
    };

    readSource().topics.map(e => {
        obj.quick_replies.push(
            {
                'content_type': 'text',
                'title': e.name,
                'payload': 'RESPONSE_SELECT_TOPIC_PAYLOAD',
            }
        );
    });

    return obj;
}

export function findTopicId(topic) {
    const result = readSource().topics.filter(e => e.name === topic);
    return result[0] ? result[0].id : null;
}

export function getTopicName(topicId) {
    return readSource().topics.filter(e => e.id === topicId)[0].name;
}