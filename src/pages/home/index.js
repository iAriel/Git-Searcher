import React from 'react';

import PageDefault from '../../components/pagedefault/index';

import styles from '../../styles/pages/home.css';
export default function Home (){
    return(
        <div className={styles.containerHome}>
            <PageDefault/>
        </div>
        
    );
}