import './searchPage.css'; 
import Gallery from '../../components/gallery/gallery';
import { useSearchParams } from 'react-router';


const SearchPage = () => {

    let [searchParams] = useSearchParams();
    const search = searchParams.get('q') || '';

    return (
        <Gallery search={search}/>
    );
}

export default SearchPage;