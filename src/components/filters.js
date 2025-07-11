import data from '../data/data.json';

const getAllUniqueIngredients = () => {
    const uniqueIngredients = new Set();
    data.forEach(recipe => {
        recipe.ingredients.forEach(item => {
            uniqueIngredients.add(item.ingredient.toLowerCase());
        });
    });
    return Array.from(uniqueIngredients).sort();
};

const getAllUniqueUstensils = () => {
    const uniqueUstensils = new Set();
    data.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            uniqueUstensils.add(ustensil.toLowerCase());
        });
    });
    return Array.from(uniqueUstensils).sort();
};

const getAllUniqueAppliances = () => {
    const uniqueAppliances = new Set();
    data.forEach(recipe => {
        uniqueAppliances.add(recipe.appliance.toLowerCase());
    });
    return Array.from(uniqueAppliances).sort();
};

export const getFilterOptions = () => {
    const ingredients = getAllUniqueIngredients();
    const ustensils = getAllUniqueUstensils();
    const appliances = getAllUniqueAppliances();

    return {
        ingredients,
        ustensils,
        appliances
    };
};

const createFilterSelect = (filterType, options) => {
    // Convertir le type de filtre pour l'affichage (ex: "ingredients" -> "Ingrédients")
    const displayType = filterType.charAt(0).toUpperCase() + filterType.slice(1);

    let optionsHtml = '';
    options.forEach(option => {
        optionsHtml += `<option value="${option}" class ="option-value">${option.charAt(0).toUpperCase() + option.slice(1)}</option>`;
    });

    return `
        <div class="relative inline-block text-left mr-4">
            <label for="${filterType}-select" class="sr-only">${displayType}</label>
            <select id="${filterType}-select" class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
               <option value="" class="option-value" >${displayType}</option> ${optionsHtml}
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
    `;
};

export const filters = () => {
    const allOptions = getFilterOptions(); // Obtenez toutes les options de filtre
    const totalRecipesCount = data.length; // Nombre total de recettes

    return `
         <div class="flex flex-col">
              <div class="flex items-center justify-between mb-4">
                  <div class="flex flex-wrap gap-4"> ${createFilterSelect('ingredients', allOptions.ingredients)}
                    ${createFilterSelect('appliances', allOptions.appliances)}
                    ${createFilterSelect('ustensils', allOptions.ustensils)}
                  </div>
                  <h4 class="text-2xl font-bold">${totalRecipesCount} recettes</h4>
              </div>

              <div class="recipes-container mt-8">
                  <p>Construction des cartes de recette.</p>
              </div>
         </div>
    `;
};
