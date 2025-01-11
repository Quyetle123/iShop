import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsStart } from "../../../redux/slices/postSlice";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
const AllPost = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.posts);
  const postList = Array.isArray(posts.posts) ? posts.posts : [];
  console.log(postList);

  useEffect(() => {
    dispatch(fetchPostsStart());
  }, [dispatch]);
  const dataSource = postList.map((post, index) => ({
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
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Tên đề",
      dataIndex: "title",
      key: "title",
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

export default AllPost;
