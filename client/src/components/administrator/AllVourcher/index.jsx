import { Switch, Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import dayjs from "dayjs";
import { MdDeleteOutline } from "react-icons/md";
import { deleteVourcherStart, fetchVourchersStart } from "../../../redux/slices/vourcherSlice";
const AllVourcher = () => {
  const dispatch = useDispatch();

  const { vourchers } = useSelector((state) => state.vourchers);
  const vourcherList = Array.isArray(vourchers.vourchers)
    ? vourchers.vourchers
    : [];

  useEffect(() => {
    dispatch(fetchVourchersStart());
  }, [dispatch]);
  const dataSource = vourcherList.map((voucher) => ({
    key: voucher.id,
    code: voucher.code,
    status: <Switch checked={voucher.status} />,
    image: <img src={voucher.image} style={{ width: "50px" }} />,
    description: voucher.description,
    valid_from: dayjs(voucher.valid_from).format("DD/MM/YYYY HH:mm:ss"),
    valid_to: dayjs(voucher.valid_to).format("DD/MM/YYYY HH:mm:ss"),
    updateAnddelete: (
      <div className="flex">
        <Link to={`/administrator/update-post/${voucher.id}`}>
          <FaEdit className="text-[20px] cursor-pointer" />
        </Link>
        <MdDeleteOutline
          className="ml-[10px] text-[20px] cursor-pointer hover:text-red-400"
          type="primary"
          danger
          onClick={() => {
            if (window.confirm("Bạn thật sự muốn xóa mã giảm giá này ?")) {
              dispatch(deleteVourcherStart(voucher.id));
            }
          }}
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
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
    <div className="p-[20px]">
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default AllVourcher;
