import './gallery.css';
import { useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';
import GalleryItem from '../galleryItem/galleryItem.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';

const items = [];

const fetchPins = async ({ pageParam, search }) => {
    const res = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/pins?cursor=${
            pageParam
        }&search=${search || ''}`
    );
    return res.data;
}

const Gallery = ({search}) => {
    
    const {data, fetchNextPage, hasNextPage, status} = useInfiniteQuery({ 
        queryKey: ['pins',search], 
        queryFn: ({ pageParam =0 }) => fetchPins({ pageParam, search }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor, 
    });

    if(status === 'pending') return <div>Loading ...</div>;
    if(status === 'error') return <div>Error fetching data</div>;

    console.log(data);

    const allPins = data.pages.flatMap((page) => page.pins) || [];    

    return (   
        <InfiniteScroll 
            dataLength={allPins.length} 
            next={fetchNextPage} 
            hasMore={!!hasNextPage} 
            loader={<h4>Loading more pins...</h4>} 
            endMessage={<p><b>Yay! You have seen it all</b></p>}>
            <div className="gallery">
                {allPins.map((item)=>(
                    <GalleryItem key={item._id} item={item}/>
                ))}
            </div>
        </InfiniteScroll> 
    );
}

export default Gallery;