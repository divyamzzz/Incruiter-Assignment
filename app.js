require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

const SECRET_KEY = process.env.SECRET_KEY;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    username: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.send("<script>alert('Unauthorized! Please log in.'); window.location='/';</script>");
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.send("<script>alert('Session expired! Please log in again.'); window.location='/';</script>");
        }
        req.user = user;
        next();
    });
};

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    try {
        const { uname, email, gender, username, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.send("<script>alert('User already exists!'); window.location='/signup';</script>");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: uname,
            email,
            gender,
            username,
            password: hashedPassword,
        });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/dashboard");
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.send("<script>alert('No user found!'); window.location='/';</script>");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send("<script>alert('Incorrect password!'); window.location='/';</script>");
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/dashboard");
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

app.get("/dashboard", authenticateToken, async (req, res) => {
    try {
        const userDetails = await User.findById(req.user.userId);
        if (!userDetails) {
            return res.redirect("/");
        }
        res.render("dashboard", { udetails: [userDetails] });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

app.get("/reset-password", (req, res) => {
    res.render("reset-password");
});

app.post("/reset-password", async (req, res) => {
    try {
        const { username, oldpassword, newpassword, confpassword } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.send("<script>alert('No user found!'); window.location='/reset-password';</script>");
        }
        const isMatch = await bcrypt.compare(oldpassword, user.password);
        if (!isMatch) {
            return res.send("<script>alert('Old password is incorrect!'); window.location='/reset-password';</script>");
        }
        if (newpassword !== confpassword) {
            return res.send("<script>alert('New passwords do not match!'); window.location='/reset-password';</script>");
        }
        const hashedNewPassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        res.send("<script>alert('Password reset successful! Please log in.'); window.location='/';</script>");
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});