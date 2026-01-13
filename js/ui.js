const resultText = document.getElementById('resultText');
const modal = document.getElementById('rulesModal');
const overlay = document.getElementById('modalOverlay');

const openRules = () => {
  modal.hidden = false;
  overlay.hidden = false;
};

const closeRules = () => {
  modal.hidden = true;
  overlay.hidden = true;
};

const updateResult = (text) => {
  resultText.textContent = text;
};
