import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';
import Movie from './Movie';

let endpoint = "http://localhost:1323";

class Search extends React.Component {

    state = {
        search: '',
        movies: []
    }

    componentDidMount() {
        this.getMovies();
    }

    render() {
        const {movies} = this.state;
        return (
            <div>
                <Navigation search={this.state.search}/>
                <div>
                {movies.map(movie => (
                    <Movie 
                        key={movie.link}
                        title={movie.title}
                        image={movie.image}
                        subtitle={movie.subtitle}
                        link={movie.link}
                        pubDate={movie.pubDate}
                        director={movie.director}
                        actor={movie.actor}
                        userRating={movie.userRating}
                    />
                    
                ))}
                </div>
            </div>
        )
    }

    getMovies = async () => {
        const {location} = this.props;
        const search = location.state.search;
        const {data: {
                items
            }} = await Axios.get(endpoint + "/search", {
            params: {
                query: search
            }
        });
        this.setState({search: search, movies: items});
    }

}

export default Search;