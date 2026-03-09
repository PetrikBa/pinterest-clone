import Image from "../imageComponent/imageComponent";
import { format } from "timeago.js";

const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <Image path={comment.user.img || "/general/noAvatar.png"}/>
            <div className="commentContent">
                <span className="commentUsername">{comment.user.userName}</span>
                <p className='commentText'>
                    {comment.description} 
                </p>
                <span className="commentTime">{format(comment.createdAt)}</span>
            </div>
        </div>             
    );
}  

export default Comment;
            