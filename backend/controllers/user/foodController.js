const Food = require("../../models/Food");
const Rezerve = require("../../models/Rezerve");

//READ ALL
exports.getFood = async (req,res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    }
    catch {
        res.status(500).json({message: "Server error"});
    }
}

//BY‌ FOOD
exports.byFood = async (req,res) => {
    try {
        const user = await req.user.populate('rezerve');
        
        const food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({ message: "Food not found" });

        if (user.walet < food.price) return res.status(403).json({ message: "Insufficient balance" });
        if (food.amount <= 0) return res.status(400).json({ message: "No more food left" });

        food.amount -= 1;
        user.walet -= food.price;

        let existingRezerve = user.rezerve.find(r => r.name === food.name);

        if (existingRezerve) {
            existingRezerve.amount += 1;
            await existingRezerve.save();
        } else {
            const newRezerve = new Rezerve({ name: food.name, amount: 1 });
            await newRezerve.save();
            user.rezerve.push(newRezerve._id);
        }

        await food.save();
        await user.save();

        return res.status(200).json({message: "Purchase completed successfully."});

    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}