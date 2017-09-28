var io = new io('https://test.client.fbchat.teko.vn');
console.log('current admin', adminId);
io.emit('admin-join-default-room',{adminId : adminId},function (success) {
    console.log('join vao default room roi');
});

io.on('admin-count-admin-online',function (count) {
    console.log(count);
    document.getElementById('onlineAdmin').innerHTML = count;
});
