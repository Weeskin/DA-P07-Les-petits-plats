import data from '../data/data.json';
import { renderCards } from './cards.js';

export const setupSearchWithForLoop = () => {
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');

    if (!searchInput || !searchForm) {
        console.error('Éléments de recherche non trouvés dans le DOM.');
        return;
    }

    let searchTimeout;

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        clearTimeout(searchTimeout);
        performSearch();
    });

    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch();
        }, 500);
    });

    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm.length < 3) {
            renderCards(data);
            return;
        }

        const filteredRecipes = [];

        // Boucle For simple pour itérer sur les recettes
        for (let i = 0; i < data.length; i++) {
            const recipe = data[i];
            let matchFound = false;

            // Recherche dans le nom de la recette
            if (recipe.name.toLowerCase().includes(searchTerm)) {
                matchFound = true;
            }

            // Recherche dans la description de la recette
            if (!matchFound && recipe.description.toLowerCase().includes(searchTerm)) {
                matchFound = true;
            }

            // Recherche dans les ingrédients avec une boucle For simple
            if (!matchFound) {
                for (let j = 0; j < recipe.ingredients.length; j++) {
                    const ingredientItem = recipe.ingredients[j];
                    if (ingredientItem.ingredient.toLowerCase().includes(searchTerm)) {
                        matchFound = true;
                        break; // Sortir de la boucle des ingrédients dès qu'une correspondance est trouvée
                    }
                }
            }

            // Recherche dans l'appareil
            if (!matchFound && recipe.appliance.toLowerCase().includes(searchTerm)) {
                matchFound = true;
            }

            // Recherche dans les ustensiles avec une boucle For simple
            if (!matchFound) {
                for (let k = 0; k < recipe.ustensils.length; k++) {
                    const ustensil = recipe.ustensils[k];
                    if (ustensil.toLowerCase().includes(searchTerm)) {
                        matchFound = true;
                        break; // Sortir de la boucle des ustensiles dès qu'une correspondance est trouvée
                    }
                }
            }

            // Si une correspondance est trouvée, ajoute la recette au tableau filtré
            if (matchFound) {
                filteredRecipes.push(recipe);
            }
        }

        renderCards(filteredRecipes); // Affiche les recettes filtrées
    };

    // Appel initial pour afficher toutes les cartes lorsque le module de recherche est configuré
    renderCards(data);
};