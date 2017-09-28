/**
 * get index of tab in array
 * @param tab
 * @returns {number}
 */
export function getIndexOfTabInArray(tab, tabs) {
    return tabs.indexOf(tab);
}

/**
 * get Tab by Id
 * @param value
 *
 */
export function getTabById(value, lists) {
    let tabs = lists.filter(tab => {
        return tab.id == value;
    });
    if(tabs && tabs.length > 0){
        return tabs[0];
    }
    return null;
}


export function findRoomById(roomId, rooms = []) {
    let results = rooms.filter(room => {
        return room.id == roomId;
    });
    if(results && results.length > 0){
        return results[0];
    }
}

export function getIndexOfMessageInArray(message, messages) {
    return messages.indexOf(message);
}

export function defineRoomInTabList(roomId, lists) {
    let tabs = lists.filter(tab => {
       return tab.id == roomId;
    });

    if(tabs && tabs.length > 0) {
        return tabs[0].id;
    } else return -1;
}
