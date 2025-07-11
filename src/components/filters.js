import data from '../data/data.json'; // Assuming data.json is in the same directory or adjust path as needed

const getAllUniqueIngredients = () => {
    const uniqueIngredients = new Set();
    data.forEach(recipe => {
        recipe.ingredients.forEach(item => {
            uniqueIngredients.add(item.ingredient.charAt(0).toUpperCase() + item.ingredient.slice(1));
        });
    });
    return Array.from(uniqueIngredients).sort();
};

const getAllUniqueUstensils = () => {
    const uniqueUstensils = new Set();
    data.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            uniqueUstensils.add(ustensil.charAt(0).toUpperCase() + ustensil.slice(1));
        });
    });
    return Array.from(uniqueUstensils).sort();
};

const getAllUniqueAppliances = () => {
    const uniqueAppliances = new Set();
    data.forEach(recipe => {
        uniqueAppliances.add(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1));
    });
    return Array.from(uniqueAppliances).sort();
};

export const getFilterOptions = () => {
    const ingredients = getAllUniqueIngredients();
    const appliances = getAllUniqueAppliances();
    const ustensils = getAllUniqueUstensils();

    return {
        ingredients,
        appliances,
        ustensils
    };
};

const createFilterSelect = (filterType, options) => {
    const displayType = filterType.charAt(0).toUpperCase() + filterType.slice(1);

    return `
        <div class="font-[Manrope] relative inline-block text-left z-10 w-48 mr-4 mb-4 md:mb-0">
            <button type="button" class="inline-flex justify-between items-center w-full rounded-lg shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 h-14 transition-all duration-300" id="menu-button-${filterType}" aria-expanded="false" aria-haspopup="true">
                ${displayType}
                <svg class="ml-2 h-5 w-5 transition-transform duration-300 transform" id="chevron-${filterType}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"  aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>

            <div class="origin-top-left absolute left-0 w-full rounded-b-lg shadow-lg bg-white focus:outline-none overflow-hidden transition-all duration-300 ease-in-out opacity-0 max-h-0" role="menu" aria-orientation="vertical" aria-labelledby="menu-button-${filterType}" tabindex="-1" id="dropdown-${filterType}">
                <div class="mt-1" role="none">
                    <div class="relative px-4 py-2">
                        <input type="text" placeholder="Rechercher un ${displayType.toLowerCase()}..." class="block w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" role="searchbox" aria-label="Rechercher un ${displayType.toLowerCase()}">
                        <div class="absolute inset-y-0 left-3 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div class="max-h-60 overflow-y-auto mt-2">
                        ${options.map(option => `
                            <a href="#" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabindex="-1" data-value="${option}">${option}</a>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
};

export const filters = () => {
    const allOptions = getFilterOptions();

    return `        
          <div class="flex md:flex-row md:items-center md:justify-between mb-4 w-full pr-4 pl-4">
              <div class="flex flex-wrap gap-4">
                ${createFilterSelect('ingredients', allOptions.ingredients)}
                ${createFilterSelect('appareils', allOptions.appliances)}
                ${createFilterSelect('ustensiles', allOptions.ustensils)}
              </div>
              <h4 class="text-xl text-black min-w-[150px] text-right">1500 recettes</h4>
          </div>
    `;
};

document.addEventListener('DOMContentLoaded', () => {
    const filterTypes = ['ingredients', 'appareils', 'ustensiles'];

    filterTypes.forEach(filterType => {
        const button = document.getElementById(`menu-button-${filterType}`);
        const dropdown = document.getElementById(`dropdown-${filterType}`);
        const chevron = document.getElementById(`chevron-${filterType}`);
        const searchInput = dropdown ? dropdown.querySelector('input[type="text"]') : null;
        const optionsContainer = dropdown ? dropdown.querySelector('.max-h-60') : null;

        if (button && dropdown && chevron) {
            button.classList.add('rounded-lg');

            const resetDropdown = (targetButton, targetDropdown, targetChevron, targetSearchInput, targetOptionsContainer) => {
                targetDropdown.classList.remove('max-h-[300px]', 'opacity-100');
                targetDropdown.classList.add('max-h-0', 'opacity-0');
                targetChevron.classList.remove('rotate-180'); // Point down
                targetButton.setAttribute('aria-expanded', 'false');

                // Reset button and dropdown rounding
                targetButton.classList.remove('rounded-t-lg', 'rounded-b-none');
                targetButton.classList.add('rounded-lg');
                targetDropdown.classList.remove('rounded-t-none', 'ring-opacity-5');
                targetDropdown.classList.add('rounded-b-lg', 'ring-opacity-0'); // Re-hide ring top part

                // Clear search input and reset options visibility
                if (targetSearchInput) {
                    targetSearchInput.value = '';
                }
                if (targetOptionsContainer) {
                    Array.from(targetOptionsContainer.children).forEach(option => {
                        option.style.display = 'block'; // Show all options
                    });
                }
            };

            button.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent document click from closing immediately
                button.classList.add('rounded-lg');

                const isOpen = dropdown.classList.contains('max-h-[300px]'); // Check current state based on max-height

                // Hide other dropdowns and reset their chevrons
                filterTypes.forEach(otherFilterType => {
                    if (otherFilterType !== filterType) {
                        const otherDropdown = document.getElementById(`dropdown-${otherFilterType}`);
                        const otherChevron = document.getElementById(`chevron-${otherFilterType}`);
                        if (otherDropdown && otherChevron) {
                            otherDropdown.classList.remove('max-h-[300px]', 'opacity-100');
                            otherDropdown.classList.add('max-h-0', 'opacity-0');
                            otherChevron.classList.remove('rotate-180'); // Point down
                            button.setAttribute('aria-expanded', 'false');
                        }
                    }
                });

                // Toggle the current dropdown
                if (isOpen) {
                    resetDropdown(button, dropdown, chevron, searchInput, optionsContainer);
                } else {
                    // Open dropdown
                    dropdown.classList.remove('max-h-0', 'opacity-0');
                    dropdown.classList.add('max-h-[300px]', 'opacity-100');
                    chevron.classList.add('rotate-180');
                    button.setAttribute('aria-expanded', 'true');

                    // Apply open state rounding
                    button.classList.remove('rounded-lg');
                    button.classList.add('rounded-t-lg', 'rounded-b-none');
                    dropdown.classList.remove('rounded-b-lg');
                    dropdown.classList.add('rounded-t-none');

                    if (searchInput) {
                        searchInput.focus(); // Focus on search input when opened
                    }
                }
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (event) => {
                if (dropdown.classList.contains('max-h-[300px]') && !button.contains(event.target) && !dropdown.contains(event.target)) {
                    resetDropdown(button, dropdown, chevron, searchInput, optionsContainer);
                }
            });

            // Search functionality
            if (searchInput && optionsContainer) {
                searchInput.addEventListener('input', (event) => {
                    const searchTerm = event.target.value.toLowerCase();
                    Array.from(optionsContainer.children).forEach(option => {
                        const optionText = option.textContent.toLowerCase();
                        if (optionText.includes(searchTerm)) {
                            option.style.display = 'block';
                        } else {
                            option.style.display = 'none';
                        }
                    });
                });
            }

            // Handle option selection (you'll likely want to add actual filtering logic here)
            if (optionsContainer) {
                optionsContainer.addEventListener('click', (event) => {
                    const selectedOption = event.target.closest('a');
                    if (selectedOption && selectedOption.dataset.value) {
                        console.log(`Selected ${filterType}: ${selectedOption.dataset.value}`);
                        resetDropdown(button, dropdown, chevron, searchInput, optionsContainer);
                    }
                });
            }
        }
    });
});