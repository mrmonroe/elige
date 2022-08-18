import './style.css';
import { Game } from './Game';

declare global {
  interface Window {
    game: Game;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  
<div id='game'></div>
  
`;

