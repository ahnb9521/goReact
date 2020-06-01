import React from 'react';
import Axios from 'axios';
import '../css/App.css';
import {Link} from 'react-router-dom';

let endpoint = "http://localhost:1323";

class Search extends React.Component {

    state = {
        movies: []
    }

    componentDidMount() {
        this.getMovies();
    }

    render() {
        const {movies} = this.state;
        return (<div>
            heheheheeh
        </div>);
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
        })
        console.log(items)

    }

}

export default Search;