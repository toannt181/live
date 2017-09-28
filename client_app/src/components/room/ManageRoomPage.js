import React, {PropTypes} from 'react';
import TabList from '../tab/TabList';
import MessageTabPanel from '../tabpanel/MessageTabPanel';
import RoomTabPanel from '../tabpanel/RoomTabPanel';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tabActions from '../../actions/tabActions';
import * as roomActions from '../../actions/roomActions';
import * as messageActions from '../../actions/messageActions';
import * as Helper from '../../utils/manageRoomHelper';
import * as messageTypes from '../../config/messageTypes';
import _ from 'lodash';


class ManageRoomPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            // activeTabId: 0,
            message: ""
        };

        this.changeTab = this.changeTab.bind(this);
        this.deleteTab = this.deleteTab.bind(this);
        this.adminSendRequestJoinRoom = this.adminSendRequestJoinRoom.bind(this);
        this.handleMessageInput = this.handleMessageInput.bind(this);
        this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.adminReJoinRoom = this.adminReJoinRoom.bind(this);
        this.adminSendActionRating = this.adminSendActionRating.bind(this);
        this.getMetaLink = this.getMetaLink.bind(this);
        this.handleSelectTagOfRoom = this.handleSelectTagOfRoom.bind(this);
    }

    componentDidMount() {
        if (!_.isNull(localStorage.getItem('activeTabId'))) {
            this.setState({
                activeTabId: localStorage.getItem('activeTabId')
            });
        }
    }


  /**
   * event when click to change tab
   * @param tab
   */
    changeTab(event) {
        event.preventDefault();
        // this.setState({
        //     activeTabId: event.target.value
        // });
        this.props.actions.changeTab(event.target.value);
    }

    /**
     * event when click x button tab
     * @param event
     */
    deleteTab(event) {
        event.preventDefault();
        let selectedTab = Helper.getTabById(event.target.value, this.props.tabs);
        let indexOfTab = Helper.getIndexOfTabInArray(selectedTab, this.props.tabs);
        if(this.props.activeTabId == selectedTab.id) {
            if(indexOfTab == 0) {
                this.props.actions.changeTab(0);
            } else {
                this.props.actions.changeTab(this.props.tabs[indexOfTab - 1].id);
            }
        }
        this.props.actions.deleteTab(selectedTab);
    }


    /**
     * event when click join room
     * @param event
     */
    adminSendRequestJoinRoom(event) {
        let roomId = event.target.value;
        let room = Helper.findRoomById(roomId, this.props.rooms);
        this.props.actions.adminSendRequestJoinRoom(room);
    }

    /**
     * update value of text area when enter a message
     * @param event
     */
    handleMessageInput(event) {
        let message = event.target.value;
        this.setState({
            message: message
        });
    }

    /**
     * send message
     * @param event
     */
    handleOnKeyUp(event) {
        const {activeTabId} = this.props;
        const {tabs} = this.props;

        let now = new Date();
        let currentTab = Helper.getTabById(activeTabId, tabs);
        if(event.keyCode === 13) {
            let message = {
                message: {
                    content: this.state.message,
                    type: messageTypes.DEFAULT_MESSAGE
                },
                roomType: currentTab.roomType,
                senderId: 0,
                name: "Admin",
                roomId: activeTabId,
                customerId: currentTab.customerId,
                createdAt: now.toLocaleString()
            };
            this.props.actions.adminSendMessage(message);
            this.setState({
                message: ""
            });

        }


    }

    /**
     * handle file upload
     * @param event
     */
    handleFileUpload(event) {
        const {activeTabId} = this.props;
        const data = new FormData();
        data.append('fileToUpload', event.target.files[0]);
        data.append('name', 'document file form user');
        // '/files' is your node.js route that triggers our middleware
        this.props.actions.adminUploadFile(data, activeTabId);
    }

    /**
     * get meta link of http message
     * @param message
     */
    getMetaLink(message, roomId) {
        if(message.message.content.includes('api/file')) {
            return;
        }
        if(message.message.content.includes('http://') ||
            message.message.content.includes('https://')||
            message.message.content.includes('www.')) {
            this.props.actions.getMetaLink(message, roomId);
        }
    }

    /**
     * admin send action rejoin room
     * @param event
     */
    adminReJoinRoom(event) {
        let roomId = event.target.value;
        let index = Helper.defineRoomInTabList(roomId, this.props.tabs);
        if (index == -1) {
            let room = Helper.findRoomById(roomId, this.props.rooms);
            this.props.actions.adminReJoinRoom(room);
        } else {
            this.props.actions.changeTab(index);
        }
    }

    /**
     * admin send action rating
     * @param event
     */
    adminSendActionRating(event){
        let roomId = event.target.value;
        let room = Helper.findRoomById(roomId, this.props.rooms);
        this.props.actions.adminSendActionRating(room);
    }

    /**
     * when set tag for room
     * @param event
     */
    handleSelectTagOfRoom(event) {
        let status = parseInt(event.target.value);
        console.log("type of status line 189 manageRoomPage.js", typeof status);
        const {activeTabId} = this.props;
        if (status !== 2 && activeTabId !== 0) {
            let confirm = window.confirm("Are you sure want to close this room ?");
            if (confirm) {
                this.props.actions.adminSetTagOfRoom(activeTabId, status);
            }
        }
    }

    /**
     *
     * @returns {XML}
     */
    render() {
        const {tabs} = this.props;
        const {rooms} = this.props;
        console.log("rooms", rooms);
        const {activeTabId} = this.props;
        let listOfTabs = [{id: 0, title: "Room Chat"}, ...tabs];
        let tabPanel = null;
        if (activeTabId == 0 || _.isNull(Helper.getTabById(activeTabId, tabs))) {
            tabPanel = <RoomTabPanel
                tabId={0}
                rooms={rooms}
                joinRoom={this.adminSendRequestJoinRoom}
                reJoinRoom = {this.adminReJoinRoom}
            />;
        } else {
            let currentTab = Helper.getTabById(activeTabId, tabs);
            tabPanel =
                <MessageTabPanel
                    closed={currentTab.closed}
                    tabId={currentTab.id}
                    topicName={currentTab.topic}
                    messages={currentTab.messages}
                    onChange={this.handleMessageInput}
                    messageInput={this.state.message}
                    onKeyUp={this.handleOnKeyUp}
                    fileUpload={this.handleFileUpload}
                    getMetaLink={this.getMetaLink}
                    status={currentTab.status}
                    adminSendActionRating={this.adminSendActionRating}
                    handleSelectTagOfRoom={this.handleSelectTagOfRoom}
                />;
        }

        return(
            <div>
                <TabList
                    tabs={listOfTabs}
                    activeTabId={activeTabId}
                    changeTab={this.changeTab}
                    deleteTab={this.deleteTab}
                />
                {tabPanel}
            </div>
        );
    }

}

/**
 * validation from props
 * @type {{activeTabId: *, actions: *}}
 */
ManageRoomPage.propTypes = {
    actions: PropTypes.object.isRequired,
    tabs: PropTypes.array.isRequired,
    activeTabId: PropTypes.number.isRequired
};

/**
 * map active tab from  store
 * @param state
 * @param ownProps
 * @returns {{activeTabId: ({id, title, active}|*)}}
 */
function mapStateToProps(state, ownProps) {
    return {
        tabs: state.tabs,
        rooms: state.rooms,
        activeTabId: state.activeTabId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, messageActions, roomActions, tabActions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoomPage);
