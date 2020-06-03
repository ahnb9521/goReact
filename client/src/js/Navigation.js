import React from 'react';
import {Link} from 'react-router-dom';
import {Button, InputGroup, FormControl, Container, Row, Col} from 'react-bootstrap'

class Navigation extends React.Component{

    state = {
        search: ''
    }

    componentWillReceiveProps(props) {
        this.setState({search: props.search})
    }

    render(){
        return (
            <Container fluid>
                <Row className="justify-content-md">
                    <h1 className="Title2">Movie Search</h1>
                    <div style={{width: '50%'}}>
                        <InputGroup className="mb-3" size="md">
                            <FormControl 
                            placeholder="Search..."
                            aria-label="Search..."
                            aria-describedby="basic-addon2"
                            value={this.state.search}
                            onChange={this.changeHandler}
                            />
                            <InputGroup.Append>
                            <Link to={{
                                pathname: '/search',
                                state: {
                                    search: this.state.search
                                }
                            }}
                                onClick={() => window.location.reload()}
                            >
                                <Button variant="outline-secondary" size="md">검색</Button>
                            </Link>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </Row>
            </Container>
        )
    }

    changeHandler = (e) => {
        console.log(this.state.search)
        this.setState({search: e.target.value})
    }
   
}

export default Navigation;