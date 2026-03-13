import './gallery.css';
import { useInfiniteQuery} from '@tanstack/react-query';
import { useEffect } from 'react';
import axios from 'axios';
import GalleryItem from '../galleryItem/galleryItem.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';

const fetchPins = async ({ pageParam, search, userId, boardId }) => {
    const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/pins`, {
        params: {
            cursor: pageParam,
            search: (search || '').trim(),
            userId: (userId || '').trim(),
            boardId: (boardId || '').trim(),
        },
    });
    return res.data;
}

const Gallery = ({search, userId, boardId}) => {
    
    const {data, fetchNextPage, hasNextPage, status, isFetchingNextPage} = useInfiniteQuery({ 
        queryKey: ['pins', search, userId, boardId], 
        queryFn: ({ pageParam =0 }) => fetchPins({ pageParam, search, userId, boardId }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor, 
    });

    const allPins = data?.pages.flatMap((page) => page.pins) || [];

    // Auto-fetch more content if there are too few pins initially
    useEffect(() => {
        if (allPins.length < 42 && hasNextPage && !isFetchingNextPage) {
            setTimeout(() => {
                fetchNextPage();
            }, 200);
        }
    }, [allPins.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if(status === 'pending') return <div>Loading ...</div>;
    if(status === 'error') return <div>Error fetching data</div>;

    return (   
        <InfiniteScroll 
            dataLength={allPins.length} 
            next={fetchNextPage} 
            hasMore={!!hasNextPage && !isFetchingNextPage} 
            loader={<h4>Loading more pins...</h4>} 
            endMessage={<p><b>Yay! You have seen it all</b></p>}
            scrollThreshold={0.8}
            style={{ overflow: 'visible' }}>
            <div className="gallery">
                {allPins.map((item)=>(
                    <GalleryItem key={item._id} item={item}/>
                ))}
            </div>
        </InfiniteScroll> 
    );
}

export default Gallery;