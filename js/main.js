const MAX_ROUNDS=5, WINS_TO_FINISH=3;
const state={round:1,userScore:0,cpuScore:0,wins:0,ties:0,losses:0,ended:false};

const resetGame=()=>{
  Object.assign(state,{round:1,userScore:0,cpuScore:0,wins:0,ties:0,losses:0,ended:false});
  setScores(state); setRound(state.round,MAX_ROUNDS); clearHistory(); setGameEnded(false); setButtonsEnabled(true);
  els.userPick.querySelector('.choice-emoji').textContent='❔'; els.userPick.querySelector('.choice-text').textContent='—';
  els.cpuPick.querySelector('.choice-emoji').textContent='❔'; els.cpuPick.querySelector('.choice-text').textContent='—';
  setResult('Faça sua jogada 👇','Dica: reinicie quando acabar a melhor de 5.');
};

const finishIfNeeded=()=>{
  const userWon=state.userScore>=WINS_TO_FINISH;
  const cpuWon=state.cpuScore>=WINS_TO_FINISH;
  const roundsOver=state.round>MAX_ROUNDS;
  if(userWon||cpuWon||roundsOver){
    state.ended=true; setButtonsEnabled(false);
    let title='Fim de jogo!', subtitle='Clique em Reiniciar para jogar de novo.';
    if(userWon){ title='Você ganhou a melhor de 5! 🏆'; subtitle=`Placar final: Você ${state.userScore} × ${state.cpuScore} Computador.`; }
    else if(cpuWon){ title='O computador venceu a melhor de 5 😅'; subtitle=`Placar final: Você ${state.userScore} × ${state.cpuScore} Computador.`; }
    else{
      title = state.userScore>state.cpuScore ? 'Você venceu por pontos! 🏁' :
              state.cpuScore>state.userScore ? 'Computador venceu por pontos 🏁' :
              'Match empatado 🧊';
      subtitle=`Placar final: Você ${state.userScore} × ${state.cpuScore} Computador.`;
    }
    setGameEnded(true,title,subtitle);
    return true;
  }
  return false;
};

const playRound=(userChoice)=>{
  if(state.ended) return;
  const computerChoice=getComputerChoice();
  const winner=determineWinner(userChoice,computerChoice);

  setPick(els.userPick,userChoice);
  setPick(els.cpuPick,computerChoice);

  if(winner==='tie'){ state.ties++; setResult('Empate!',`${prettyChoicePT(userChoice)} vs ${prettyChoicePT(computerChoice)} — ninguém pontua.`); }
  else if(winner==='user'){ state.userScore++; state.wins++; setResult('Você venceu! ✅',`${prettyChoicePT(userChoice)} vence ${prettyChoicePT(computerChoice)}.`); }
  else{ state.cpuScore++; state.losses++; setResult('Computador venceu! ❌',`${prettyChoicePT(computerChoice)} vence ${prettyChoicePT(userChoice)}.`); }

  addHistoryItem({round:state.round,userChoice,computerChoice,winner});
  setScores(state);

  state.round++; setRound(state.round,MAX_ROUNDS);
  finishIfNeeded();
};

const wireGame=()=>{
  document.querySelectorAll('.choice-btn').forEach(btn=>btn.addEventListener('click',()=>playRound(btn.dataset.choice)));
  els.resetBtn.addEventListener('click',resetGame);
};

document.addEventListener('DOMContentLoaded',()=>{ wireModal(); wireGame(); resetGame(); });