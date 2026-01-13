const getComputerChoice = () => {
  const random = Math.floor(Math.random() * 3);
  if (random === 0) return 'rock';
  if (random === 1) return 'paper';
  return 'scissors';
};

const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) return 'tie';

  if (userChoice === 'rock') {
    return computerChoice === 'paper' ? 'computer' : 'user';
  }

  if (userChoice === 'paper') {
    return computerChoice === 'scissors' ? 'computer' : 'user';
  }

  if (userChoice === 'scissors') {
    return computerChoice === 'rock' ? 'computer' : 'user';
  }
};
