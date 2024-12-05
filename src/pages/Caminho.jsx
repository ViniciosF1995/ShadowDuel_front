import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Caminho.css';

function Caminho() {
    const navigate = useNavigate();

    // Estado para armazenar a carta selecionada
    const [cartaSelecionada, setCartaSelecionada] = useState(null);
    const [tipoDeckEsqueleto, setTipoDeckEsqueleto] = useState('');
    const [tipoDeckGoblin, setTipoDeckGoblin] = useState('');
    const [tipoDeckGuerreiro, setTipoDeckGuerreiro] = useState('');
    const [tipoDeckMago, setTipoDeckMago] = useState('');

    // Função para selecionar a carta
    const selecionarCarta = (carta) => {
        setCartaSelecionada(carta);
        if (carta === 'esqueleto') {
            setTipoDeckEsqueleto(carta)
            setTipoDeckGoblin('')
            setTipoDeckGuerreiro('')
            setTipoDeckMago('')
        } else if (carta === 'goblin') {
            setTipoDeckGoblin(carta)
            setTipoDeckEsqueleto('')
            setTipoDeckGuerreiro('')
            setTipoDeckMago('')
        } else if (carta === 'guerreiro') {
            setTipoDeckGuerreiro(carta)
            setTipoDeckGoblin('')
            setTipoDeckEsqueleto('')
            setTipoDeckMago('')
        } else if (carta === 'mago') {
            setTipoDeckMago(carta)
            setTipoDeckGoblin('')
            setTipoDeckEsqueleto('')
            setTipoDeckGuerreiro('')
        }
    };

    return (
        <div className='containerCaminho'>
            <div className='fundoTitulo'>
                <h1 className='titulo'>Escolha seu caminho</h1>
            </div>

            <div className='caminhos'>
                <div className='caminhosDeck'>
                    <img
                        className={`cartas ${cartaSelecionada === 'esqueleto' ? 'selecionada' : ''}`}
                        src="./src/assets/images/DeckEsqueleto.png"
                        alt="Deck Esqueleto"
                        onClick={() => selecionarCarta('esqueleto')}
                    />
                    <p className={`textoCarta ${tipoDeckEsqueleto ? 'selecionado' : ''}`}>{tipoDeckEsqueleto.toUpperCase()}</p>
                </div>

                <div className='caminhosDeck'>
                    <img
                        className={`cartas ${cartaSelecionada === 'goblin' ? 'selecionada' : ''}`}
                        src="./src/assets/images/DeckGoblin.png"
                        alt="Deck Goblin"
                        onClick={() => selecionarCarta('goblin')}
                    />
                    <p className={`textoCarta ${tipoDeckGoblin ? 'selecionado' : ''}`}>{tipoDeckGoblin.toUpperCase()}</p>
                </div>

                <div className='caminhosDeck'>
                    <img
                        className={`cartas ${cartaSelecionada === 'guerreiro' ? 'selecionada' : ''}`}
                        src="./src/assets/images/DeckGuerreiro.png"
                        alt="Deck Guerreiro"
                        onClick={() => selecionarCarta('guerreiro')}
                    />
                    <p className={`textoCarta ${tipoDeckGuerreiro ? 'selecionado' : ''}`}>{tipoDeckGuerreiro.toUpperCase()}</p>
                </div>

                <div className='caminhosDeck'>
                    <img
                        className={`cartas ${cartaSelecionada === 'mago' ? 'selecionada' : ''}`}
                        src="./src/assets/images/DeckMago.png"
                        alt="Deck Mago"
                        onClick={() => selecionarCarta('mago')}
                    />
                    <p className={`textoCarta ${tipoDeckMago ? 'selecionado' : ''}`}>{tipoDeckMago.toUpperCase()}</p>
                </div>
            </div>

            <div className='divBotao'>
                <button
                    className='botaoComecar'
                    onClick={() => navigate('/batalhas')}
                    disabled={!cartaSelecionada} // Desabilita o botão se nenhuma carta for selecionada
                >
                    Começar!
                </button>
            </div>
        </div>
    );
}

export default Caminho;
