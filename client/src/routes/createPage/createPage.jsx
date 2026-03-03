import './createPage.css'; 
import Image from '../../components/imageComponent/imageComponent';

const CreatePage = () => {
    return (
        <div className="createPage">
            <div className="createTop">
                <h1>Create pin</h1>
                <button>Publish</button>
            </div>
            <div className="createBottom">
                <div className="upload">
                    <div className="uploadTitle">
                        <Image path="/general/upload.svg" />
                    </div>
                    <div className="uploadInfo">
                        we recommend using high-quality jpg images that are 236px wide.
                    </div>
                </div>
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
        </div>
    );
}

export default CreatePage;