"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
const isNumber = (str) => {
    return !isNaN(Number(str)) && !isNaN(parseFloat(str));
};
const isAlphabet = (str) => {
    return /^[a-zA-Z]+$/.test(str);
};
const isSpecialCharacter = (str) => {
    return !/^[a-zA-Z0-9]+$/.test(str);
};
const createConcatString = (alphabets) => {
    const allChars = alphabets.join("").split("").reverse();
    let result = "";
    for (let i = 0; i < allChars.length; i++) {
        if (i % 2 === 0) {
            result += allChars[i].toLowerCase();
        }
        else {
            result += allChars[i].toUpperCase();
        }
    }
    return result;
};
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: data must be an array",
            });
        }
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;
        data.forEach((item) => {
            if (isNumber(item)) {
                const num = parseInt(item);
                sum += num;
                if (num % 2 === 0) {
                    evenNumbers.push(item);
                }
                else {
                    oddNumbers.push(item);
                }
            }
            else if (isAlphabet(item)) {
                alphabets.push(item.toUpperCase());
            }
            else if (isSpecialCharacter(item)) {
                specialCharacters.push(item);
            }
        });
        const concatString = createConcatString(alphabets);
        const response = {
            is_success: true,
            user_id: "manya_sharma_13042004",
            email: "manya1901.be22@chitkara.edu.in",
            roll_number: "2210991901",
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: sum.toString(),
            concat_string: concatString,
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error",
        });
    }
});
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});
app.get("/", (req, res) => {
    res.status(200).json({
        message: "BFHL API is running",
        endpoints: {
            post: "/bfhl",
            health: "/health",
        },
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        is_success: false,
        error: "Something went wrong!",
    });
});
app.use("*", (req, res) => {
    res.status(404).json({
        is_success: false,
        error: "Endpoint not found",
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
});
exports.default = app;
//# sourceMappingURL=server.js.map