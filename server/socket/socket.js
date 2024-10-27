import Notify from "../models/Notify.js";

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Người dùng kết nối: ", socket.id);

    socket.on("sendMessage", async ({ message, accountid }) => {
      try {
        const notify = await Notify.create({ message, accountid });
        console.log(notify);

        io.emit("newMessage", notify);
      } catch (error) {
        console.error("Lỗi khi tạo thông báo: ", error);
      }
    });
  });
};

export default setupSocket;
