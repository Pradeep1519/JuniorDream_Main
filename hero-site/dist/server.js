"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const courses_1 = require("./data/courses");
const app = (0, express_1.default)();
const PORT = 3000;
// Serve the compiled frontend (HTML/CSS/JS) as static assets.
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.get("/api/courses", (_req, res) => {
    res.json(courses_1.courses);
});
app.listen(PORT, () => {
    console.log(`Junior Dream hero server running at http://localhost:${PORT}`);
});
