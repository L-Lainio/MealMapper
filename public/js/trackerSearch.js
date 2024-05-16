// If theres time I want to consolidate this search with ingredientSearch
function clearSearchResults() {
    document.getElementById('search-results').innerHTML = '';
}

function clearFoodDetails() {
    document.getElementById('food-details').innerHTML = '';
}

function clearAmountInput() {
    document.getElementById('amount').value = '';
}

function clearNutrientResults() {
    document.getElementById('nutrient-results').innerHTML = '';
}

function clearSearchInput() {
    document.getElementById('query').value = '';
}

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('food-search-form');
    const queryInput = document.getElementById('query');
    let selectedFood = null;
    const apiKey = 'hWwJX5rsbjEP7YmIvAqoxw==EX3EJAltDuvRhU9r';

    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const query = queryInput.value;

        try {
            const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
                headers: {
                    'X-Api-Key': apiKey
                }
            });
            const data = await response.json();
            const searchResults = document.getElementById('search-results');
            const foodDetails = document.getElementById('food-details');
            const amountInput = document.getElementById('amount');
            const nutrientResults = document.getElementById('nutrient-results');

            // Clear previous results
            clearSearchResults();
            clearFoodDetails();
            clearAmountInput();
            clearNutrientResults();

            // Populate search results
            searchResults.innerHTML = data.items.map((food, index) => `
                <div data-index="${index}">
                    <h3>${food.name}</h3>
                    <p>Serving Size: ${food.serving_size_g} g</p>
                    <button class="select-food">Select</button>
                </div>
            `).join('');

            document.querySelectorAll('.select-food').forEach(button => {
                button.addEventListener('click', (event) => {
                    const index = event.target.closest('div').getAttribute('data-index');
                    selectedFood = data.items[index];
                    foodDetails.innerHTML = `
                    <h3>${selectedFood.name}</h3>
                        <p>Serving Size: ${selectedFood.serving_size_g} g</p>
                        <p>Calories: ${selectedFood.calories}</p>
                        <p>Carbs: ${selectedFood.carbohydrates_total_g} g</p>
                        <p>Fats: ${selectedFood.fat_total_g} g</p>
                        <p>Sugars: ${selectedFood.sugar_g} g</p>
                        <p>Protein: ${selectedFood.protein_g} g</p>
                    `;
                    amountInput.value = '';
                    nutrientResults.innerHTML = '';
                });
            });
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
