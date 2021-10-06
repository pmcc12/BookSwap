"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router = require('./router');
const dotenv = __importStar(require("dotenv"));
const filename = process.env.ENV === 'test' ? '.env.test' : '.env';

dotenv.config({ path: filename });
/* tslint:disable-next-line */
console.log(process.env.PORT);
const app = (0, express_1.default)();
const options = {
    origin: '*',
    credentials: true,
};
app
    .use((0, cors_1.default)(options))
    .use(express_1.default.json())
    .use(router)
    .listen(process.env.PORT, () => {
    /* tslint:disable-next-line */
    console.log('listening in port', process.env.PORT);
});

