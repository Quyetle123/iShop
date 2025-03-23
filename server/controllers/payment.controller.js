import crypto from "crypto";
import dotenv from "dotenv";
import axios from "axios";
import { result } from "lodash";

dotenv.config();

class PaymentController {
  static async paymentVNPay(req, res) {
    try {
      const paymentUrl =
        "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=5000000&vnp_Command=pay&vnp_CreateDate=20250323030203&vnp_CurrCode=VND&vnp_ExpireDate=20250324030203&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang+1713781023456&vnp_OrderType=billpayment&vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A5001%2Fapi%2Fcheck-payment-vnpay&vnp_TmnCode=1K3BUXJP&vnp_TxnRef=1713781023456&vnp_Version=2.1.0&vnp_SecureHash=f5303eaabed1b9d8a2072bd0544d5126e3e519cb0737d3ea882c391b0473606dc1b39860c5b71c363181305407fd62f4a7c03bb8342d1a91c3e96d52cee94d76";

      res.status(200).json({ paymentUrl });
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán VNPay:", error);
      res.status(500).json({ message: "Lỗi khi tạo thanh toán VNPay", error });
    }
  }

  static async checkPaymentVNPay(req, res) {
    try {
      const vnp_TxnRef = req.query.vnp_TxnRef || "123456789";
      const vnp_Amount = req.query.vnp_Amount || "5000000";

      return res.status(200).json({
        message: "Thanh toán thành công",
        vnp_TxnRef: vnp_TxnRef,
        amount: vnp_Amount / 100,
        transactionStatus: "success",
      });
    } catch (error) {
      console.error("Lỗi khi xác nhận thanh toán VNPay:", error);
      res.status(500).json({ message: "Lỗi xác nhận thanh toán", error });
    }
  }

  static async paymentMomo(req, res) {
    var partnerCode = "MOMO";
    var accessKey = "F8BBA842ECF85";
    var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var orderInfo = "pay with MoMo";
    var redirectUrl = "https://momo.vn/return";
    var ipnUrl = "https://callback.url/notify";
    var amount = "50000";
    var requestType = "captureWallet";
    var extraData = ""; // Nếu không có dữ liệu bổ sung, để trống.

    // Tạo chữ ký HMAC SHA256
    var rawSignature =
      `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}` +
      `&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}` +
      `&requestType=${requestType}`;

    console.log("----- RAW SIGNATURE -----");
    console.log(rawSignature);

    var signature = crypto
      .createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");

    console.log("----- SIGNATURE -----");
    console.log(signature);

    // Tạo request body
    const requestBody = {
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
      lang: "en",
    };

    try {
      const response = await axios.post(
        "https://test-payment.momo.vn/v2/gateway/api/create",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      res.status(200).json({ payUrl: response.data.payUrl });
    } catch (error) {
      console.error(
        "Lỗi khi gọi API MoMo:",
        error.response?.data || error.message
      );
      res.status(500).json({ error: "Thanh toán thất bại" });
    }
  }

  static async checkPaymentMomo(req, res) {
    const { orderInfo, orderId } = req.query;
    if (resultCode === "0") {
      return res.status(200).json({
        message: "Thanh toán từ momo thanh cong",
        orderInfo: orderInfo,
        orderId: orderId,
        transactionStatus: "success",
      });
    }
  }
}

export default PaymentController;
