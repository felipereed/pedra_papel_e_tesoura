const $=(s)=>document.querySelector(s);
const els={
  userScore:$('#userScore'),cpuScore:$('#cpuScore'),
  wins:$('#wins'),ties:$('#ties'),losses:$('#losses'),
  roundNum:$('#roundNum'),progressFill:$('#progressFill'),progressPct:$('#progressPct'),
  userPick:$('#userPick'),cpuPick:$('#cpuPick'),
  resultTitle:$('#resultTitle'),resultSubtitle:$('#resultSubtitle'),
  historyList:$('#historyList'),
  endBanner:$('#endBanner'),endTitle:$('#endTitle'),endSubtitle:$('#endSubtitle'),
  rulesBtn:$('#rulesBtn'),resetBtn:$('#resetBtn'),
  modal:$('#rulesModal'),overlay:$('#modalOverlay'),
  closeRulesBtn:$('#closeRulesBtn'),closeRulesBtn2:$('#closeRulesBtn2'),
};
const setPick=(pill,choice)=>{
  pill.querySelector('.choice-emoji').textContent=choiceEmoji(choice);
  pill.querySelector('.choice-text').textContent=prettyChoicePT(choice);
  pill.style.transform='scale(1.02)'; setTimeout(()=>pill.style.transform='scale(1)',140);
};
const setResult=(title,subtitle='')=>{
  els.resultTitle.textContent=title; els.resultSubtitle.textContent=subtitle;
  const box=els.resultTitle.closest('.result'); box.classList.remove('pulse'); void box.offsetWidth; box.classList.add('pulse');
};
const setScores=({userScore,cpuScore,wins,ties,losses})=>{
  els.userScore.textContent=userScore; els.cpuScore.textContent=cpuScore;
  els.wins.textContent=wins; els.ties.textContent=ties; els.losses.textContent=losses;
};
const setRound=(round,maxRounds)=>{
  els.roundNum.textContent=String(Math.min(round,maxRounds));
  const pct=Math.max(0,Math.min(100,Math.round(((round-1)/maxRounds)*100)));
  els.progressFill.style.width=pct+'%'; els.progressPct.textContent=pct+'%';
};
const clearHistory=()=>els.historyList.innerHTML='<li class="history-item muted">Ainda nada por aqui…</li>';
const addHistoryItem=({round,userChoice,computerChoice,winner})=>{
  if(els.historyList.querySelector('.muted')) els.historyList.innerHTML='';
  const li=document.createElement('li'); li.className='history-item';
  const left=document.createElement('div'); left.className='history-left';
  const a=document.createElement('span'); a.className='pill'; a.textContent=`#${round}`;
  const b=document.createElement('span'); b.className='pill';
  b.textContent=`${choiceEmoji(userChoice)} ${prettyChoicePT(userChoice)}  •  ${choiceEmoji(computerChoice)} ${prettyChoicePT(computerChoice)}`;
  left.append(a,b);
  const out=document.createElement('span');
  out.className='pill '+(winner==='user'?'win':winner==='computer'?'lose':'tie');
  out.textContent=winner==='user'?'Vitória':winner==='computer'?'Derrota':'Empate';
  li.append(left,out); els.historyList.prepend(li);
};
const setGameEnded=(ended,title='',subtitle='')=>{
  els.endBanner.hidden=!ended;
  if(ended){ els.endTitle.textContent=title||'Fim de jogo!'; els.endSubtitle.textContent=subtitle||'Clique em Reiniciar para jogar de novo.'; }
};
const setButtonsEnabled=(enabled)=>document.querySelectorAll('.choice-btn').forEach(b=>b.disabled=!enabled);

let lastFocused=null;
const openRules=()=>{
  lastFocused=document.activeElement;
  els.overlay.hidden=false; els.modal.hidden=false;
  els.overlay.classList.add('show'); els.modal.classList.add('show');
  document.body.classList.add('modal-open'); els.closeRulesBtn.focus();
};
const closeRules=()=>{
  els.overlay.classList.remove('show'); els.modal.classList.remove('show');
  document.body.classList.remove('modal-open');
  setTimeout(()=>{ els.overlay.hidden=true; els.modal.hidden=true; if(lastFocused) lastFocused.focus(); },200);
};
const wireModal=()=>{
  els.rulesBtn.addEventListener('click',openRules);
  els.closeRulesBtn.addEventListener('click',closeRules);
  els.closeRulesBtn2.addEventListener('click',closeRules);
  els.overlay.addEventListener('click',closeRules);
  document.addEventListener('keydown',(e)=>{ if(e.key==='Escape' && !els.modal.hidden) closeRules(); });
};