import axios from './axios';
import React,{useState,useEffect} from 'react'
import './Banner.css'
import requests from './Request';

function Banner() {
    const [movie, setMovies] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovies(
                request.data.results[
                    Math.floor(Math.random()*request.data.results.length-1)
                ]
            );
            return request;
        }

        fetchData();
    },[])
    console.log(movie)
    function truncate(string,n){
        return string!==undefined?  string.length > n ? string.substr(0,n-1)+'...':string:''
    }
    return (
        <header className='banner' style={{
            backgroundSize:'cover',
            backgroundImage:`url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
            backgroundPosition:'center center',
        }}>
            <div className='banner_contents'>
                <h1 className='banner_title'>{movie?.title||movie?.name||movie?.original_name}</h1>
                <div className='banner_buttons'>
                    <button className='banner_button'>play</button>
                    <button className='banner_button'>my playlist</button>
                </div>
                <h1 className='banner_description'>
                    {
                        truncate(
                            movie?.overview,150
                        )
                    }
                </h1>
            </div>
            <div className='banner_fade_button'></div>
        </header>
    )
}

export default Banner
