import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const CommentForm = () => {
    
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    return (
    <form className="commentForm">
        <input
        type="text"
        placeholder="Add a comment"
        />
        <div className="emoji">
        <div onClick={() => setOpenEmojiPicker((prev) => !prev)}>😊</div>
        {openEmojiPicker && (
            <div className="emojiPicker">
            <EmojiPicker />
            </div>
        )}
        </div>
    </form>
    );
};

export default CommentForm;