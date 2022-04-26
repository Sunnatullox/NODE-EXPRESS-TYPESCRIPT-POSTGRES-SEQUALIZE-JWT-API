"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const models_1 = __importDefault(require("./models"));
const users_1 = __importDefault(require("./routes/users"));
const author_1 = __importDefault(require("./routes/author"));
const project_1 = __importDefault(require("./routes/project"));
const projectassignment_1 = __importDefault(require("./routes/projectassignment"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(users_1.default);
app.use(author_1.default);
app.use(project_1.default);
app.use(projectassignment_1.default);
const PORT = process.env.PORT || 5000;
models_1.default.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("SERVER  LISTEN PORT " + PORT);
    });
});
