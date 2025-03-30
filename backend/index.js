//importing all dependencies using (require)
const port = 4000;
const express = require("express"); // To create the server
const app = express();
const mongoose = require("mongoose"); // To connect to the database
const jwt = require("jsonwebtoken"); // To handle authentication tokens
const multer = require("multer"); // To handle file uploads
const path = require("path");
const cors = require("cors"); // Cross-Origin Resource Sharing (CORS)
const { type } = require("os");

app.use(express.json());
app.use(cors());

// // to check the connection
// mongoose.connect("mongodb+srv://manasab:root@cluster0.ggobv.mongodb.net/");

// to check the connection
mongoose.connect("mongodb://localhost:27017/?retryWrites=true&loadBalanced=false&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000");

app.get("/", (req, res) => {
    res.send("Express app is running")
})
//see image from localhost
app.use('/images', express.static(path.join(__dirname, 'upload', 'images')));
//image storage
const storage = multer.diskStorage({
    destination: "./upload/images", // Defines the storage folder
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage })
//upload image
app.use('/image', express.static('/upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//schemas for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
    popular:{
        type: Boolean,
        default: false,
    }
})
//add products -> Admin
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1
    }
    else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

//deleting products -> Admin
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({_id: req.body.id });
    console.log("removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

//getting all products -> Admin , User
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

//popular -> Admin , User
app.get('/popular', async (req, res) => {
    let products = await Product.find({popular:true});
    let popular = products.slice(1).slice(-4);
    console.log(" popular fetched");
    res.send(popular)
})
//setpopular -> Admin
app.post('/setpopular', async (req, res) => {
    const { productId, popular } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, { popular }, { new: true });
    console.log("Popular set to", popular, "for product", productId);
    res.json({ success: true, product: updatedProduct });
});
//newcollections
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("newcollection fetched");
    res.send(newcollection);
})

//user schemas
const Users = mongoose.model("Users", {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now,
    },
}
)

//creating user registration
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({email: req.body.email});
    if (check) {
        return res.status(400).json({success: false, error:"EXISTING USER"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret');
    res.json({ success: true, token })
})

//user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, error: "WRONG PASSWORD" });
        }
    }
    else {
        res.json({ success: false, error: "DOES NOT EXIXTS" });
    }
})
//middleware to fetch user
const fetchuser = async(req,res,next)=>{
    const token=req.header('auth-token');
    if (!token) {
        res.status(401).send({errors:"please authenticate token"})
    }
    else{
        try {
            const data= jwt.verify(token,'secret');
            req.user=data.user;
            next()
        } catch (error) {
            res.status(401).send({errors:"please authenticate token"})
        }
    }
}
//cart add
app.post('/addtocart',fetchuser,async(req,res)=>{
    console.log("added",req.body,req.itemId);    let userData=await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
})
//cart remove
app.post('/removefromcart',fetchuser,async(req,res)=>{
    console.log("removed",req.body,req.itemId);
    let userData=await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -=1;
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("removed");
})
//cartdata
app.post('/getcart',fetchuser,async(req,res)=>{
    console.log("getcart");
    let userData=await Users.findOne({_id:req.user.id})
    res.json(userData.cartData);
})

//promocode schema 
const Promocode = mongoose.model("Promocode",{
    promocode:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    active:{
        type:Boolean,
        default:true
    }
})
//validate promocodes
app.post('/validatepromocode', async(req,res)=>{
    try {
        const { promocode } = req.body; 

        // Validate input
        if (!promocode) {
            return res.json({ success: false, message: "Promo code is required" });
        }

        // Find active promo code
        const code = await Promocode.findOne({ promocode, active: true });

        if (!code) {
            return res.json({ success: false, message: "Invalid or expired promo code" });
        }

        return res.json({ success: true, discount: code.discount });
    } catch (error) {
        console.error("Error validating promo code:", error);
        return res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
})


app.listen(port, (error) => {
    if (!error) {
        console.log("running on port" + port);
    }
    else {
        console.log("error" + error);
    }
})