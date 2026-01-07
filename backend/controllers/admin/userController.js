const User = require("../../models/User");

//READ ALL USER
exports.getUser = async (req,res) => {
    try {
        const users = await User.find({role: "user"});
        if(!users) {
            return res.status(401).json({message: "not found user"});
        }
        res.json(users);
    }
    catch {
        res.status(500).json({message: "Server error"})
    }
}

//ENABLE OR DISABLE USER
exports.enableUser = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if(!user) {
            return res.status(401).json({message:"not found user"});
        }
        user.enable = !user.enable;

        await user.save();
        res.status(200).json({message: "User access enabled", user});
    }
    catch {
        return res.status(500).json({message: "server error"});
    }
}
