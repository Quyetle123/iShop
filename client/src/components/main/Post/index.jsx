import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPostByIdStart } from '../../../redux/slices/postSlice';

const PostPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { selectedPost } = useSelector((state) => state.posts);
    const post = selectedPost ? selectedPost.post : null;
    console.log(post);

    useEffect(() => {
        dispatch(fetchPostByIdStart(id));
    }, [dispatch, id]);
    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-900">{post?.title}</h1>
            <img src={post?.image} alt={post?.title} className="w-full h-auto rounded-lg my-4" />
            <div className="prose lg:prose-lg" dangerouslySetInnerHTML={{ __html: post?.content }} />
            <p className="text-sm text-gray-500 mt-4">Ngày đăng: {new Date(post?.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default PostPage;
