import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

function Movie({title, image, subtitle, link, pubDate, director, actor, userRating }) {
    return (
        <Link to={{
            pathname:'',
            state: {

            }
        }}>
            <div className="movie__box">
                <div className="movie__img"><img src={image} alt={title} title={title}/></div>
                <div className="movie__Nm" dangerouslySetInnerHTML={{__html:title}}></div>
                <div>{link.replace("https://movie.naver.com/movie/bi/mi/basic.nhn?code=","")}</div>
            </div>

        </Link>
    )
};

Movie.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    subtitle: PropTypes.string,
    pubDate: PropTypes.string,
    director: PropTypes.string,
    actor: PropTypes.string,
    userRating: PropTypes.number
}

export default Movie;