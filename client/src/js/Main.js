import React from 'react';
import '../css/Main.css';
import {Link} from 'react-router-dom';
import {Button, InputGroup, FormControl, Container, Row, Col} from 'react-bootstrap'

class Main extends React.Component {

  state = {
    search: ''
  }

  render() {
    return (
      
      <div className="App">
      
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col xs lg="4">
            <h1 className="Title">Movie Search</h1>
            <div>
              <InputGroup className="mb-3" size="lg">
                <FormControl 
                  placeholder="Search..."
                  aria-label="Search..."
                  aria-describedby="basic-addon2"
                  onChange={this.handleChange}
                  value={this.state.search}
                />
                <InputGroup.Append>
                  <Link to={{
                    pathname: '/search',
                    state: {
                      search: this.state.search
                    }
                  }}>
                    <Button variant="outline-secondary" size="lg">검색</Button>
                  </Link>
                </InputGroup.Append>
              </InputGroup>
            </div>
            </Col>
          </Row>
        </Container>
        
      </div> 
    );
  }

  componentDidMount() {
    
  }

  handleChange = (e) => {
    this.setState(
      {search: e.target.value}
    )
  }


}

export default Main;
