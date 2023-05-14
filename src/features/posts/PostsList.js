import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts , getPostsError , getPostsStatus , fetchPosts} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const postsError = useSelector(getPostsError);


    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    },[postStatus,dispatch])


    let contetn;
    if (postStatus === 'loading') {
        contetn = <p>'Loading...'</p>;
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        contetn = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post}/>)
    } else if (postStatus === 'failed') {
        contetn = <p>{postsError}</p>
    }
   

    return (
        <section>
            <h2>Posts</h2>
            {contetn}
        </section>
    )
}
export default PostsList
