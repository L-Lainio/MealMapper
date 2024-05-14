document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('food-search-form');
    const queryInput = document.getElementById('query');
    const searchResults = document.getElementById('search-results');
    const foodDetails = document.getElementById('food-details');
    const amountInput = document.getElementById('amount');
    const nutrientResults = document.getElementById('nutrient-results');
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

    document.getElementById('calculate').addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        if (selectedFood && amount) {
            const servingSize = selectedFood.serving_size_g;
            const factor = amount / servingSize;
            nutrientResults.innerHTML = `
                <h4>Nutrients for ${amount} g of ${selectedFood.name}</h4>
                <p>Calories: ${(selectedFood.calories * factor).toFixed(2)}</p>
                <p>Carbs: ${(selectedFood.carbohydrates_total_g * factor).toFixed(2)} g</p>
                <p>Fats: ${(selectedFood.fat_total_g * factor).toFixed(2)} g</p>
                <p>Sugars: ${(selectedFood.sugar_g * factor).toFixed(2)} g</p>
                <p>Protein: ${(selectedFood.protein_g * factor).toFixed(2)} g</p>
            `;
        } else {
            nutrientResults.innerHTML = '<p>Please select a food and enter a valid amount.</p>';
        }
    });
});
