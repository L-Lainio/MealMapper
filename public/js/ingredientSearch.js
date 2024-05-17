document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('food-search-form');
    const queryInput = document.getElementById('query');
    const servingSizeInput = document.getElementById('serving-size');
    const apiKey = 'hWwJX5rsbjEP7YmIvAqoxw==EX3EJAltDuvRhU9r';

    // Function to fetch ingredient data from the API and display results
    async function fetchAndDisplayResults(query) {
        try {
            const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
                headers: {
                    'X-Api-Key': apiKey
                }
            });
            console.log(response);
            const data = await response.json();
            const searchResults = document.getElementById('search-results');

            // Clear previous results
            searchResults.innerHTML = '';

            // Append search results
            data.items.forEach(food => {
                const foodItem = document.createElement('div');
                foodItem.classList.add('food-item');
                foodItem.innerHTML = `
                    <h3>${food.name}</h3>
                    <p>Serving Size: ${food.serving_size_g} g</p>
                    <p>Calories: ${food.calories}</p>
                    <p>Carbs: ${food.carbohydrates_total_g} g</p>
                    <p>Fats: ${food.fat_total_g} g</p>
                    <p>Sugars: ${food.sugar_g} g</p>
                    <p>Protein: ${food.protein_g} g</p>
                `;
                searchResults.appendChild(foodItem);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Event listener for form submission
    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const query = queryInput.value.trim();
        if (query !== '') {
            await fetchAndDisplayResults(query);
        } else {
            alert('Please enter a search query.');
        }
    });

    // Event listener for serving size input
    servingSizeInput.addEventListener('input', function() {
        const servingSize = parseFloat(servingSizeInput.value);
        const foodItems = document.querySelectorAll('.food-item');
        if (!isNaN(servingSize) && servingSize !== 0) {
            foodItems.forEach(item => {
                const calories = parseFloat(item.querySelector('p:nth-child(3)').textContent.split(': ')[1]);
                const carbs = parseFloat(item.querySelector('p:nth-child(4)').textContent.split(': ')[1]);
                const fats = parseFloat(item.querySelector('p:nth-child(5)').textContent.split(': ')[1]);
                const sugars = parseFloat(item.querySelector('p:nth-child(6)').textContent.split(': ')[1]);
                const protein = parseFloat(item.querySelector('p:nth-child(7)').textContent.split(': ')[1]);

                item.querySelector('p:nth-child(3)').textContent = `Calories: ${(calories * servingSize).toFixed(2)}`;
                item.querySelector('p:nth-child(4)').textContent = `Carbs: ${(carbs * servingSize).toFixed(2)} g`;
                item.querySelector('p:nth-child(5)').textContent = `Fats: ${(fats * servingSize).toFixed(2)} g`;
                item.querySelector('p:nth-child(6)').textContent = `Sugars: ${(sugars * servingSize).toFixed(2)} g`;
                item.querySelector('p:nth-child(7)').textContent = `Protein: ${(protein * servingSize).toFixed(2)} g`;
            });
        } else {
            console.error('Invalid serving size');
        }
    });
});
