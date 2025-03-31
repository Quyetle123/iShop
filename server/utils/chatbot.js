import { GoogleGenerativeAI } from '@google/generative-ai';

import { Branch, Category, Product, Province, Store } from '../models/index.js';

// AIzaSyABRvdYEpBJh9K6zZCzsaET2vVblFosl5A
// AIzaSyCdrONVDrwk5eVvIJuAvmAaC0UjTylHQ3c

const genAI = new GoogleGenerativeAI('AIzaSyABRvdYEpBJh9K6zZCzsaET2vVblFosl5A');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

async function askQuestion(question) {
    try {
        const products = await Product.findAll();
        const productData = products.map((p) => `Tên: ${p.productname}, Giá: ${p.price} VNĐ`).join('\n');
        const categories = await Category.findAll();
        const categoryData = categories.map((c) => `Danh mục: ${c.categoryname}`).join('\n');
        const prompt = `
        Bạn là một trợ lý bán hàng chuyên nghiệp. 
        Đây là danh sách sản phẩm hiện có trong cửa hàng:
        ${productData}
        Đây là các danh mục bạn có trong cửa hàng:
        ${categoryData}

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
