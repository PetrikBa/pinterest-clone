import './comments.css'; 
import Image from '../imageComponent/imageComponent';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiRequest from '../../utils/apiRequest';

const Comments = ({ id }) => {

    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const { isPending, error, data } = useQuery({
        queryKey: ["comments", id],
        queryFn: () => apiRequest.get(`/comments/${id}`).then((res) => res.data),
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    if (!data) return "Comments not found!";

    console.log(data);
    
    return (
        <div className="comments">
            <div className="commentList">
                <span className="commentCount">5 comments</span>
                <div className="comment">
                    <Image path="/general/noAvatar.png"/>
                    <div className="commentContent">
                        <span className="commentUsername">Username</span>
                        <p className='commentText'>
                            Lorem Ipsum is simply dummy text of the printing and 
                            typesetting industry. Lorem Ipsum has been the industry's 
                            standard dummy text ever since the 1500s, when an unknown 
                            printer took a galley of type and scrambled it to make 
                        </p>
                        <span className="commentTime"> 1h ago</span>
                    </div>
                </div>
                <div className="comment">
                    <Image path="/general/noAvatar.png"/>
                    <div className="commentContent">
                        <span className="commentUsername">Username</span>
                        <p className='commentText'>
                            Lorem Ipsum is simply dummy text of the printing and 
                            typesetting industry. Lorem Ipsum has been the industry's 
                            standard dummy text ever since the 1500s, when an unknown 
                            printer took a galley of type and scrambled it to make 
                        </p>
                        <span className="commentTime"> 1h ago</span>
                    </div>
                </div>
                <div className="comment">
                    <Image path="/general/noAvatar.png"/>
                    <div className="commentContent">
                        <span className="commentUsername">Username</span>
                        <p className='commentText'>
                            Lorem Ipsum is simply dummy text of the printing and 
                            typesetting industry. Lorem Ipsum has been the industry's 
                            standard dummy text ever since the 1500s, when an unknown 
                            printer took a galley of type and scrambled it to make 
                        </p>
                        <span className="commentTime"> 1h ago</span>
                    </div>
                </div>
                <div className="comment">
                    <Image path="/general/noAvatar.png"/>
                    <div className="commentContent">
                        <span className="commentUsername">Username</span>
                        <p className='commentText'>
                            Lorem Ipsum is simply dummy text of the printing and 
                            typesetting industry. Lorem Ipsum has been the industry's 
                            standard dummy text ever since the 1500s, when an unknown 
                            printer took a galley of type and scrambled it to make 
                        </p>
                        <span className="commentTime"> 1h ago</span>
                    </div>
                </div>
            </div>
            <form action="" className="commentForm">
                <input name="comment" type="text" placeholder='Add a comment'/>
                <div className="emoji">
                    <button
                        type="button"
                        onClick={() => setOpenEmojiPicker(prev => !prev)}
                        aria-label="Open emoji picker"
                    >
                        <svg 
                            viewBox="0 0 24 24" 
                            aria-hidden="true" 
                            focusable="false"
                            className={`emojiButton ${openEmojiPicker ? 'isOpen' : ''}`}
                            >
                            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.8" />
                            <circle cx="9" cy="10" r="1.2" fill="currentColor" />
                            <circle cx="15" cy="10" r="1.2" fill="currentColor" />
                            <path d="M8 14.5c1 1.4 2.3 2.1 4 2.1s3-.7 4-2.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </button>
                    {
                        openEmojiPicker && <div className="emojiPicker">
                            <EmojiPicker/>
                        </div>
                    }
                </div>
            </form>
        </div>
    );
}

export default Comments;