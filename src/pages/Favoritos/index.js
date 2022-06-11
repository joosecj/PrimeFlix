import React, { useEffect, useState }  from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';


function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const myList = localStorage.getItem("@primeFlix");
        setFilmes(JSON.parse(myList) || [])
    }, [])

    function deleteMovie(id){
        let movieFilter = filmes.filter( (item) => {
            return (item.id !== id);

        })
        setFilmes(movieFilter);
        localStorage.setItem("@primeFlix", JSON.stringify(movieFilter));
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>
            {filmes.length === 0 && <spam>Você não tem nenhum filme salvo :(</spam>}
            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}> Ver Detalhes</Link>
                                <button onClick={() => deleteMovie(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Favoritos;