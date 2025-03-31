import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Input, Button, Avatar } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined, CloseOutlined, MessageOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addChatBoxStart } from '../../../redux/slices/aiSlice';

const ChatAI = () => {
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const chatRef = useRef(null);

    const { chatboxs } = useSelector((state) => state.ais);
    const chatboxList = Array.isArray(chatboxs) ? chatboxs : [];

    const handleSend = () => {
        if (!input.trim()) return;
        dispatch(addChatBoxStart({ question: input }));
        const newMessages = [...messages, { text: input, sender: 'user' }];
        setMessages(newMessages);
        setInput('');

        // Giả lập phản hồi từ AI
        setTimeout(() => {
            setMessages((prev) => [...prev, { text: 'Tôi có thể giúp gì?', sender: 'ai' }]);
        }, 1000);
    };

    useEffect(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    return createPortal(
        <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
            {/* Nút mở chat */}
            {!isOpen && (
                <Button
                    type="primary"
                    shape="circle"
                    icon={<MessageOutlined />}
                    size="large"
                    onClick={() => setIsOpen(true)}
                />
            )}

            {/* Hộp chat */}
            {isOpen && (
                <div className="w-[400px] h-[500px] bg-white shadow-lg rounded-lg overflow-hidden border flex flex-col relative">
                    {/* Header chat */}
                    <div className="p-3 bg-blue-600 text-white flex justify-between items-center">
                        <span className="font-bold">Chat AI</span>
                        <Button type="text" icon={<CloseOutlined />} onClick={() => setIsOpen(false)} />
                    </div>

                    {/* Danh sách tin nhắn */}
                    <div ref={chatRef} className="flex-1 overflow-y-auto p-4 bg-gray-100">
                        {chatboxList.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex items-center mb-3 ${
                                    msg.sender === 'user' ? 'justify-start' : 'justify-end'
                                }`}
                            >
                                {msg.sender === 'user' && <Avatar icon={<UserOutlined />} className="mr-2" />}
                                <div
                                    className={`p-2 rounded-xl text-white max-w-[70%] ${
                                        msg.sender === 'user' ? 'bg-blue-500' : 'bg-gray-500'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                                {msg.sender === 'ai' && <Avatar icon={<RobotOutlined />} className="ml-2" />}
                            </div>
                        ))}
                    </div>

                    {/* Ô nhập tin nhắn */}
                    <div className="p-3 border-t flex">
                        <Input
                            className="flex-1"
                            placeholder="Nhập tin nhắn..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onPressEnter={handleSend}
                        />
                        <Button type="primary" icon={<SendOutlined />} onClick={handleSend} className="ml-2">
                            Gửi
                        </Button>
                    </div>
                </div>
            )}
        </div>,
        document.body, // Đẩy thẳng vào body để không bị ảnh hưởng bởi layout khác
    );
};

export default ChatAI;
