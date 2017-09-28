import * as Types from '../constants/ActionTypes';

const cons = [];
//message {'other || self ',{ content , type },name, time}

export default function messages(state = cons, action) {
    switch (action.type) {
        case Types.SET_MESSAGES:
            return [...state, ...action.messages];
        case Types.ADD_MESSAGE :
            return [...state, action.message];
        case Types.DESTROY_STORE:
            return [];
        case Types.UPDATE_MESSAGE_METADATA:
            let x = state.map((e) => {
                return (e.message.content === action.metadata.content) ?
                    {
                        ...e,
                        metadata: {
                            title: action.metadata.title,
                            description: action.metadata.description,
                            image: action.metadata.image
                        }
                    }
                    : e;
            });
            return x;
        default:
            return state;
    }
}

//lio https://google.com ahah