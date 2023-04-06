import mongoose, {Schema} from 'mongoose';




const userSchema = new Schema({

    userName: {
        type: String,
        unique: [true, 'Username already exists'],
        required: true,
    },
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: true,
        
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isRestaurant: {
        type: Boolean,
        default: false
    }

});

const User = mongoose.model('User', userSchema);

export default User;

