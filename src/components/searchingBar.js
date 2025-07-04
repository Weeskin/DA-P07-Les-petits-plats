export const searchingBar = () => {
    return `
        <form class="relative w-2/3 max-w-6xl mt-6 mb-30" id="search-form">
            <input type="text" id="search-input" placeholder="Rechercher une recette, un ingredient..." class="w-full p-2 bg-white rounded-md h-14 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <button type="submit" class="absolute right-1 top-1/10 bg-slate-900 text-white p-2 rounded-md justify-center items-center hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10.4219" r="9.5" stroke="white"/>
                    <line x1="18.3536" y1="19.0683" x2="27.3536" y2="28.0683" stroke="white"/>
                </svg>
            </button>
        </form>
    `;
}