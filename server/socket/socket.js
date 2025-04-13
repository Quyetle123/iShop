import Notify from '../models/Notify.js';

const userSockets = new Map();

const setupSocket = (io) => {
    io.on('connection', (socket) => {
        socket.on('login', ({ accountId }) => {
            if (!userSockets.has(accountId)) {
                userSockets.set(accountId, new Set());
            }
            userSockets.get(accountId).add(socket.id);
        });

        socket.on('logout', ({ accountId }) => {
            if (userSockets.has(accountId)) {
                userSockets.get(accountId).delete(socket.id);
                if (userSockets.get(accountId).size === 0) {
                    userSockets.delete(accountId);
                }
            }
            console.log(`User ${accountId} đăng xuất`);
        });

        socket.on('sendMessage', async ({ message, accountid }) => {
            try {
                const notify = await Notify.create({ message, accountid });

                if (userSockets.has(accountid)) {
                    userSockets.get(accountid).forEach((socketId) => {
                        io.to(socketId).emit('newMessage', notify);
                    });
                }
            } catch (error) {
                console.error('Lỗi khi tạo thông báo:', error);
            }
        });

        socket.on('disconnect', () => {
            for (const [accountId, sockets] of userSockets.entries()) {
                if (sockets.has(socket.id)) {
                    sockets.delete(socket.id);
                    if (sockets.size === 0) {
                        userSockets.delete(accountId);
                    }
                    console.log(`User ${accountId} mất kết nối với socket ${socket.id}`);
                    break;
                }
            }
        });
    });
};

export default setupSocket;
