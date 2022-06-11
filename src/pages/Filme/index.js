import React, {  }  from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css';

function Filme(){
    const { id } = useParams();
    const navigation = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "31b63180bfeed37de10f130bddeba4cd",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() =>{
                console.log("FILME NÃO ENCONTRADO");
                navigation("/", { replace: true })
                return;
            })
        }
        loadFilme();

        return () => {
            console.log("COMPONENTE FOI DESMONTADO");
        }

    }, [navigation, id])

    function saveMovies(){
       const myList = localStorage.getItem("@primeFlix");
       let movieSave = JSON.parse(myList) || [];
       const hasMovie = movieSave.some( (movieSave) => movieSave.id === filme.id)

       if(hasMovie){
        alert("ESSE FILME JÁ ESTÁ NA LISTA");
        return;
       }
       movieSave.push(filme);
       localStorage.setItem("@primeFlix", JSON.stringify(movieSave));
       alert("FILME SALVO COM SUCESSO");

    }
  

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )

    }
    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div className='area-buttons'>
                <button onClick={saveMovies}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} trailer`}>
                        Trailer
                    </a>
                </button>

            </div>
        </div>
    )
}

export default Filme;