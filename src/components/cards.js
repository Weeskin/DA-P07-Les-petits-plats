import data from '../data/data.json'

export const cards = () => {
    if (!data) {
        console.error('Aucune donnée trouvée.');
        return null;
    }

    return ` 
         <div class="font-[Manrope] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            ${data.map(item => unitCard(item)).join('')}
        </div>                  
    `;
}

const unitCard = (item) => {
    return `
        <div class="bg-white rounded-4xl shadow-lg overflow-hidden relative"> 
            <p class="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-light">${item.time}min</p> 
            <img src="${item.image}" alt="${item.name}" class="w-full h-70 object-cover">
            <div class="p-4">
                <h2 class="font-[Anton] text-xl mb-4">${item.name}</h2>
                <h3 class="text-gray-700 mb-4 uppercase text-xs tracking-wide font-bold">Recette</h3>
                <p class="text-gray-600 text-sm mb-6 line-clamp-4">${item.description}</p> 
                <h3 class=" text-gray-700 mb-4 uppercase text-xs tracking-wide font-bold">Ingrédients</h3>
                <div class="grid grid-cols-2 gap-y-2 gap-x-4 text-sm"> 
                    ${ingredientsArray(item)}
                </div>
            </div>
        </div>            
    `;
}

const ingredientsArray = (item) => {
    if (!item.ingredients || item.ingredients.length === 0) {
        return '<p class="text-gray-500">Aucun ingrédient disponible</p>';
    }

    return item.ingredients.map(ingredientItem => `
        <div>
            <p class="font-medium">${ingredientItem.ingredient}</p>
            <p class="text-gray-500">${ingredientItem.quantity ? ingredientItem.quantity : ''} ${ingredientItem.unit ? ingredientItem.unit : ''}</p>
        </div>
    `).join('');
}