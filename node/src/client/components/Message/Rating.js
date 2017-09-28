import React from 'react';
import {connect} from 'react-redux';
import { sendRating } from '../../actions/action'

class Rating extends React.Component {

    sendRating() {
        let ratingValue = this.getRating();
        if (!ratingValue) {
            alert('Please rating');
            return;
        }
        let feedback = this.refs.feedback.value;
        let {dispatch} = this.props;
        let {socket} = this.props;

        socket.emit('client-send-rating', {
            roomId: this.props.roomId,
            rate: {ratingValue, feedback}
        });

        dispatch(sendRating({ratingValue, feedback}));
    }

    getRating() {
        let inputStar = this.refs.fieldset.getElementsByTagName('input');
        for (let e of inputStar) {
            if (e.checked) {
                return e.value
            }
        }
    }

    render() {
        return this.props.rating.ratingValue === null ? (
            <div className="rating-lio">
                <div className="content">
                    <div>Please send your rating to my service</div>
                    <div>
                        <fieldset className="rating mt-2" ref="fieldset">
                            <input type="radio" id="star5" name="rating" value="5"/>
                            <label className="full" htmlFor="star5" title="Awesome - 5 stars"/>
                            <input type="radio" id="star4" name="rating" value="4"/>
                            <label className="full" htmlFor="star4" title="Pretty good - 4 stars"/>
                            <input type="radio" id="star3" name="rating" value="3"/>
                            <label className="full" htmlFor="star3" title="Meh - 3 stars"/>
                            <input type="radio" id="star2" name="rating" value="2"/>
                            <label className="full" htmlFor="star2" title="Kinda bad - 2 stars"/>
                            <input type="radio" id="star1" name="rating" value="1"/>
                            <label className="full" htmlFor="star1" title="Sucks big time - 1 star"/>
                        </fieldset>
                    </div>
                    <div className="clearfix"></div>
                    <div className="mt-2">Feedback (optional)</div>
                    <textarea className="form-control mt-2" rows="3" ref="feedback"></textarea>
                    <button className="btn btn-outline-primary bg-white mt-2" ref="send" onClick={this.sendRating.bind(this)}>SEND
                    </button>
                </div>
            </div>
        ) : (
            <div className="rating-lio">
                <div className="content">
                    <div>You have rated us {this.props.rating.ratingValue} star</div>
                    <div>Thanks for rating!</div>
                </div>
            </div>
        );
    }
}

function mapToProps(state) {
    return {
        roomId: state.room.roomId,
        rating: state.rating,
        socket: state.socket
    }
}

export default connect(mapToProps)(Rating)