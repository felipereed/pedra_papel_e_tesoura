const choiceButtons = document.querySelectorAll('.choice-btn');
const rulesBtn = document.getElementById('rulesBtn');
const closeRulesBtn = document.getElementById('closeRules');

choiceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const userChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);

    if (winner === 'tie') {
      updateResult('Empate!');
    } else if (winner === 'user') {
      updateResult('Você venceu!');
    } else {
      updateResult('O computador venceu!');
    }
  });
});

rulesBtn.addEventListener('click', openRules);
closeRulesBtn.addEventListener('click', closeRules);
overlay.addEventListener('click', closeRules);
