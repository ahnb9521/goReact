import React from 'react';
import '../css/Board.css';
import Axios from 'axios';

let endpoint='http://localhost:1323';

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            review : '',
            key : props.key,
        };
    }

    render() {
        return(
            <div className="board__in">
                <div className="review">
                    <h4 className="review__title">REVIEW</h4>
                    <h4 className="review__close" onClick={this.clickClose}>X</h4>
                    <div>
                        <textarea className="textarea" onChange={this.reviewChange}></textarea>
                        <button className="btn__save" onClick={this.clickSave}>등 록</button>
                        <hr></hr>
                    </div>
                    <div>
                        <p className="review__content">test1111111111\nwer</p><p className="review__id">아이디1</p>|<p className="review__date">2020-06-19 04:58</p> <p className="review__modify">+</p> <p className="review__modify">-</p> <br></br>
                        <p className="review__content">test1111111111\nwer</p><p className="review__id">아이디1</p>|<p className="review__date">2020-06-19 04:58</p><br></br>
                        <p className="review__content">test1111111111\nwer</p><p className="review__id">아이디1</p>|<p className="review__date">2020-06-19 04:58</p><br></br>
                    </div>
                </div>
            </div>
        )
    }

    clickSave = async() => {
        let form = new FormData();
        form.append('content', this.state.review)
        form.append('movieKey', this.state.key)
        const result = await Axios.post(endpoint + "/review",form);
    }

    reviewChange = (e) => {
        this.setState({review : e.target.value})
    }

    clickClose = () => {
        this.props.onCancel();
    }
}

export default Board;