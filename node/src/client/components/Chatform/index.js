import React from 'react';
import TopicContainer from '../../container/TopicContainer';

class ChatForm extends React.Component {

    submit(e) {
        e.preventDefault();
        let infoCustomer = {};
        this.props.inputRegisters.map( item => {
            const key = Object.keys(item)[0];
            infoCustomer[key] = this.refs[key].value;
        });

        let topicId = this.props.topic.selected;
        let text = this.refs.question.value;
        let topicName = this.props.topic.topics[topicId - 1].name;
        // Send first message and init welcome message

        this.props.sendRegister({customer: infoCustomer, topicId, topicName, message: text});
    }

    render() {
        return (
            <form className="chat-form d-flex flex-column" onSubmit={this.submit.bind(this)}>
                <div className="body">
                    <div className="content">

                        {this.props.inputRegisters.map((e, i) => {
                            const key = Object.keys(e)[0];
                            return (
                                <div className="box-input" key={i}>
                                    <input className="" type="text" ref={key} placeholder={'Enter your ' + e[key]}/>
                                    <div className="box"><i className={'icon-lio-' + key}/></div>
                                </div>
                            );
                        })}

                        <TopicContainer/>

                        <div className="area-question">
                            <textarea className="" type="text" ref="question" placeholder="TYPE YOUR QUESTION."
                                      rows="2"/>
                        </div>
                    </div>

                </div>

                <button className="btn btn-danger btn-form-send" type="submit">Send</button>

            </form>
        );
    }
}

export default ChatForm;