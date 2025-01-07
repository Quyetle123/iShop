import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { fetchVourchersStart } from "../../../reudux/slices/vourcherSlice";
const AllVourcher = () => {
  const dispatch = useDispatch();

  const { vourchers } = useSelector((state) => state.vourchers);
  const vourcherList = Array.isArray(vourchers.vourchers)
    ? vourchers.vourchers
    : [];

  useEffect(() => {
    dispatch(fetchVourchersStart());
  }, [dispatch]);
  const dataSource = vourcherList.map((post, index) => ({
    key: post.id,
    stt: index + 1,
    image: <img src={post.image} style={{ width: "50px" }} />,
    title: post.title,
    updateAnddelete: (
      <div className="flex">
        <Link to={`/admin/update-post/${post.id}`}>
          <FaEdit className="text-[20px] cursor-pointer" />
        </Link>
        <MdDeleteOutline
          className="ml-[10px] text-[20px] cursor-pointer hover:text-red-400"
          type="primary"
          danger
        />
      </div>
    ),
  }));

  const columns = [
    {
      title: "CODE",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Bắt đầu",
      dataIndex: "valid_from",
      key: "valid_from",
    },
    {
      title: "Kết thúc",
      dataIndex: "valid_to",
      key: "valid_to",
    },
    {
      title: "Sửa, xóa",
      dataIndex: "updateAnddelete",
      key: "updateAnddelete",
    },
  ];

  return (
    <div className="p-[20px] mt-[70px]">
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default AllVourcher;
