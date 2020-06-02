import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';

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
                <Navigation />
                {movies.map(movie => (
                    <Link to={{
                        pathname:'',
                        state: {

                        }
                    }}>
                        <div>
                            <div><img src={movie.image} alt={movie.title} title={movie.title}/></div>
                            <div dangerouslySetInnerHTML={{__html: movie.title}}></div>
                            <div>test</div>
                        </div>

                    </Link>
                ))}
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