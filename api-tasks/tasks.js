var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var async = require('async');
//var db = mongojs('mongodb://127.0.0.1:27017/admin', ['info', 'posts']);
var db = mongojs('mongodb://mani:mani@ds147080.mlab.com:47080/mean2app', ['info', 'product-details']);

router.get('/user', function(req, res, next){
    db.info.find(function(err, info){
        console.log(info);
        if(err){
            res.send(err);
        }
        res.json(info);
    });
});

router.get('/user/:email', function(req, res, next){
    db.info.findOne({email: req.params.email},function(err, info){
        if(err){
            res.send(err);
        }
        
        res.json(info);
    });
});

//product details

router.get('/product/:id', function(req, res, next){
    console.log(req.params.id);
    db.product_details.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, info){
        if(err){
            res.send(err);
        }
        console.log(info)
        res.json(info);
    });
});

router.get('/products', function(req, res, next){
    db.product_details.find(function(err, info){
        if(err){
            res.send(err);
        }
        res.json(info);
    });
});

router.get('/products/:catagory', function(req, res, next){
    db.product_details.find({catagory: req.params.catagory},function(err, info){
        if(err){
            res.send(err);
        }
        
        res.json(info);
    });
});

router.get('/todayOfferProducts', function(req, res, next){
    db.product_details.find({today_offer: true},function(err, info){
        if(err){
            res.send(err);
        }
        
        res.json(info);
    });
});

router.get('/specialOfferProducts/:catagory', function(req, res, next){
    db.product_details.find({catagory: req.params.catagory, special_offer: true  },function(err, info){
        if(err){
            res.send(err);
        }
        
        res.json(info);
    });
});

//Post method
router.post('/user', function(req, res, next) {
    var info = req.body;
    console.log(info);
    if(!info.username) {
        res.status(400);
        res.json({
            "error": "Bad data / Missing data"
        })
    }
    else {
        db.info.save(info, function(err, info){
            if(err){
                res.send(err);
            }
            res.json(info);
        })
    }
});

module.exports = router;