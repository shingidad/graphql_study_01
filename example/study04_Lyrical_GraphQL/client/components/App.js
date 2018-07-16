import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';


function App({ children }) {
    return (
        <div className="container">
            <Switch>
                {children}
            </Switch>
        </div>
    );
};

App.propTypes = {

};

export default App;