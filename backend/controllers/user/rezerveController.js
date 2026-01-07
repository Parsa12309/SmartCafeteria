const Rezerve = require("../../models/Rezerve");
const Food = require("../../models/Food");
exports.getRezerve = async (req,res) => {
    try {
        const user = await req.user.populate("rezerve");
        res.json(user);
    }
    catch {
        res.status(500).json({message: "Server error"});
    }
}

exports.decrease = async (req,res) => {
    try {
        const user = await req.user.populate('rezerve');

        let rezerve = user.rezerve.find(r => r._id.toString() === req.params.id);
        if (!rezerve) return res.status(404).json({ message: "Food not found in your rezerve" });

        const food = await Food.findOne({name: rezerve.name});
        if (!food) return res.status(404).json({ message: "Food not found in inventory" });

        rezerve.amount -= 1;
        if (rezerve.amount <= 0) {
            await Rezerve.findByIdAndDelete(rezerve._id);
        } 
        else {
            await Rezerve.findByIdAndUpdate(rezerve._id, { amount: rezerve.amount });
        }

        food.amount += 1;
        await food.save();
        await user.save();

        res.status(200).json({ message: "The food was returned successfully." });
    }
    catch (err){
        console.log(err);
        res.status(500).json({message: "Server error"});
    }
}