import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './routes.js';

import history from './history.js';

function App() {
  return (
    <div>
      <Router history={history}>
        <Routes/>
      </Router>
    </div>
  );
}

export default App;
