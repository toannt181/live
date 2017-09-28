export default state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('CHAT_BOX', serializedState);
    } catch (err) {
        console.log("Error while saving state to local storage");
    }
};
