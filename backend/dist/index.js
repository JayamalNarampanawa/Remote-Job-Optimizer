"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const jobs_1 = __importDefault(require("./routes/jobs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/jobs", jobs_1.default);
app.get("/api/health", (req, res) => {
    res.json({
        message: "Remote Job Optimizer API is running",
    });
});
const frontendDistPath = path_1.default.join(__dirname, "../../frontend/dist");
app.use(express_1.default.static(frontendDistPath));
app.use((req, res) => {
    res.sendFile(path_1.default.join(frontendDistPath, "index.html"));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
