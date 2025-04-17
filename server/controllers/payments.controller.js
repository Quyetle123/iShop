import Order from '../models/Order.js';

import crypto from 'crypto';
import axios from 'axios';

import { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } from 'vnpay';
import Branch from '../models/Branch.js';
import Store from '../models/Store.js';

class controllerPayments {
    async payments(req, res) {
        const { idOrder, typePayment } = req.body;
        if (!idOrder || !typePayment) return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });

        const findOrder = await Order.findOne({ where: { id: idOrder } });
        if (typePayment === 'cod') {
            if (findOrder) {
                await findOrder.update({ status: 'Chờ phê duyệt', payMethod: 'COD' });
                res.status(200).json({ message: 'Thanh toán thành công' });
            }
        }
        if (typePayment === 'MOMO') {
            try {
                var partnerCode = 'MOMO';
                var accessKey = 'F8BBA842ECF85';
                var secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
                var requestId = partnerCode + new Date().getTime();
                var orderId = requestId;
                var orderInfo = `thanh toan ${findOrder.id}`; // nội dung giao dịch thanh toán
                var redirectUrl = 'http://localhost:5001/api/payment/get-info-payment-momo'; // 8080
                var ipnUrl = 'http://localhost:5001/api/api/payment/get-info-payment-momo';
                var amount = findOrder.total / 1000;
                var requestType = 'captureWallet';
                var extraData = ''; //pass empty value if your merchant does not have stores

                var rawSignature =
                    'accessKey=' +
                    accessKey +
                    '&amount=' +
                    amount +
                    '&extraData=' +
                    extraData +
                    '&ipnUrl=' +
                    ipnUrl +
                    '&orderId=' +
                    orderId +
                    '&orderInfo=' +
                    orderInfo +
                    '&partnerCode=' +
                    partnerCode +
                    '&redirectUrl=' +
                    redirectUrl +
                    '&requestId=' +
                    requestId +
                    '&requestType=' +
                    requestType;
                //puts raw signature

                //signature
                var signature = crypto.createHmac('sha256', secretkey).update(rawSignature).digest('hex');

                //json object send to MoMo endpoint
                const requestBody = JSON.stringify({
                    partnerCode: partnerCode,
                    accessKey: accessKey,
                    requestId: requestId,
                    amount: amount,
                    orderId: orderId,
                    orderInfo: orderInfo,
                    redirectUrl: redirectUrl,
                    ipnUrl: ipnUrl,
                    extraData: extraData,
                    requestType: requestType,
                    signature: signature,
                    lang: 'en',
                });

                const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                return res.status(201).json(response.data.payUrl);
            } catch (error) {
                console.log(error);
            }
        }
        if (typePayment === 'VNPAY') {
            const vnpay = new VNPay({
                tmnCode: '1K3BUXJP',
                secureSecret: '9IXZOPNXXJR5OBMLMHNIXA36ZYKZZK4G',
                vnpayHost: 'https://sandbox.vnpayment.vn',
                testMode: true, // tùy chọn
                hashAlgorithm: 'SHA512', // tùy chọn
                loggerFn: ignoreLogger, // tùy chọn
            });
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const vnpayResponse = await vnpay.buildPaymentUrl({
                vnp_Amount: findOrder.total / 1000, //
                vnp_IpAddr: '127.0.0.1', //
                vnp_TxnRef: findOrder.id,
                vnp_OrderInfo: `${findOrder.id}`,
                vnp_OrderType: ProductCode.Other,
                vnp_ReturnUrl: `http://localhost:5000/api/payment/get-info-payment-vnpay`, //
                vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
                vnp_CreateDate: dateFormat(new Date()), // tùy chọn, mặc định là hiện tại
                vnp_ExpireDate: dateFormat(tomorrow), // tùy chọn
            });
            return res.status(201).json(vnpayResponse);
        }
    }

    async updateInfoPayment(req, res) {
        try {
            const { idOrder, username, phoneNumber, address, city, district, ward } = req.body;
            if (!idOrder || !username || !phoneNumber || !address || !city || !district || !ward) {
                return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
            }

            const id = idOrder;
            const order = await Order.findByPk(id);
            if (!order) {
                return res.status(400).json({ message: 'Order not found' });
            }

            const branches = await Branch.findAll();
            let selectedBranch;
            let selectedStore;

            const cityBranch = branches.find((branch) => branch.province_id === city);
            if (cityBranch) {
                const stores = await Store.findAll({ where: { branchid: cityBranch.id } });

                selectedStore = stores.find((store) => store.district === district);

                if (!selectedStore && stores.length > 0) {
                    selectedStore = stores.reduce((prev, curr) => {
                        return Math.abs(Number(curr.district) - Number(district)) <
                            Math.abs(Number(prev.district) - Number(district))
                            ? curr
                            : prev;
                    });
                }

                selectedBranch = cityBranch;
            } else {
                selectedBranch = branches.reduce((prev, curr) => {
                    return Math.abs(Number(curr.province_id) - Number(city)) <
                        Math.abs(Number(prev.province_id) - Number(city))
                        ? curr
                        : prev;
                });

                const storesInBranch = await Store.findAll({ where: { branchid: selectedBranch.id } });

                if (storesInBranch.length > 0) {
                    selectedStore = storesInBranch[Math.floor(Math.random() * storesInBranch.length)];
                }
            }

            if (!selectedBranch || !selectedStore) {
                return res.status(400).json({ message: 'No suitable store found' });
            }

            await order.update({
                address,
                ward,
                district,
                city,
                username,
                phoneNumber,
                storeid: selectedStore.id,
            });

            res.status(200).json({ order, store: selectedStore });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async checkPaymentMomo(req, res, next) {
        const { orderInfo, resultCode } = req.query;
        if (resultCode === '0') {
            const result = orderInfo.split(' ')[2];
            await Order.update({ status: 'Chờ phê duyệt', payMethod: 'MOMO' }, { where: { id: result } });
            // return res.redirect(`http://localhost:5173/checkout/${newPayment._id}`); // redirect to success page
            return res.status(200).json({ message: 'Thanh toán thanh cong' });
        }
    }

    async checkPaymentVnpay(req, res) {
        try {
            const { vnp_ResponseCode, vnp_OrderInfo } = req.query;

            if (vnp_ResponseCode === '00') {
                const idCart = vnp_OrderInfo;

                await Order.update({ status: 'Chờ phê duyệt', payMethod: 'VNPAY' }, { where: { id: idCart } });

                const order = await Order.findOne({ where: { id: idCart } });

                if (!order) {
                    return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
                }

                return res.redirect(`http://localhost:5173/pay-success?si=${order.storeid}&oi=${order.id}`);
            }

            return res.status(400).json({ message: 'Thanh toán không thành công' });
        } catch (error) {
            console.error('Lỗi kiểm tra thanh toán:', error);
            return res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }
}

export default new controllerPayments();
