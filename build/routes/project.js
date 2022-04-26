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
router.get("/projects", login_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield models_1.default.Project.findAll();
        project.length > 0
            ? res.status(200).json(project)
            : res.status(422).json({ msg: "Projects not found" });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Project not found" });
        return;
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield models_1.default.Project.findAll();
        project.length > 0
            ? res.status(200).json(project)
            : res.status(422).json({ msg: "Projects not found" });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Project not found" });
        return;
    }
}));
router.get("/project/:id", login_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const project = yield models_1.default.Project.findOne({ where: { id } });
        if (project) {
            res.status(200).json(project);
            return;
        }
        else {
            res.status(404).json({ msg: "not found project" });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(422).json({ error: "Project not found" });
        return;
    }
}));
router.post("/project", login_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, status, url, userId } = req.body;
    try {
        if (!userId) {
            res
                .status(400)
                .json({
                error: "userId ni ham body da qo'shib yuboring! userId topilmadi",
            });
            return;
        }
        if (!title || !status) {
            res.status(422).json({ error: "Please fill in all of the inputs" });
            return;
        }
        yield models_1.default.Project.create({ title: title, status: status, url: url })
            .then((result) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const Assignment = yield models_1.default.ProjectAssignment.create({
                    ProjectId: result.id,
                    userId: userId || id,
                });
                return res.status(200).json({ Assignment, result });
            }
            catch (error) {
                console.log(error);
                res
                    .status(500)
                    .json({
                    error: "The project assignment is not written, please note that it is being sent to the userId backend",
                });
                return;
            }
        }))
            .catch((err) => {
            console.log(err);
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "Project has not changed" });
        return;
    }
}));
router.put("/project/:id", login_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, status } = req.body;
    try {
        if (!title || !status) {
            res.status(422).json({ error: "Please fill in all of the inputs" });
            return;
        }
        const upProject = yield models_1.default.Project.update(req.body, { where: { id } });
        return res.status(200).json(upProject);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "Project has not changed" });
        return;
    }
}));
router.delete("/project/:id", login_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const delProject = yield models_1.default.Project.destroy({ where: { id } });
        return res.status(200).json(delProject);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Project not deleted" });
    }
}));
exports.default = router;
