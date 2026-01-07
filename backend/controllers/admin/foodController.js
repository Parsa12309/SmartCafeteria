const Food = require("../../models/Food");

//CREATE
exports.createFood = async (req,res) => {
    try {
        const {name, amount, price} = req.body;
        
        if(!name || !amount || !price) {
            return res.status(401).json({message: "Fill in all fields."});
        }

        let resFood;

        const chekFood = await Food.findOne({name});
        if(chekFood) {
            chekFood.amount = Number(chekFood.amount) + Number (amount);
            chekFood.price = price;

            await chekFood.save();
            resFood = chekFood;
        }
        else {
            const food = new Food(req.body);
            await food.save();
            resFood = food;
        }
        res.status(200).json({message: "Food added successfully.", resFood});
    }
    catch {
        res.status(500).json({message:"Server error"})
    }
}

//UPDATE
exports.updateFood = async (req,res) => {
    try { 
        const {name, amount, price} = req.body;
        const food = await Food.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!name, !amount, !price) {
            return res.status(404).json({message: "Fill in all fields."});
        }
        if(!food) {
            return res.status(404).json({message: "Food not found"});
        }
        res.status(200).json({message: "Food was successfully updated.",food});
    }
    catch {
        res.status(500).json({message: "Server error"});
    }
}

//DELETE
exports.deleteFood = async (req,res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if(!food) {
            return res.status(404).json({message:"food not found"});
        }
        res.status(200).json({message: "Food was successfully removed."});
    }
    catch {
        res.status(500).json({message: "Server error"});
    }
}

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