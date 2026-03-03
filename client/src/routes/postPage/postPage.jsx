import './postPage.css'; 
import Image from '../../components/imageComponent/imageComponent';
import PostInteractions from '../../components/postInteractions/postInteractions';
import { Link } from 'react-router-dom';
import Comments from '../../components/comments/comments';

const PostPage = () => {
    return (
        <div className="postPage">
            <div className="postContainer">
               <div className="postImg">
                    <Image path="/pins/pin1.jpeg" alt="" w={736}/>
                </div>
                <div className="postDetails">
                    <PostInteractions />
                    <Link to="/john" className="postUser">
                        <Image path="/general/noAvatar.png" alt="John's profile" w={32} h={32} />
                        <span>John</span>
                    </Link>
                    <Comments></Comments>
                </div> 
            </div>
        </div>
    );
}

export default PostPage;