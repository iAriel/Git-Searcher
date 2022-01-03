import {React, useEffect, useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap'

import api from '../../services/api'

import styles from '../../styles/components/repositories.module.css'

export default function ReposRender(props){
    
    const [repos, setRepos] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPage, setItemsPage] = useState(8)

    const pages = [];
    const indexOfLastItem = currentPage * itemsPage;
    const indexOfFirstItem = indexOfLastItem - itemsPage;
    const currentItems = repos.slice(indexOfFirstItem, indexOfLastItem);

    const handleUpdate = (event) => {
        setCurrentPage(event.target.id)
    }

    for(let i = 1; i <Math.ceil(repos.length/itemsPage); i++){
        pages.push(i);
    }

    const renderPagesNumb = pages.map(number => {
        return(
            <li 
                key={number} 
                id={number} 
                onClick={handleUpdate}
                className={currentPage === number ? styles.active : null}
                >
                {number}
            </li>
        )
    })
    useEffect(() => {
        api.get(`${props.reposUrl}/repos`)  
        .then((response) => {
            setRepos(response.data)
            console.log(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [props])

    return(
        <div className={styles.container}>
            <div className={styles.searchContaier}>
                <Form className={styles.newSearch} type="submit">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control size="sm" type="text" placeholder="Ex: usuário"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Buscar
                    </Button>
                </Form>
            </div>
            <div className={styles.cards}>
                {currentItems.map(repositori => (
                    <Card className={styles.card} style={{ width: '18rem' }} key={repositori.id}>
                        <Card.Body>
                            <Card.Title>{repositori.name}</Card.Title>
                            <div className={styles.descript}>
                            <Card.Text>
                            {repositori.description || "Sem Descrição"}
                            </Card.Text>
                            </div>
                            <div className={styles.butt}>
                                <Button variant="primary">Acessar</Button>
                            </div>
                                
                            </Card.Body>
                    </Card>
                ))}
            </div>
                <div className={styles.pagination}>
                    {renderPagesNumb}
                </div>
        </div>
    )
}