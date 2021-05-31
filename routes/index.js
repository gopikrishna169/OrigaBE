var express = require('express');
var router = express.Router();
var User = require('../model/user.model')
var Order = require('../model/order.model')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/userwise', async (req, res) => {
  try {
    const users = await User.find();
    const val = await Order.aggregate(
      [
        {
          $group:
          {
            _id: "$userId",
            noOfOrders: { "$sum": 1 },
            averageBillValue: { $avg: "$subtotal" },
          }
        },
        { $sort: { "_id": 1 } }
      ]
    )
    res.json(val)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

router.get('/updateNoOfOrder', async (req, res) => {
  try {
    const users = await User.find();
    const val = await Order.aggregate(
      [
        {
          $group:
          {
            _id: "$userId",
            noOfOrders: { "$sum": 1 },
          }
        },
        { $sort: { "_id": 1 } }
      ]
    )
    
    val.forEach((t) => {
      User.updateOne({ "userId": t._id },
      {$set: { noOfOrder: t.noOfOrders }}, function (err, docs) {
        if (err) {
          console.log(err)
        }
        else {
          console.log("Updated Docs : ", docs);
        }
      });
    });

    res.status(200).json({ success: true, message: "Successfully updated" });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

module.exports = router;
