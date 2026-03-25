import './profilePage.css'; 
import Image from '../../components/imageComponent/imageComponent';
import { useState } from 'react';
import Gallery from '../../components/gallery/gallery';
import { useQuery } from '@tanstack/react-query';
import apiRequest from '../../utils/apiRequest';
import { useParams } from 'react-router';
import FollowButton from './followButton';
import useAuthStore from '../../utils/authStore';

const ProfilePage = () => {

    const [type, setType] = useState("created");
    const { currentUser } = useAuthStore();

    const {userName} = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: ["profile", userName],
        queryFn: () => apiRequest.get(`/users/${userName}`).then((res) => res.data),
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    if (!data) return "Profile not found!";

    return (
        <div className="profilePage">
            <Image 
                className="profileImg" 
                path={data.img || "general/noAvatar.png"} 
                alt=""
                w={100}
                h={100}
            />
            <h1 className='profileName'>{data.displayName}</h1>
            <span className='profileUsername'>@{data.userName}</span>
            <div className="followCounts">{data.followersCount} followers . {data.followingCount} followings</div>
            <div className='profileInteractions'>
                <Image path="general/share.svg" alt="Some description"/>
                <div className='profileButtons'>
                    <button>Message</button>
                    <FollowButton 
                        {...(currentUser?.userName === userName ? {disabled: true} : {})}
                        isFollowing={data.isFollowing} 
                        userName={data.userName}/>
                </div>
                <Image path="general/more.svg" alt="Some description"/>
            </div>
            <div className="profileOptions">
                <span onClick={() => setType("created")} className={type==="created" ? "active" : ""}>Created</span>
                <span onClick={() => setType("saved")} className={type==="saved" ? "active" : ""}>Saved</span>
            </div>
            {type ==="created" ? <Gallery userId ={data._id} /> : <Gallery savedByUser={data._id}/>}
        </div>
    );
}

export default ProfilePage; 