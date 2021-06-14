import React from 'react'
import './HomeScreen.css'
import Banner from '../Banner'
import Nav from '../Nav'
import Requests from '../Request'
import Row from '../Row'

function HomeScreen() {
    return (
        <div className='homeScreen'>
            {/* Nav */}
            <Nav/>
            {/* Banner */}
            <Banner/>
            {/* Row */}
            <Row
                title='NEXTFLIX ORIGINAL'
                fetchURL= {Requests.fetchNetflixOriginals}
                isLargeRow
            />
            <Row title='Top Rated' fetchURL= {Requests.fetchTopRated}/>
            <Row title='Action Movies' fetchURL= {Requests.fetchActionMovies}/>
            <Row title='Comedy Movies' fetchURL= {Requests.fetchComedyMovies}/>
            <Row title='Horror Movies' fetchURL= {Requests.fetchHorrorMovies}/>
            <Row title='Romance Movies' fetchURL= {Requests.fetchRomanceMovies}/>
            <Row title='Document Movies' fetchURL= {Requests.fetchDocumentMovies}/>
        </div>
    )
}

export default HomeScreen
