import _ from 'lodash';

module.exports.getSocketIdByAgentId = (agentId,io) => {
    let socketIdAdmins = _.concat([],Object.keys(io.of('chat').adapter.rooms['admin'].sockets));
    return _(socketIdAdmins)
        .map(id => {
            let sk = io.nsps['/chat'].connected[id];
            return {
                id : sk.user.id,
                socketId : sk.id
            };
        })
        .groupBy('id')
        .map((item,key) => {
            let socketIds = _(item).map(i => i.socketId).union().value();
            return {
                id : key,
                socketIds,
            };
        })
        .filter(i => i.id === agentId)
        .map(i => i.socketIds)
        .value();
};
/**
 * handle customer for admin who is having the smallest count
 * @param io
 * @returns Promise(adminId)
 */

module.exports.getAgentSocket = (io) => {
    return new Promise((resolve, reject) => {
        let socketIdAdmins = _.concat([],Object.keys(io.of('chat').adapter.rooms['admin'].sockets));
        /**
         [
             { agentId: '1',
                socketIds: [ 1, 1.1, 1.2 ],
                roomCount: 4,
                roomIds: [ '1', 'admin', '1.1', '1.2' ] },
             { agentId: '3',
                socketIds: [ 3, 3.1 ],
                roomCount: 3,
                roomIds: [ '3.0', 'admin', '3.1' ] },
             { agentId: '2',
                socketIds: [ 2 ],
                roomCount: 2,
                roomIds: [ '2', 'admin' ] } ]
         */
        let ranks = _(socketIdAdmins)
            .map(id => {
                let sk = io.nsps['/chat'].connected[id];
                return {
                    id : sk.user.id,
                    socketId : sk.id,
                    roomId :  Object.keys(sk.rooms)
                };
            })
            .groupBy('id')
            .map((item,key) => {
                let roomIds = _(item).map(i => i.roomId).flattenDeep().union().value();
                let socketIds = _(item).map(i => i.socketId).union().value();
                let roomCount = roomIds.length-socketIds.length;
                return {
                    id : key,
                    socketIds,
                    roomCount,
                    roomIds
                };
            })
            .sortBy('roomCount')
            .value();

        return resolve(ranks ? ranks[0] : null);
    });
};
