import Order from '../models/orderSchema.js'



export const orders_get = async (req, res) => {
    try {
        const orders = await Order.find().populate("items").populate("user").exec()
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

export const orders_post = async (req, res) => {
    const { user, items } = req.body;
    try {

        const order = new Order({
            user,
            items,
        });

        const newOrder = await order.save();
        res.status(201).json({ success: true, data: newOrder });

    } catch (error) {
        console.error(error.stack);
        console.log(error.name);

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, error: 'Invalid or expired token' });
        }
        if (error.name === 'ValidationError' && error.message.includes('items')) {
            return res.status(400).json({ success: false, error: 'Invalid format for items field' });
        }

        res.status(500).json({ success: false, error: 'Server error' });
    }
};

export const orders_delete = async (req, res) => {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "Order deleted" });
};

export const orders_getByOrdersId = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate('items')
    res.status(200).json({ order });
};
export const orders_getByUserId = async (req, res) => {
    const { id } = req.params;
    const order = await Order.find({ user: id }).populate('items')
    res.status(200).json({ result: order.length, order });
};
