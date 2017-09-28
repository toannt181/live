var express = require('express');
var router = express.Router();
/**
 * Test Sequelize
 */
// const { Topic,Room,Admin,Customer,Message } = require('../models/index');

// router.get('/room',async (req,res) => {
//     try{
//         let rooms = await Room.findAll({limit :10,include : [Admin,Topic]});
//         res.json(rooms)
//     }catch (err) {
//         console.log(err.toString())
//     }
//
//
// });
// router.get('/msg',async (req,res) => {
//     try{
//         let rooms = await Message.findAll({limit : 10,include : [Room]});
//         res.json(rooms)
//     }catch (err) {
//         console.log(err.toString())
//     }
// });
// router.get('/admin',async (req,res) => {
//     try{
//         let rooms = await Admin.findAll({limit : 10,include : [Room]});
//         res.json(rooms)
//     }catch (err) {
//         console.log(err.toString())
//     }
// });
// router.get('/msg/:name',async (req,res) => {
//     let name = req.params.name;
//     try{
//         let rooms = await Message
//             .count({
//                 where : { '$customer.name$' : {$like: `%${name}%`}},
//                 include : [{model : Customer}]
//             });
//         res.json(rooms)
//     }catch (err) {
//         console.log(err.toString())
//     }
// });


module.exports = router;
