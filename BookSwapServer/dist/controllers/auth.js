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
const bcrypt = require('bcrypt');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel = require('../models/users');
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userPassword } = req.body;
    /* tslint:disable-next-line */
    console.log('Received email: ' + email + ' and received pass: ' + userPassword);
    const user = yield UserModel.findOne({ email });
    if (user) {
        return res
            .status(409)
            .send({ error: '409', message: 'Could not create an user sent' });
    }
    try {
        if (userPassword === '') {
            throw new Error();
        }
        const hash = yield bcrypt.hash(userPassword, 10);
        const newUser = new UserModel(Object.assign(Object.assign({}, req.body), { password: hash }));
        const { _id } = yield newUser.save();
        const id = _id.toString();
        const accessToken = jsonwebtoken_1.default.sign({ _id }, 'v3ry!str0ngP4ss');
        res.status(201).send({ accessToken, id });
    }
    catch (error) {
        res.status(400).send({ error, message: 'Could not create user' });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* tslint:disable-next-line */
    console.log('Login!');
    const { email, userPassword } = req.body;
    try {
        const user1 = yield UserModel.findOne({ email });
        // let _id;
        // let password;
        if (user1) {
            const { _id, password } = user1;
            const validatedPass = yield bcrypt.compare(userPassword, password);
            if (!validatedPass) {
                /* tslint:disable-next-line */
                console.log('not valid password');
                throw new Error();
            }
            const id = _id.toString();
            const accessToken = jsonwebtoken_1.default.sign({ _id }, 'v3ry!str0ngP4ss');
            res.status(201).send({ accessToken, id });
        }
    }
    catch (error) {
        /* tslint:disable-next-line */
        console.log('user or pass not ok!');
        res
            .status(401)
            .send({ error: '401', message: 'Email or password is incorrect' });
    }
});
const getUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const userInfos = yield UserModel.findOne({ _id: userId });
        const username = userInfos === null || userInfos === void 0 ? void 0 : userInfos.username;
        res.status(200).send({ username });
    }
    catch (error) {
        res.status(500);
        // console.log(error);
    }
});
exports.default = { create, login, getUsername };
