const express = require('express');

const router = express.Router();
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");

const signupBody = zod.object({
    username: zod.string().email().required(),
	firstName: zod.string().required(),
	lastName: zod.string().required(),
	password: zod.string().required()
})

router.post("/signup", async (req, res) => {
    // const { success, message } = signupBody.safeParse(req.body)
    const validationResponse = signupBody.safeParse(req.body)
    // console.log(success, "zod");
    // console.log(message, "msg");
    if (!validationResponse.success) {
        return res.status(400).json({
            message: `Error while signing up: ${validationResponse.error.errors[0].message}`
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    // if (existingUser) {
    //     return res.status(411).json({
    //         message: "Email already taken/Incorrect inputs"
    //     })
    // }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    // const token = jwt.sign({
    //     userId
    // }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: "sapna2343"
    })
})


const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

// const updateBody = zod.object({
// 	password: zod.string().optional(),
//     firstName: zod.string().optional(),
//     lastName: zod.string().optional(),
// })

// router.put("/", authMiddleware, async (req, res) => {
//     const { success } = updateBody.safeParse(req.body)
//     if (!success) {
//         res.status(411).json({
//             message: "Error while updating information"
//         })
//     }

//     await User.updateOne(req.body, {
//         id: req.userId
//     })

//     res.json({
//         message: "Updated successfully"
//     })
// })



module.exports = router;