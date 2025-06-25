// const razorpay = require('../config/razorpay.config');
// const crypto = require('crypto');

// exports.createOrder= async (req, res)=>{
//     const {amount} = req.body;
//     try {
        
//         const order=  await razorpay.orders.create({
//             amount:amount*100,
//             currency:'INR',
//             receipt: `receipt_`+Date.now(), 

//         });
//         res.status(200).json(order);
//     } catch (error) {
//         res.status(500).json({message: "internal server error", error: error.message});
        
//     }
// };

// exports.verifyPayment = async (req,res )=>{
//     try {
        
//         const {razorpay_order_id, razorpay_payment_id, razorpay_signature}= req.body;

//     const body= razorpay_order_id + '|' + razorpay_payment_id;

//     const expectedSignature= crypto

//        .createHmac('sha256',  process.env.razorpay_SECRET)
//        .update(body.toString())
//        .digest('hex');     
               
//        if(expectedSignature ===  razorpay_signature){
//         res.status(200).json({message: "payment verified Successfully"});
//        }
//        else
//        {
//         res.status(400).json({message:"invalid payment signature"});
//        }
//     } catch (error) {
//         res.status(500).json({message:"internal server error", error:error.message});
        
//     }
// };

