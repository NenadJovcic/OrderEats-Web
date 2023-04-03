import mongoose, {Schema} from 'mongoose';

const orderSchema = new Schema ({
    order: {type: mongoose.Schema.Types.ObjectId, ref: 'orders'}
})

export default orderSchema;