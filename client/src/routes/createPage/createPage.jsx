import './createPage.css'; 
import IKIImage from '../../components/imageComponent/imageComponent';
import useAuthStore from '../../utils/authStore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Editor from '../../components/editor/editor';

const CreatePage = () => {

    const {currentUser} = useAuthStore();

    const navigate = useNavigate();

    useEffect (() => {
        if(!currentUser) {
            navigate('/auth');
        }
    }, [currentUser, navigate])

    const [ file, setFile ] = useState(null);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ previewImg, setPreviewImg ] = useState({
        url: '',
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (file) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            setPreviewImg({
            url: URL.createObjectURL(file),
            width: img.width,
            height: img.height,
            });
        };
        }
    }, [file]);
    
    return (
        <div className="createPage">
            <div className="createTop">
                <h1>{isEditing ? "Edit Pin" : "Create Pin"}</h1>
                <button>{isEditing ? "Done" : "Publish"}</button>
            </div>
            {isEditing ? (
                <Editor previewImg={previewImg}/> 
                ) : (
                <div className="createBottom">
                    {previewImg.url ? (
                        <div className="preview">
                            <img src={previewImg.url} alt="Preview" />
                            <div className="editIcon" onClick={() => setIsEditing(true)}>
                                <IKIImage path="/general/edit.svg" />
                            </div>
                        </div>
                    ) : 
                    <>
                        <label htmlFor="file" className="upload">
                        <div className="uploadTitle">
                            <IKIImage path="/general/upload.svg" />
                        </div>
                        <div className="uploadInfo">
                            we recommend using high-quality jpg images that are 236px wide.
                        </div>
                    </label>
                    </>
                    
                    }
                    <input 
                        type="file" 
                        id="file" 
                        hidden
                        onChange={e=>setFile(e.target.files[0])} 
                    />
                    <form action="" className="createForm">
                        <div className="createFormItem">
                            <label htmlFor="title">Title</label>
                            <input 
                                type="text" 
                                placeholder='Add a title' 
                                id="title"
                                name='title'
                            />
                        </div>
                        <div className="createFormItem">
                            <label htmlFor="description">Detail <data value=""></data>escription</label>
                            <input 
                                type="text" 
                                placeholder='Add a description' 
                                id="description"
                                name='description'
                            />
                        </div>
                        <div className="createFormItem">
                            <label htmlFor="link">Link</label>
                            <input 
                                type="text" 
                                placeholder='Add a link' 
                                id="link"
                                name='link'
                            />
                        </div>
                        <div className="createFormItem">
                            <label htmlFor="board">Board</label>
                            <select id="board" name='board'>
                                <option>Choose a board</option>
                                <option value="board1">Board 1</option>
                                <option value="board2">Board 2</option>
                                <option value="board3">Board 3</option>
                            </select>
                        </div>
                        <div className="createFormItem">
                            <label htmlFor="tags">Tags</label>
                            <input 
                                type="text" 
                                placeholder='Add tags' 
                                id="tags"
                                name='tags'
                            />
                            <small>Don't worry, people will not see your tags.</small>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default CreatePage;