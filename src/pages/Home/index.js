import React, { Component }  from 'react';
import { useEffect, useState} from 'react';
import api from '../../services/api';

function Home(){
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "31b63180bfeed37de10f130bddeba4cd",
                    language: "pt-BR",
                    page: 1,
                }
            })
            console.log(response.data.results);
        }
        loadFilmes();

    }, [])

    return(
        <div>
        <h1>BEM VINDO A HOME</h1>
        </div>
    )
}

export default Home;