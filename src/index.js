import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import styles from './styles/global.css';


ReactDOM.render(
  <React.StrictMode>
    <App className={styles.global}/>
  </React.StrictMode>,
  document.getElementById('root')
);

