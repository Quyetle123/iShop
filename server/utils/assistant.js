import { GoogleGenerativeAI } from '@google/generative-ai';
import { Branch, Color, Product, ProductColor, Province, Store, StoreStock } from '../models/index.js';

// AIzaSyABRvdYEpBJh9K6zZCzsaET2vVblFosl5A
// AIzaSyCdrONVDrwk5eVvIJuAvmAaC0UjTylHQ3c

const genAI = new GoogleGenerativeAI('AIzaSyCdrONVDrwk5eVvIJuAvmAaC0UjTylHQ3c');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

async function assistant() {
    try {
        const stockStore = await StoreStock.findAll({
            include: [
                {
                    model: ProductColor,
                    include: [
                        {
                            model: Product,
                        },
                        {
                            model: Color,
                        },
                    ],
                },
                {
                    model: Store,
                    include: [
                        {
                            model: Branch,
                            include: [{ model: Province }],
                        },
                    ],
                },
            ],
        });
        const stockStoreData = stockStore
            .map(
                (st) =>
                    `Tên cửa hàng: ${st.Store.storename}, Tên sản phẩm: ${st.ProductColor.Product.productname}, Màu sản phẩm: ${st.ProductColor.Color.name}, Số lượng tồn kho: ${st.quantity}, Đã bán: ${st.sold}, Thuộc chi nhánh: Tên cửa hàng: ${st.Store.Branch.Province.name}`,
            )
            .join('\n');
        const prompt = `
        Bạn là một trợ lý tư vấn nhập kho cho các cửa hàng và quản trị viên sẽ hỏi bạn để đem hàng đến các cửa hàng. 
        Đây là thông tin về các kho:
        ${stockStoreData}
        Mỗi lần sau khi thu thập xong dữ liệu về các cửa hàng, bạn sẽ tìm xem trong chi nhánh nào có cửa hàng nào cần nhập sản phẩm 
        màu sắc nào. Dựa vào số lượng nếu chưa có sản phẩm nào có số lượng dưới 10 thì không cần nhập kho. Mỗi lần trả lời bạn cẩn trả lời 
        hiên tại có cửa hàng nào cần nhập kho không liệt kê theo chi nhánh. Dự đoán 7 ngày tới(dựa vào đã bán mà tính), dự đoán 1 tháng tới.
        Câu trả lời nhớ gạch ý và xuống dòng cho dễ nhìn
    `;

        const result = await model.generateContent(prompt);
        const answer = result.response.text();
        return answer;
    } catch (error) {
        console.log(error);
    }
}

export default assistant;
