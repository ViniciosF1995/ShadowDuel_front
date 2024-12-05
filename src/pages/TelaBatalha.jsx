import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'; // Importa o react-modal
import './TelaBatalha.css';

Modal.setAppElement('#root'); // Define o root do aplicativo para acessibilidade

function TelaBatalha() {

    const navigate = useNavigate();

    const [slotCarta1, setSlotCarta1] = useState(null);
    const [slotCarta2, setSlotCarta2] = useState(null);
    const [slotCarta3, setSlotCarta3] = useState(null);
    const [slotCarta4, setSlotCarta4] = useState(null);
    const [slotCarta5, setSlotCarta5] = useState(null);
    const [slotCarta6, setSlotCarta6] = useState(null);

    const [cartasJogador, setCartasJogador] = useState([]);
    const [cartasOponente, setCartasOponente] = useState([]);
    const [deckJogador, setDeckJogador] = useState([]);
    const [deckOponente, setDeckOponente] = useState([]);
    const [informacaoBatalha, setInformacaoBatalha] = useState("");

    const [turno, setTurno] = useState(''); // Indica o turno atual (jogador ou oponente)
    const [rodada, setRodada] = useState(1);
    const [corTurno , setCorTurno ] = useState(turno);
    const [pontosJogador, setPontosJogador] = useState(0);
    const [pontosOponente, setPontosOponente] = useState(0);

    const [modalAberto, setModalAberto] = useState(false); // Controla o estado do modal
    const [mensagemVencedor, setMensagemVencedor] = useState(''); // Mensagem que será exibida no modal

    const [cartaJogadorInfo, setCartaJogadorInfo] = useState(null);
    const [cartaHover, setCartaHover] = useState(null);
    const cartasOriginaisJogador = [
        { id: 1, deckId: 1, imagem: "./src/assets/images/Carta de esqueleto 1.png", nome: "Guardião Esqueleto", descricao: "Destruidor", atk: 85, def: 70 },
        { id: 2, deckId: 1, imagem: "./src/assets/images/Carta de esqueleto 2.png", nome: "Horda de Esqueleto", descricao: "Usa espada", atk: 55, def: 45 },
        { id: 3, deckId: 1, imagem: "./src/assets/images/Carta de esqueleto 3.png", nome: "Valquíria Ossífera", descricao: "é verde", atk: 90, def: 80},
        { id: 4, deckId: 1, imagem: "./src/assets/images/Carta de esqueleto 4.png", nome: "Esqueleto Gladiador", descricao: "Usa arco", atk: 70, def: 60 },
        { id: 5, deckId: 1, imagem: "./src/assets/images/Carta de esqueleto 5.png", nome: "Senhor da Morte", descricao: "protege", atk: 95, def: 80 }
    ];

    const cartasOriginaisOponente = [
        { id: 1, deckId: 1, imagem: "./src/assets/images/Carta de goblin 1.png", nome: "Horda de Goblins", descricao: "osso", atk: 65, def: 30 },
        { id: 2, deckId: 1, imagem: "./src/assets/images/Carta de goblin 2.png", nome: "Xamã Goblin", descricao: "7 cabeças", atk: 40, def: 45 },
        { id: 3, deckId: 1, imagem: "./src/assets/images/Carta de goblin 3.png", nome: "Goblin Feiticeiro", descricao: "torre", atk: 70, def: 35 },
        { id: 4, deckId: 1, imagem: "./src/assets/images/Carta de goblin 4.png", nome: "Goblin Arqueiro", descricao: "é cinza", atk: 65, def: 20 },
        { id: 5, deckId: 1, imagem: "./src/assets/images/Carta de goblin 5.png", nome: "Mercenario Goblin", descricao: "late", atk: 80, def: 50 }
    ];

     // Verifica o vencedor quando os pontos de alguém chegam a 3
     useEffect(() => {
        if (pontosJogador === 3) {
            setMensagemVencedor('Parabéns! Você venceu!');
            setModalAberto(true); // Abre o modal
        } else if (pontosOponente === 3) {
            setMensagemVencedor('Que pena! O oponente venceu!');
            setModalAberto(true); // Abre o modal
        }

        if (turno === 'jogador') {
            setCorTurno('blue')
            console.log('aqui')
        }else if (turno === 'oponente') {
            setCorTurno('red')
            console.log('dali')
        }
    }, [pontosJogador, pontosOponente, turno]);

    const sairJogo = () => {
        setModalAberto(false);
        navigate('/batalhas')

    };

    // Função para fechar o modal
    const reiniciarJogo = () => {
        setModalAberto(false);
        window.location.reload(); // Reinicia o jogo ao fechar o modal
    };

    const slideIn = useSpring({
        transform: modalAberto ? 'translateX(0)' : 'translateX(100%)',
        opacity: modalAberto ? 1 : 0,
        config: { tension: 300, friction: 30 },
    });

    // Função para embaralhar as cartas
    const embaralharCartas = (cartas) => {
        return cartas.sort(() => Math.random() - 0.5);
    };

    // Inicializa o jogo ao carregar a página
    useEffect(() => {
        const cartasEmbaralhadasJogador = embaralharCartas([...cartasOriginaisJogador]);
        const cartasEmbaralhadasOponente = embaralharCartas([...cartasOriginaisOponente]);
        
        setCartasJogador(cartasEmbaralhadasJogador.slice(0, 3)); // Mão do jogador com 3 cartas
        setDeckJogador(cartasEmbaralhadasJogador.slice(3)); // Restante no deck

        setCartasOponente(cartasEmbaralhadasOponente.slice(0, 3)); // Mão do oponente com 3 cartas
        setDeckOponente(cartasEmbaralhadasOponente.slice(3)); // Restante no deck

        // Sorteia quem começa
        const quemComeca = Math.random() < 0.5 ? 'jogador' : 'oponente';
        setTurno(quemComeca);
    }, []);

    // Lógica para alternar entre turnos e rodadas
    const proximoTurno = () => {
        setTurno(turno === 'jogador' ? 'oponente' : 'jogador');
        setRodada(rodada + 1);
        console.log(corTurno)
        comprarCartaJogador();
    };

   // Função para o jogador arrastar uma carta
   const aoArrastar = (e, carta) => {
    e.dataTransfer.setData('carta', JSON.stringify(carta));
    setCartaJogadorInfo(JSON.parse(e.dataTransfer.getData('carta')))
};


// Função para o jogador soltar uma carta em um dos slots
const aoSoltar = (e, slot) => {
    if (turno !== 'jogador') return;

    let cartaJogador = null

    try {
        // Verifica se a carta foi realmente arrastada e se o dado existe
        const cartaData = e.dataTransfer.getData('carta');
        if (cartaData) {

            cartaJogador = (JSON.parse(cartaData)); // Tenta fazer o parse do JSON
            
        }
    } catch (error) {
        console.error("Erro ao tentar analisar a carta:", error);
        return; // Se houver erro no parse, não continua a execução
    }


    let cartaOponente = null;

    if (slot === 'slot4') {
        cartaOponente = slotCarta4;
    } else if (slot === 'slot5') {
        cartaOponente = slotCarta5;
    } else if (slot === 'slot6') {
        cartaOponente = slotCarta6;
    }

     // Coloca a carta no slot correspondente
     if (slot === 'slot1' && !slotCarta1) {
        setSlotCarta1(cartaJogador);
    } else if (slot === 'slot2' && !slotCarta2) {
        setSlotCarta2(cartaJogador);
    } else if (slot === 'slot3' && !slotCarta3) {
        setSlotCarta3(cartaJogador);
    }

    if (cartaOponente) {
        // Comparar as cartas e destruir a carta com menor poder
        compararCartas(cartaJogadorInfo, cartaOponente, slot);
        proximoTurno()
    }

    setCartasJogador(cartasJogador.filter((c) => c.id !== cartaJogador.id)); // Remove a carta da mão do jogador
    proximoTurno();
};

const compararCartas = (cartaJogador, cartaOponente, slot) => {
    // Verificar se as cartas são válidas e se os atributos necessários existem
    if (!cartaJogador || !cartaOponente) {
        console.error('Uma das cartas é inválida:', 'Carta Jogador:', cartaJogador, 'Carta Oponente:', cartaOponente);
        return;
    }

    // Verificar se a carta do jogador tem a propriedade 'atk' e a carta do oponente tem a propriedade 'def'
    if (cartaJogador.atk === undefined || cartaOponente.def === undefined) {
        console.error('Valores de atributos inválidos - cartaJogador:', cartaJogador, 'cartaOponente:', cartaOponente);
        return;
    }

    let mensagemBatalha
    if (turno === 'jogador'){

        mensagemBatalha = `A carta ${cartaJogador.nome} do jogador atacou a carta ${cartaOponente.nome} do oponente.`;

        if (cartaJogador.atk > cartaOponente.def) {
            // O jogador venceu a comparação, destrói a carta do oponente
            destruirCartaOponente(cartaOponente, slot);
            setPontosJogador(pontosJogador + 1);
            
            mensagemBatalha += ` Destruindo a carta ${cartaOponente.nome} do oponente.`;
        } else if (cartaJogador.atk < cartaOponente.def) {
            // O oponente venceu a comparação, destrói a carta do jogador
            destruirCartaJogador(cartaJogador, slot);
            setPontosOponente(pontosOponente + 1);
            mensagemBatalha += ` Mas a carta não foi destruida`;
        } else {
            mensagemBatalha += ` A batalha terminou em empate, nenhuma carta foi destruída.`;
        }
    }else {

        mensagemBatalha = `A carta ${cartaOponente.nome} do oponente atacou a carta ${cartaJogador.nome} do jogador.`;

        if (cartaOponente.atk > cartaJogador.def) {
            // O jogador venceu a comparação, destrói a carta do oponente
            destruirCartaOponente(cartaJogador, slot);
            setPontosOponente(pontosOponente + 1);
            mensagemBatalha += ` Mas a carta não foi destruida`;
            
        } else if (cartaOponente.atk < cartaJogador.def) {
            // O oponente venceu a comparação, destrói a carta do jogador
            destruirCartaJogador(cartaOponente, slot);
            setPontosJogador(pontosJogador + 1);
           
             mensagemBatalha += ` Destruindo a carta ${cartaJogador.nome} do oponente.`;
        } else {
            mensagemBatalha += ` A batalha terminou em empate, nenhuma carta foi destruída.`;
        }
    }

  

    // Atualiza a informação da batalha com os detalhes
    setInformacaoBatalha(mensagemBatalha);
};


// Função para destruir a carta do oponente
const destruirCartaOponente = (cartaOponente, slot) => {
    if (slot === 'slot4') {
        setSlotCarta4(null);
    } else if (slot === 'slot5') {
        setSlotCarta5(null);
    } else if (slot === 'slot6') {
        setSlotCarta6(null);
    }
    console.log(`A carta ${cartaOponente.nome} do jogador no slot ${slot} foi destruída.`);
   
}
// Função para destruir a carta do jogador
const destruirCartaJogador = (cartaJogador, slot) => {
    if (slot === 'slot1') {
        setSlotCarta1(null);
    } else if (slot === 'slot2') {
        setSlotCarta2(null);
    } else if (slot === 'slot3') {
        setSlotCarta3(null);
    }
    console.log(`A carta ${cartaJogador.nome} do oponente no slot ${slot} foi destruída.`);
    
};

    // Modifique a função jogadaOponente para incluir o ataque
const jogadaOponente = () => {
    if (turno === 'oponente') {
        const carta = cartasOponente[0];

        const slotAleatorio = Math.floor(Math.random() * 3) + 4;

        if (slotAleatorio === 4 && !slotCarta4) {
            setSlotCarta4(carta);
        } else if (slotAleatorio === 5 && !slotCarta5) {
            setSlotCarta5(carta);
        } else if (slotAleatorio === 6 && !slotCarta6) {
            setSlotCarta6(carta);
        } else {
            proximoTurno();
            return;
        }

        setCartasOponente(cartasOponente.slice(1));

        // O oponente faz seu ataque após jogar a carta
        setTimeout(() => ataqueOponente(), 2000);

        proximoTurno();
    }
};

  const ataqueOponente = () => {
    let cartaOponente = null;
    let cartaJogador = null;
    let slotJogador = null;

    // Encontre uma carta do oponente para atacar
    if (slotCarta4) cartaOponente = slotCarta4;
    else if (slotCarta5) cartaOponente = slotCarta5;
    else if (slotCarta6) cartaOponente = slotCarta6;

    if (!cartaOponente) {
        console.log("O oponente não tem cartas para atacar.");
        return;
    }

    // Escolha aleatoriamente um slot do jogador para atacar
    const slotAleatorio = Math.floor(Math.random() * 3) + 1;

    if (slotAleatorio === 1 && slotCarta1) {
        cartaJogador = slotCarta1;
        slotJogador = 'slot1';
    } else if (slotAleatorio === 2 && slotCarta2) {
        cartaJogador = slotCarta2;
        slotJogador = 'slot2';
    } else if (slotAleatorio === 3 && slotCarta3) {
        cartaJogador = slotCarta3;
        slotJogador = 'slot3';
    }

    if (cartaJogador) {
        // Comparar as cartas e determinar o resultado do ataque
        compararCartas(cartaJogador, cartaOponente, slotJogador);
    } else {
        console.log("O oponente tentou atacar, mas não há cartas do jogador no slot escolhido.");
    }
};


    // Lógica para o oponente comprar cartas automaticamente
    useEffect(() => {
        if (cartasOponente.length < 2 && deckOponente.length > 0) {
            const novaCarta = deckOponente[0];
            setCartasOponente([...cartasOponente, novaCarta]);
            setDeckOponente(deckOponente.slice(1));
        }
    }, [cartasOponente, deckOponente]);

    // Lógica para o jogador comprar carta
    const comprarCartaJogador = () => {
        if (cartasJogador.length <= 2 && deckJogador.length > 0) {
            const novaCarta = deckJogador[0];
            setCartasJogador([...cartasJogador, novaCarta]);
            setDeckJogador(deckJogador.slice(1));
        }
    };

    useEffect(() => {
        if (turno === 'oponente') {
            setTimeout(() => jogadaOponente(), 2000);
        }
    }, [turno]);

    return (
        <div className='containerTelaBatalha'>
          <div className='containerdeckAdversdario'>


          <div className='divDeckAdversario'>
          <img className='imgDeckOponente' src="./src/assets/images/VersoCarta.png" alt="Imagem Padrão" />
                ({deckOponente.length} cartas restantes)
          </div>

          <div className='divCartaAparece'>

              {/* Exibe a carta sobre a qual o jogador está passando o mouse */}
              {cartaHover ? (
                    <img className='imgCartaAparece' src={cartaHover.imagem} alt={cartaHover.nome} />
                ) : (
                    <img className='imgCartaDesAparece' src="./src/assets/images/LogoShadowDuel.png" alt="Imagem Padrão" />
                )}
                
          </div>

          </div>
           

            <div className='containerBatalha'>
                <div className='divMaoAdversario'>
                    {informacaoBatalha}
                </div>

                <div className='divBatalhaAdversario'>
        {/* Cartas jogadas pelo oponente */}
        <div className='divCartaBatalha'
            onDrop={(e) => aoSoltar(e, 'slot4')} 
            onDragOver={(e) => e.preventDefault()}
            onMouseEnter={() => setCartaHover(slotCarta4)} // Quando o mouse entra no slot
            onMouseLeave={() => setCartaHover(null)} // Quando o mouse sai do slot
        >
            {slotCarta4 ? <img className='imgCartaCampo' src={slotCarta4.imagem} alt={slotCarta4.nome} /> : <img className='imgSemCarta' src="./src/assets/images/LogoShadowDuel.png" alt="Imagem Padrão" />}
        </div>
        <div className='divCartaBatalha'
            onDrop={(e) => aoSoltar(e, 'slot5')} 
            onDragOver={(e) => e.preventDefault()}
            onMouseEnter={() => setCartaHover(slotCarta5)} // Quando o mouse entra no slot
            onMouseLeave={() => setCartaHover(null)} // Quando o mouse sai do slot
        >
            {slotCarta5 ? <img className='imgCartaCampo' src={slotCarta5.imagem} alt={slotCarta5.nome} /> : <img className='imgSemCarta' src="./src/assets/images/LogoShadowDuel.png" alt="Imagem Padrão" />}
        </div>
        <div className='divCartaBatalha'
            onDrop={(e) => aoSoltar(e, 'slot6')} 
            onDragOver={(e) => e.preventDefault()}
            onMouseEnter={() => setCartaHover(slotCarta6)} // Quando o mouse entra no slot
            onMouseLeave={() => setCartaHover(null)} // Quando o mouse sai do slot
        >
            {slotCarta6 ? <img className='imgCartaCampo' src={slotCarta6.imagem} alt={slotCarta6.nome} /> : <img className='imgSemCarta' src="./src/assets/images/LogoShadowDuel.png" alt="Imagem Padrão" />}
        </div>
    </div>

    <div className='divBatalhaJogador'>
        {/* Cartas jogadas pelo jogador */}
        <div className='divCartaBatalha'
            onDrop={(e) => aoSoltar(e, 'slot1')} 
            onDragOver={(e) => e.preventDefault()}
            onMouseEnter={() => setCartaHover(slotCarta1)} // Quando o mouse entra no slot
            onMouseLeave={() => setCartaHover(null)} // Quando o mouse sai do slot
        >
            {slotCarta1 ? <img className='imgCartaCampo' src={slotCarta1.imagem} alt={slotCarta1.nome} /> : <img className='imgSemCarta' src="./src/assets/images/LogoShadowDuel.png" alt="Imagem Padrão" />}
        </div>
        <div className='divCartaBatalha'
            onDrop={(e) => aoSoltar(e, 'slot2')} 
            onDragOver={(e) => e.preventDefault()}
            onMouseEnter={() => setCartaHover(slotCarta2)} // Quando o mouse entra no slot
            onMouseLeave={() => setCartaHover(null)} // Quando o mouse sai do slot
        >
            {slotCarta2 ? <img className='imgCartaCampo' src={slotCarta2.imagem} alt={slotCarta2.nome} /> : <img className='imgSemCarta' src="./src/assets/images/LogoShadowDuel.png" alt="Imagem Padrão" />}
        </div>
        <div className='divCartaBatalha'
            onDrop={(e) => aoSoltar(e, 'slot3')} 
            onDragOver={(e) => e.preventDefault()}
            onMouseEnter={() => setCartaHover(slotCarta3)} // Quando o mouse entra no slot
            onMouseLeave={() => setCartaHover(null)} // Quando o mouse sai do slot
        >
            {slotCarta3 ? <img className='imgCartaCampo' src={slotCarta3.imagem} alt={slotCarta3.nome} /> : <img className='imgSemCarta' src="./src/assets/images/LogoShadowDuel.png" alt="Imagem Padrão" />}
        </div>
    </div>

                <div className='divMaoJogador'>
                    {/* Jogador arrasta as cartas da mão */}
                    {cartasJogador.map((carta) => (
                        <div
                            key={carta.id}
                            draggable
                            onDragStart={(e) => aoArrastar(e, carta)}
                            onMouseEnter={() => setCartaHover(carta)} // Quando passar o mouse
                            onMouseLeave={() => setCartaHover(null)} // Quando sair do mouse
                        >
                            <img className='imgCartaMao' src={carta.imagem} alt={carta.nome} />
                        </div>
                    ))}
                </div>
            </div>

            <div className='containerDeckJogador'>
                {/* Deck e informações do jogador */}
                <div className='divInfoJogador'>
                    <p>Rodada: {rodada}</p>
                    <p style={{ color: corTurno }}>Turno do {turno}</p>
                
                
                </div>
                <div className='divBtnJogador'>

                    <p className='pontosOponente'>pontos do oponente: {pontosOponente}</p>


                    <p className='pontosJogador'>pontos do Jogador: {pontosJogador}</p>
                    
                    
                </div>
                <div className='divDeckJogador'>
                <img className='imgDeck' src="./src/assets/images/VersoCarta.png" alt="Imagem Padrão" />
                <p>({deckJogador.length} cartas restantes)</p>
                </div>
            </div>

              {/* Modal que será aberto quando houver um vencedor */}
              <Modal
  isOpen={modalAberto}
  onRequestClose={() => setModalAberto(false)} // Fechamento correto do modal
  contentLabel="Resultado da Batalha"
  className="modalContent"
  overlayClassName="modalOverlay"
  style={{
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      background: 'transparent',
      backgroundColor: '#D3D6CF',
      padding: 0,
      width: '99%',
      height: '99%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  }}
>
  <animated.div style={slideIn} className="slide-dialog">
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#D3D6CF', // Corrigido o backgroundColor
      }}
    >
        <div className='containerModal'>

            <div className="modalContentCima" style={{ textAlign: 'center' }}>
            <h2>{mensagemVencedor}</h2>
            </div>

            <div className="modalContentBaixo" style={{ textAlign: 'center' }}>
            <button className='btnReiniciar' onClick={reiniciarJogo}>Reiniciar Jogo</button>
            <button className='btnSair' onClick={sairJogo}>Voltar para tela de Batalha</button>
            </div>
            
        </div>
     
    </div>
  </animated.div>
</Modal>

            
        </div>
    );
}

export default TelaBatalha;

