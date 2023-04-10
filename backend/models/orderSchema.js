import mongoose, { Schema } from 'mongoose';

<<<<<<< HEAD
const orderSchema = new Schema ({
    order: {type: mongoose.Schema.Types.ObjectId, 
    ref: 'orders'}
})
=======
>>>>>>> menu-admin-frontend


const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);


export default Order
