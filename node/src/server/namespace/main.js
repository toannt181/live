module.exports = (io, testIo) => {
    io.on('connection', (socket) => {
        console.log(`có người ${socket.id} kết nối nè`);
        socket.join('android');


        // socket.leave(socket.id)
        // //all rooms have socket.id
        // console.log(io.adapter.rooms);

        // deleteRoom
        // clearRoom(io,'android','/');

        //getSocket from id
        // console.log(io.connected[socket.id]);

        //getRoom from idRoom
        // let roomObj = io.nsps[namespace].adapter.rooms[room]; OR
        // console.log(io.adapter.rooms['android']);

        //getAllSocketId by idRoom
        // io.in('android').clients((err,clis)) => {
        //   console.log(clis);
        // }
        // OR
        // console.log("sockets trong room android");
        // Object.keys(io.adapter.rooms['android'].sockets).map( id => {
        //   console.log(id);
        // })

        //getAllRoomByIdSocket
        // let rooms = Object.keys(io.adapter.rooms).filter(room => {
        //   for (id of Object.keys(io.adapter.rooms[room].sockets)) {
        //     if (id === socket.id) {
        //       return true
        //     }
        //   }
        // })
        //console.log(`${socket.id} thuoc room ${rooms}`);


        let namespace = socket.id.split('#').length > 1 ? socket.id.split('#')[0] : socket.id;
        console.log(namespace);

        /**
         * Muốn gửi msg cho 1 room khác namespace thì chỉ cần socketID hoặc room
         * TH1 : chỉ có socketID
         * quá easy vì trên socket đã có namespace
         * /test#-o_9nB03wOQkmW9VAAAA
         *  let namespace = socket.id.split('#').length > 1 ? socket.id.split('#') : socket.id;
         *
         *  :TH2: trường hợp gửi đến 1 room
         *
         * **** io là biến default chứ ko phải là biến io.of('namespace')
         * sau đó get được namespace chứa room đó (hoạc namespace đã biết trước thì càng tốt)
         * sau đo gửi tất cả mọi người trong room : io.of('namespace').in(room).emit();
         * hoặc socket nào đó: io.of('namespace').connected[socket.id].emit()
         * hoặc broadcast: io.of('namespace').connected[socket.id].broadcast.emit()
         */

        //gui den 1 socket cu the
        //io.nsps['namespace'].to(userid).emit("private", {message: "Hey user whats up?"});


        socket.on('client-send-authenticate', (data) => {
            console.log(JSON.stringify(data));
            socket['user'] = data;
            socket.emit('server-send-authenticate',
                {message: 'authenticate success', success: true});
        });

        socket.on('unauthorization', () => {
            console.log('unauthorization');
        });

        socket.on('client-send-message', (data) => {
            console.log(JSON.stringify(data));
            const user = socket.user;
            socket.emit('server-send-message', {data, user});
        });

        socket.on('disconnect', () => {
            console.log(`có người ${socket.id} thoát kết nối nè`);
        });
    });
};


//clearRoom by idRoom
function clearRoom(io, room, namespace = '/') {
    // let roomObj = io.nsps[namespace].adapter.rooms[room];
    let roomObj = io.adapter.rooms[room];
    if (roomObj) {
        // now kick everyone out of this room
        Object.keys(roomObj.sockets).forEach(function (id) {
            io.connected[id].leave(room);
        });
    }

    // or
    // io.in('android').clients((err,clis)=>{
    //   //leave all client in a room
    //   clis.map((cli) => {
    //     let socket = io.connected[cli];
    //     socket.leave('android');
    //   })
    //   console.log(io.adapter.rooms);
    // });
}
