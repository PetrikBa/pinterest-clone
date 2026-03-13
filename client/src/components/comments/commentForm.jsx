import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import apiRequest from '../../utils/apiRequest';

const CommentForm = ({id}) => {
    
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [desc, setDesc] = useState("");

    const handleEmojiClick = (emojiData) => {
        setDesc((prev) => prev + " " + emojiData.emoji);
        setOpenEmojiPicker(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const res = await apiRequest.post('/comments', {
            description: desc, 
            pin: id
        });
    };

    return (
    <form className="commentForm" onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Add a comment"
        onChange={(e)=> setDesc(e.target.value)}
        value={desc}
        />
        <div className="emoji">
        <div onClick={() => setOpenEmojiPicker((prev) => !prev)}>😊</div>
        {openEmojiPicker && (
            <div className="emojiPicker">
            <EmojiPicker 
                onEmojiClick={handleEmojiClick}
            />
            </div>
        )}
        </div>
    </form>
    );
};

export default CommentForm;