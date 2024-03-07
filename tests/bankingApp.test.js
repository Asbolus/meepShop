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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('Banking App Integration Tests', () => {
    it('should create accounts and perform a transfer', () => __awaiter(void 0, void 0, void 0, function* () {
        const accountAResponse = yield (0, supertest_1.default)(app_1.default)
            .post('/account')
            .send({ name: 'John Doe', balance: 1000 });
        expect(accountAResponse.statusCode).toBe(201);
        expect(accountAResponse.body.balance).toBe(1000);
        const accountBResponse = yield (0, supertest_1.default)(app_1.default)
            .post('/account')
            .send({ name: 'Jane Doe', balance: 500 });
        expect(accountBResponse.statusCode).toBe(201);
        expect(accountBResponse.body.balance).toBe(500);
        const transferResponse = yield (0, supertest_1.default)(app_1.default)
            .post('/transfer')
            .send({ fromAccountId: accountAResponse.body.id, toAccountId: accountBResponse.body.id, amount: 200 });
        expect(transferResponse.statusCode).toBe(200);
        const updatedAccountAResponse = yield (0, supertest_1.default)(app_1.default).get(`/account/${accountAResponse.body.id}`);
        const updatedAccountBResponse = yield (0, supertest_1.default)(app_1.default).get(`/account/${accountBResponse.body.id}`);
        expect(updatedAccountAResponse.body.balance).toBe(800);
        expect(updatedAccountBResponse.body.balance).toBe(700);
    }));
});
