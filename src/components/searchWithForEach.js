import data from '../data/data.json'
import { renderCards } from './cards.js'

export const setupSearchWithForEach = () => {
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

        // Mesure du temps de recherche
        const startTime = performance.now();

        const filteredRecipes = [];

        data.forEach(recipe => {
            let matchFound = false;

            // Recherche dans le nom de la recette
            if (recipe.name.toLowerCase().includes(searchTerm)) {
                matchFound = true;
            }

            // Recherche dans la description de la recette
            if (!matchFound && recipe.description.toLowerCase().includes(searchTerm)) {
                matchFound = true;
            }

            // Recherche dans les ingrédients
            if (!matchFound) {
                recipe.ingredients.forEach(ingredientsArray => {
                    if (ingredientsArray.ingredient.toLowerCase().includes(searchTerm)) {
                        matchFound = true;
                    }
                });
            }

            // Recherche dans l'appareil
            if (!matchFound && recipe.appliance.toLowerCase().includes(searchTerm)) {
                matchFound = true;
            }

            // Recherche dans les ustensiles
            if (!matchFound) {
                recipe.ustensils.forEach(ustensil => {
                    if (ustensil.toLowerCase().includes(searchTerm)) {
                        matchFound = true;
                    }
                });
            }

            // Si une correspondance est trouvée, ajoute la recette au tableau filtré
            if (matchFound) {
                filteredRecipes.push(recipe);
            }
        });

        //Mesure du temps de recherche
        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2); // Arrondi à 2 décimales

        console.log(`Recherche avec For Loop - Terme: "${searchTerm}" - Temps: ${duration} ms`);

        renderCards(filteredRecipes); // Affiche les recettes filtrées
    };

    // Appel initial pour afficher toutes les cartes lorsque le module de recherche est configuré
    renderCards(data);
};