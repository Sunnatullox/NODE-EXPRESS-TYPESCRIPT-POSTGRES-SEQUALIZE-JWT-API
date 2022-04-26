"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = __importDefault(require("../models"));
const login_1 = __importDefault(require("../middleware/login"));
const router = (0, express_1.Router)();
// admin get all user option
router.get("/admin/users", login_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAll = yield models_1.default.user.findAll({
            include: {
                model: models_1.default.Project
            }
        });
        return userAll.length > 0
            ? res.status(200).json(userAll)
            : res.status(400).json({ error: "Users not found" });
    }
    catch (error) {
        console.log(error);
    }
}));
//get all users 
router.get("/users", login_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAll = yield models_1.default.user.findAll();
        return userAll.length > 0
            ? res.status(200).json(userAll)
            : res.status(400).json({ error: "Users not found" });
    }
    catch (error) {
        console.log(error);
    }
}));
// get one user option
router.get("/admin/user/:id", login_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield models_1.default.user.findOne({
            where: {
                id
            },
        });
        user && res.status(200).json(user);
        return;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: `User not found` });
    }
}));
//created users
router.post("/admin/createUser", login_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(500).json("input data is incomplete");
        }
        yield models_1.default.user
            .create({
            name,
            email,
            password,
        })
            .then((result) => res.status(200).json(result));
    }
    catch (error) {
        console.log(error);
    }
}));
//update user 
router.put('/admin/updateUser/:id', login_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updateUser = yield models_1.default.user.update(req.body, { where: { id } });
        updateUser && res.status(200).json({ msg: 'Updadet user info' });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: `No such user was found or the data was not entered correctly` });
        return;
    }
}));
//deleted one user
router.delete("/admin/deleteUser/:id", login_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield models_1.default.user.destroy({ where: { id } });
        return deleted && res.status(200).json({ msg: 'Deleted User' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'User not deleted' });
    }
}));
exports.default = router;
