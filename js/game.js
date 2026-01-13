const CHOICES=['rock','paper','scissors'];
const getComputerChoice=()=>CHOICES[Math.floor(Math.random()*CHOICES.length)];
const determineWinner=(u,c)=>{
  if(u===c) return 'tie';
  if(u==='rock') return c==='paper'?'computer':'user';
  if(u==='paper') return c==='scissors'?'computer':'user';
  if(u==='scissors') return c==='rock'?'computer':'user';
  return 'tie';
};
const prettyChoicePT=(x)=>x==='rock'?'Pedra':x==='paper'?'Papel':x==='scissors'?'Tesoura':'—';
const choiceEmoji=(x)=>x==='rock'?'🪨':x==='paper'?'📄':x==='scissors'?'✂️':'❔';

