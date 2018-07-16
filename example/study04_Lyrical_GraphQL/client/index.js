import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClinet from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

const client = new ApolloClinet({

});

const Root = () => {
  return <ApolloProvider client={client}>
    <Router>
      <App>
        <Route path="/" exact component={SongList} />
        <Route path="/songs/new" component={SongCreate} />
      </App>
    </Router>
  </ApolloProvider>
};

console.log(document.getElementById('back').innerText);

document.getElementById('back').remove();

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);