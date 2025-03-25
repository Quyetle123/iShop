import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Account, Otp } from '../models/index.js';
import otpGenerator from 'otp-generator';

import _ from 'lodash';
import MailRegisterUser from '../utils/sendMailOtpRegister.js';

class AuthController {
    static generateToken(account) {
        return jwt.sign(
            {
                id: account.id,
                username: account.username,
                phoneNumber: account.phoneNumber,
                email: account.email,
                role: account.role,
            },
            'quyetledeptrai',
            { expiresIn: '1h' },
        );
    }

    static async register(req, res) {
        const { otp, password, ...rest } = req.body;

        const otpDB = await Otp.findOne({ where: { email: rest.email } });

        if (!otpDB) {
            return res.status(400).json({ message: 'OTP không hợp lệ' });
        }

        const otpDecode = await bcrypt.compare(otp, otpDB.otp);

        if (!otpDecode) {
            return res.status(400).json({ message: 'OTP không hợp lệ' });
        }
        await Otp.destroy({ where: { email: rest.email } });

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const account = await Account.create({
                password: hashedPassword,
                ...rest,
            });
            const token = AuthController.generateToken(account);
            res.status(201).json({
                token,
                account: {
                    id: account.id,
                    username: account.username,
                    phoneNumber: account.phoneNumber,
                    email: account.email,
                    role: account.role,
                },
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req, res) {
        const { phoneNumber, password } = req.body;
        try {
            const account = await Account.findOne({ where: { phoneNumber } });
            if (!account || !(await bcrypt.compare(password, account.password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = AuthController.generateToken(account);
            res.status(201).json({
                token,
                account: {
                    id: account.id,
                    phoneNumber: account.phoneNumber,
                    username: account.username,
                    email: account.email,
                    role: account.role,
                    city: account.city,
                    address: account.address,
                },
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async loginWithGoogle(req, res) {
        const { email } = req.body;
        try {
            const account = await Account.findOne({ where: { email } });
            const token = AuthController.generateToken(account);
            res.status(201).json({
                token,
                account: {
                    id: account.id,
                    phoneNumber: account.phoneNumber,
                    username: account.username,
                    email: account.email,
                    role: account.role,
                    city: account.city,
                    address: account.address,
                },
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAccounts(req, res) {
        try {
            const accounts = await Account.findAll();
            res.status(200).json({ accounts });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async sendMailVerifyEmail(req, res) {
        try {
            const { email } = req.body;

            const account = await Account.findOne({ where: { email } });
            if (account) {
                return res.status(400).json({ message: 'Người dùng đã tồn tại' });
            }
            const otp = await otpGenerator.generate(6, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            });

            const hashOtp = await bcrypt.hash(otp, 10);

            await Otp.create({
                email,
                otp: hashOtp,
            });
            await MailRegisterUser(email, otp);
            return res.status(200).json({ message: 'Gửi mã xác thực thành công' });
        } catch (error) {
            console.log(error);

            return res.status(400).json({ message: error.message });
        }
    }
}

export default AuthController;
