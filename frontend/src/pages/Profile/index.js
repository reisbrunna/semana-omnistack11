import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';


export default function Profile() {
    const [casos, setCasos] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setCasos(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`casos/${id}` , {
                headers : {
                    Authorization: ongId,
                }
            });

            setCasos(casos.filter(caso => caso.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/casos/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {casos.map(caso => (
                    <li key={caso.id}>
                        <strong>Caso:</strong>
                        <p>{caso.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{caso.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.value)}</p>

                        <button onClick={() => handleDeleteIncident(caso.id)} type="button">
                            <FiTrash2 size={20} color="a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}