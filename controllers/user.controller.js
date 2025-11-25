import User from "../models/user.model.js";


export const registerUser = async (req, res) => {
    try {
        console.log("Body received => ", req.body);

        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Fill all fields" });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Account already exists" });
        }

        await User.create({ name, email, password, role });

        return res.status(201).json({ message: "Registration successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Register failed" });
    }
};


// LOGIN
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        return res.status(200).json({
            message: "Login successful",
            role: user.role
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed" });
    }
};
