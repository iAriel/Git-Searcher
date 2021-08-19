import { React, useState} from 'react';
import { Button, Form } from 'react-bootstrap'
import api from '../../services/api'
// import axios from 'axios';

import styles from '../../styles/components/pageDefault.module.css'
import Reositories from '../repositories/index'

import Search from '../../assets/Group.svg'
export default function PageDefault(){
    const [user, setUser] = useState("");
    const [data, setData] = useState({
        "login": "",
        "avatar_url": "",
        "followers": "",
        "bio": "",

    })

    const HandleSearch = (e) => {
        e.preventDefault();
        api.get(user)
        .then((response) => {
            setData(response.data)
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    return(
        <div className={styles.container}>
            <div className={styles.nav}>
                <p>{data.name || 'GS'}</p>
            </div>

            <div className ={styles.pageContent}>
                
                {!data.login ?
                    (
                        <>
                        <aside className={styles.sideBar}>
                            <p>GIT 
                                <br/>
                                SEARCHER
                            </p>
                        </aside>
                        <aside className={styles.content}>
                            <img src={Search} alt="foto de uma Lupa"/>
                            <Form type="submit">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Usuário</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Ex: Bartolomeu" onChange={event => setUser(event.target.value)}/>
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={HandleSearch}>
                                    Buscar
                                </Button>
                            </Form>
                        </aside>
                        </>
                    ) : (
                        <>
                        <aside className={styles.sideBar}>
                            <div className={styles.profile}>
                                <img src={data.avatar_url} alt="imagem do usuário"/>
                                <p> {data.login}</p>
                                <div className={styles.info}>
                                    <p>Repositorios <br/> {data.public_repos}</p>
                                    <p>Seguidores <br/> {data.followers}</p>
                                    <p>{data.bio}</p>
                                </div>
                            </div>
                        </aside>
                        <div className={styles.content}>
                            <Reositories reposUrl = {user} />
                        </div>  
                        
                    </> 
                    ) 
                }
            </div>
        </div>
    );
}