import './style.css';
import { Game } from './Game';

declare global {
  interface Window {
    game: Game;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
  console.dir(window.game);
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  
<div id='game'></div>
  
`;

