import React from 'react';
import '../css/App.css';
import {Link} from 'react-router-dom';

class Main extends React.Component {

  state = {
    search: ''
  }

  render() {
    return (
      <div className="App">
          <h1 className="Title">Search The Movie</h1>
          <div><input className="search_movieNm" onChange={this.handleChange} type="text" name="srch_Nm"></input></div>
          <Link to={{
            pathname: '/search',
            state: {
              search: this.state.search
            }
          }}><div>검색</div></Link>
      </div> 
    );
  }

  handleChange = (e) => {
    this.setState(
      {search: e.target.value}
    )
  }
}

export default Main;
