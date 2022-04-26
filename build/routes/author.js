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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
router.post("/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, avatar } = req.body;
    if (!name || !email || !password) {
        res.status(422).json({ error: "All entries must be completed" });
    }
    yield models_1.default.user
        .findOne({
        where: { email },
    })
        .then((result) => {
        if (result) {
            res.status(422).json({ error: "Such an email address is registered" });
            return;
        }
        bcryptjs_1.default.hash(password, 10).then((hashedPass) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const saveUser = yield models_1.default.user.create({
                    name,
                    email,
                    password: hashedPass,
                    avatar
                });
                saveUser && res.status(200).json({ msg: "You are registered" });
                return;
            }
            catch (error) {
                console.log(error);
                res
                    .status(500)
                    .json({
                    error: "You could not register and Please try again later",
                });
                return;
            }
        }));
    });
}));
router.post('/sign-in', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Enter your email and password" });
    }
    yield models_1.default.user.findOne({ where: { email } })
        .then((userResult) => {
        if (!userResult) {
            return res.status(422).json({ error: "Your email address or password is incorrect" });
        }
        bcryptjs_1.default.compare(password, (userResult.password))
            .then((resultHash) => {
            if (resultHash) {
                // res.json({msg:"saccesfully signed in"})
                const token = jsonwebtoken_1.default.sign({ id: userResult.id }, 'SunnatulloxHayitov');
                const { name, email, id } = userResult;
                res.json({ token, user: { id, name, email } });
            }
            else {
                return res.status(422).json({ error: "Your email address or password is incorrect" });
            }
        });
    });
}));
exports.default = router;
