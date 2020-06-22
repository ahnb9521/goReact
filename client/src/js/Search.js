import React from 'react';
import Axios from 'axios';
import Navigation from './Navigation';
import Movie from './Movie';
import Board from './Board';

let endpoint = "http://localhost:1323";

class Search extends React.Component {

    


    constructor() {
        super();

        this.state = {
            search: '',
            movies: [],
            ranks: [],
            click: 0,
            movieKey: ''
        }

        this.clickRank = this.clickRank.bind(this);
    }


    componentDidMount() {
        this.getMovies();
        this.getRank();
    }

    onClickReviewBtn = () => {
        this.setState({click:1});
    }

    onReviewCancel = () => {
        this.setState({click:0});
    }

    getKey = (key) => {
        this.setState({movieKey: 1234});
        console.log("test : " + this.state.movieKey + ", " + key);
    }

    render() {
        const {movies, ranks} = this.state;
        console.log(movies)
        return (
            <div>
                <div className="movie__div">
                    <Navigation search={this.state.search}/>
                    <div>
                    {movies.map(movie => (
                        <Movie onSubmit={this.onClickReviewBtn}
                            getKey={this.getKey}
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
                            <p key={i} className="movie__rank">{i+1}. <a href="# " data-rank={rank} onClick={this.clickRank}>{rank}</a></p>
                        )}
                    </div>
                </div>
                {this.state.click === 1 ? (<div><div className="board__div"></div><Board onCancel={this.onReviewCancel} key={this.state.clickKey}/></div>) : (<div/>) }
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

    clickRank(e) {
        this.setState({search: e.target.dataset.rank});
    }

    

}

export default Search;