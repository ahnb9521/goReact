import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './js/Main'
import Search from './js/Search'

function App() {
  return (
    <BrowserRouter>
        <Route path="/" exact={true} component={Main}/>
        <Route path="/search" component={Search}/>
    </BrowserRouter>
    );
}

export default App;