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
const models_1 = __importDefault(require("../models"));
const express_1 = require("express");
const login_1 = __importDefault(require("../middleware/login"));
const router = (0, express_1.Router)();
router.get('/admin/assignment', login_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assign = yield models_1.default.ProjectAssignment.findAll();
        res.status(200).json(assign);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error" });
    }
}));
router.put('/admin/assignment/:id', login_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId, ProjectId } = req.body;
        const result = yield models_1.default.ProjectAssignment.update({ userId, ProjectId }, { where: { ProjectId: id } });
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Project Assignt not update" });
        return;
    }
}));
router.delete('/admin/assignment/:id', login_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield models_1.default.ProjectAssignment.destroy({ where: { ProjectId: id } });
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Project not deleted" });
        return;
    }
}));
exports.default = router;
