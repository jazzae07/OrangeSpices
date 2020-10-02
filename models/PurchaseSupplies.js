const mongoose = require('./connection');

const purchaseSupplySchema = new mongoose.Schema({
  purchaseDate: { type: Date, required: true },
  supplyID: { type: mongoose.Schema.Types.ObjectId, ref: 'supply', required: true }, 
  purchaseQty: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  purchasePrice: { type: Number, required: true },
  totalPrice: { type: Number, required: false }
});

const Purchase = mongoose.model('purchase', purchaseSupplySchema);

// Add purchase
exports.add = function(obj, next) {
  const purchase = new Purchase(obj);
    purchase.save(function(err, purchase) {
      next(err, purchase);
    });
};

// Get all purchases
exports.getAll = (param, next) => {
  Purchase.find({}).populate('supplyID').exec((err, purchase) => next(err, purchase));
};

exports.getAllPurchase = (param, next) => {
  Purchase.aggregate(
  [
    {'$lookup': {
      'from': 'supplies',
      'localField': 'supplyID',
      'foreignField': '_id',
      'as': 'supp'
      }
    },
    { '$group': 
      {
        _id: "$supplyID",
        supplyName: { "$first": "$supp.brandName"},
        totalQuantity: 
          { '$sum': 
            '$purchaseQty'
          },
        price: { "$first": "$purchasePrice"},
        purchaseDate: { "$first": "$purchaseDate"}
      }
    },
    {
      '$project':
      {
        supplyName: 1,
        totalQuantity: 1,
        price: 1,
        totalAmount: 
        {
          '$multiply':
          [ '$price', '$totalQuantity' ]
        },
        purchaseDate: 1
      }
    }
  ]).exec((err, purchase) => next(err, purchase));
};