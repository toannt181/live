import React from 'react';

import emoji from 'emojis-list';

class EmojiBoard extends React.Component {

    constructor(props) {
        super(props);
        this.specialNumber = 1629;
    }

    emojiClick(code, e) {
        e.preventDefault();
        let x = $('#chat');
        x.val(x.val() + emoji[code] + ' ');
        x.focus();
    }

    render() {
        let icons = [];
        for (let i = 0; i < 61; i++) {
            icons.push(<a key={i} href="#" className="emoji-item"
                          onClick={(e) => this.emojiClick(i + 1629,e)}>{emoji[i + this.specialNumber]}</a>);
        }
        return (
            <div className="emoji-board">
                {icons}
            </div>
        );
    }
}

export default EmojiBoard;