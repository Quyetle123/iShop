import { GoogleGenerativeAI } from '@google/generative-ai';

import { Category, Product } from '../models/index.js';

const genAI = new GoogleGenerativeAI('AIzaSyCdrONVDrwk5eVvIJuAvmAaC0UjTylHQ3c');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

async function askQuestion(question) {
    try {
        const products = await Product.findAll({ include: Category });
        const productData = products.map((p) => `Tên: ${p.name}, Giá: ${p.price} VNĐ`).join('\n');

        const prompt = `
        Bạn là một trợ lý bán hàng chuyên nghiệp. 
        Đây là danh sách sản phẩm hiện có trong cửa hàng:
        ${productData}

        Câu hỏi của khách hàng: "${question}"
        Hãy trả lời một cách tự nhiên và thân thiện.
    `;

        const result = await model.generateContent(prompt);
        const answer = result.response.text();
        return answer;
    } catch (error) {
        console.log(error);
    }
}

export default askQuestion;
