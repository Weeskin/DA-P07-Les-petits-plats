import backgroundHeaderImage from '../assets/background/header-background.jpg';
import {searchingBar} from '../components/searchingBar.js';

export const header = () => {
    return `
        <header class="relative bg-cover bg-center h-auto flex items-center flex-col p-6 bg-blend-luminosity " style="background-image: url('${backgroundHeaderImage}');">
            <div class="absolute opacity-20 inset-0 bg-black bg-blend-luminosity"></div>
            <div class="relative z-10 flex items-center w-full h-4 px-4">
                <img class="h-5" src="/logo_Les_petits_plats.png" alt="Logo du site Les petits plats"> 
                <img src="/favicon.png" alt="Petit logo du site les petites plats" class="w-5 h-5 ml-2">
            </div>
            <div class="relative z-10 w-full justify-center items-center flex flex-col mt-40 h-66">
                <h1 class="text-yellow-200 text-4xl/12 font-bold text-center">CHERCHEZ PARMI PLUS DE 1500 RECETTES</br>DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES</h1>         
                ${searchingBar()}
            </div>
        </header>
    `;
}