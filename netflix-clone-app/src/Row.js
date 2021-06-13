import axios from './axios';
import React,{useEffect,useState} from 'react'
import './Row.css'

function Row({title,fetchURL,isLargeRow=false}) {
    const [movies, setMovies] = useState([]);
    const baseURLImage='https://image.tmdb.org/t/p/original/';

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    },[fetchURL]);

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row_posters'>
                {movies.map((movie) => (
                    ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                        <img 
                            key={movie.id}
                            src={`${baseURLImage}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                            alt={movie.name}
                            className={`row_poster ${isLargeRow && 'row_poster_large'}`}
                        />
                    )
                ))}
            </div>
        </div>
    )
}

export default Row
