import React from 'react';
import Axios from 'axios';
import Navigation from './Navigation';
import Movie from './Movie';

let endpoint = "http://localhost:1323";

class Search extends React.Component {

    state = {
        search: '',
        movies: [],
        ranks: []
    }

    componentDidMount() {
        this.getMovies();
        this.getRank();
    }

    render() {
        const {movies, ranks} = this.state;
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
                        desc={movie.Desc}
                    />
                    
                ))}
                </div>
                <div className="ranking">
                    <h5>영화 순위</h5>
                    <hr></hr>
                    {ranks.map((rank, i) => 
                        <p>{i+1}. {rank}</p>
                    )}
                </div>
            </div>
        )
    }

    getMovies = async () => {
        const {location} = this.props;
        const search = location.state.search;
        const {data} = await Axios.get(endpoint + "/search", {
            params: {
                query: search
            }
        });
        this.setState({search: search, movies: data});
    }

    getRank = async() => {
        const {data} = await Axios.get(endpoint + "/rank",{
            params: {

            }
        });
        this.setState({ranks: data});
    }

}

export default Search;