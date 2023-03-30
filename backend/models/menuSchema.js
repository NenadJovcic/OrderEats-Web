import mongoose, {Schema} from 'mongoose';

const menuSchema = new Schema ({
    name: String,
    price: Number,
    food: {type: mongoose.Schema.Types.ObjectId, ref: 'foods'}
})

export default menuSchema;