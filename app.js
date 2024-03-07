"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const accountController_1 = require("./controllers/accountController");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const accountController = new accountController_1.AccountController();
app.post('/account', (req, res) => accountController.createAccount(req, res));
app.post('/deposit', (req, res) => accountController.deposit(req, res));
app.post('/withdraw', (req, res) => accountController.withdraw(req, res));
app.post('/transfer', (req, res) => accountController.transfer(req, res));
app.get('/account/:accountId', (req, res) => accountController.findAccountById(req, res));
app.get('/logs', (req, res) => accountController.getTransactionLogs(req, res));
exports.default = app;
