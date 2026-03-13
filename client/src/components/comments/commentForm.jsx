import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import apiRequest from '../../utils/apiRequest';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

const addComment = async (comment) => {
    const res = await apiRequest.post('/comments', comment);
    return res.data;
}

const CommentForm = ({id}) => {
    
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [desc, setDesc] = useState("");

    const handleEmojiClick = (emojiData) => {
        setDesc((prev) => prev + " " + emojiData.emoji);
        setOpenEmojiPicker(false);
    }

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", id] });
            setDesc("");
            setOpenEmojiPicker(false);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!desc.trim()) return;
        
        mutation.mutate({
            description: desc.trim(),
            pin: id,
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