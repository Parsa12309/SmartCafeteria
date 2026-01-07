const User = require("../../models/User");

//READ PROFILE
exports.getProfile = async (req,res) => {
    try {
        const user = req.user;
        res.json({
            username: user.username,
            email: user.email,
            walet: user.walet
        });
    } 
    catch {
        res.status(500).json({ message: "Server error" });
    }
}

//INCREASE THE WALET
exports.increaseTheWalet = async (req, res) => {
    try {
        const user = req.user;
        const { walet } = req.body;

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        const amount = Number(walet);

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }

        user.walet += amount;
        await user.save();

        return res.status(200).json({
            message: "Wallet increase successful.",
            walet: user.walet
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
