import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap'

class Movie extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title : props.title,
            image : props.image,
            subtitle : props.subtitle,
            link : props.link,
            pubDate : props.pubDate,
            director : props.director,
            acotr : props.actor,
            userRating : props.userRating,
            desc : props.desc
        }

    }



    render() {
        return (
            <Link to={{
                pathname:'',
                state: {
                }
            }}>
                <div className="movie__box">
                    <div className="movie__img"><img src={this.state.image} alt={this.state.title} title={this.state.title}/></div>
                    <h5><div className="movie__Nm" dangerouslySetInnerHTML={{__html:this.state.title}}></div></h5>
                    <div>{this.state.desc}</div>
                    <Button className="btn__review" onClick={this.reviewBtnClick} variant="outline-secondary" size="md">REVIEW</Button>
                </div>
            </Link>
        )
    }

    reviewBtnClick = () => {
        this.props.onSubmit();
        this.props.getKey(this.state.link);
    }


}

Movie.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    subtitle: PropTypes.string,
    pubDate: PropTypes.string,
    director: PropTypes.string,
    actor: PropTypes.string,
    userRating: PropTypes.string,
    desc: PropTypes.string,
}

export default Movie;