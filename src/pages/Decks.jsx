import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Decks.css';

function Decks() {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [cards, setCards] = useState([]);

  const decks = {
    Goblin: [
      { nome: 'Carta 1', imagem: './src/assets/images/Carta de goblin 1.png' },
      { nome: 'Carta 2', imagem: './src/assets/images/Carta de goblin 2.png' },
      { nome: 'Carta 3', imagem: './src/assets/images/Carta de goblin 3.png' },
      { nome: 'Carta 4', imagem: './src/assets/images/Carta de goblin 4.png' },
      { nome: 'Carta 5', imagem: './src/assets/images/Carta de goblin 5.png' },
    ],
    Esqueleto: [
      { nome: 'Carta 1', imagem: './src/assets/images/Carta de esqueleto 1.png' },
      { nome: 'Carta 2', imagem: './src/assets/images/Carta de esqueleto 2.png' },
      { nome: 'Carta 3', imagem: './src/assets/images/Carta de esqueleto 3.png' },
      { nome: 'Carta 4', imagem: './src/assets/images/Carta de esqueleto 4.png' },
      { nome: 'Carta 5', imagem: './src/assets/images/Carta de esqueleto 5.png' },
    ],
    Mago: [
      { nome: 'Carta 1', imagem: './src/assets/images/Carta de mago 1.png' },
      { nome: 'Carta 2', imagem: './src/assets/images/Carta de mago 2.png' },
      { nome: 'Carta 3', imagem: './src/assets/images/Carta de mago 3.png' },
      { nome: 'Carta 4', imagem: './src/assets/images/Carta de mago 4.png' },
      { nome: 'Carta 5', imagem: './src/assets/images/Carta de mago 5.png' },
    ],
    Guerreiro: [
      { nome: 'Carta 1', imagem: './src/assets/images/Carta de guerreiro 1.png' },
      { nome: 'Carta 2', imagem: './src/assets/images/Carta de guerreiro 2.png' },
      { nome: 'Carta 3', imagem: './src/assets/images/Carta de guerreiro 3.png' },
      { nome: 'Carta 4', imagem: './src/assets/images/Carta de guerreiro 4.png' },
      { nome: 'Carta 5', imagem: './src/assets/images/Carta de guerreiro 5.png' },
    ]
  };

  const handleDeckClick = (deck) => {
    setSelectedDeck(deck);
    setCards(decks[deck] || []);
  };

  return (
    <div className="containerDecks">
      <Navbar />

      <div className="principal">
        {/* Div à esquerda para os decks */}
        <div className="decks">
          <img
            onClick={() => handleDeckClick('Goblin')}
            className="DeckCartas"
            src="./src/assets/images/DeckGoblin.png"
            alt="Deck Goblin"
          />
          <img
            onClick={() => handleDeckClick('Esqueleto')}
            className="DeckCartas"
            src="./src/assets/images/DeckEsqueleto.png"
            alt="Deck Esqueleto"
          />
          <img
            onClick={() => handleDeckClick('Mago')}
            className="DeckCartas"
            src="./src/assets/images/DeckMago.png"
            alt="Deck Mago"
          />
          <img
            onClick={() => handleDeckClick('Guerreiro')}
            className="DeckCartas"
            src="./src/assets/images/DeckGuerreiro.png"
            alt="Deck Guerreiro"
          />
        </div>

        {/* Div à direita para exibir as cartas do deck selecionado */}
        <div className="aparicaoCartas">
          <h2>{selectedDeck ? `Cartas do Deck: ${selectedDeck}` : 'Selecione um Deck'}</h2>
          <div className="cardsContainer">
            {cards.map((card, index) => (
              <div key={index} className="card">
                <img src={card.imagem} alt={card.nome} className="cardImage" />
                <p>{card.nome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Decks;
