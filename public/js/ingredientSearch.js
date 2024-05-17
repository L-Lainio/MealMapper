document.addEventListener('DOMContentLoaded', function () {
    // Define a variable to store the last selected food item
    let selectedFoodItem = null;

    const searchForm = document.getElementById('food-search-form');
    const queryInput = document.getElementById('query');
    const servingSizeInput = document.getElementById('serving-size');
    const calculateButton = document.getElementById('calculate');
    const appendButton = document.getElementById('ingredient-append');
    const apiKey = 'hWwJX5rsbjEP7YmIvAqoxw==EX3EJAltDuvRhU9r';
    const ingredientList = document.getElementById('ingredient-list');

    // Function to fetch ingredient data from the API and display results
    async function fetchAndDisplayResults(query) {
        try {
            const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
                headers: {
                    'X-Api-Key': apiKey
                }
            });
            const data = await response.json();
            const searchResults = document.getElementById('ingredient-results');

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

            // Add event listeners to the food items for selecting
            const foodItems = document.querySelectorAll('.food-item');
            foodItems.forEach(foodItem => {
                foodItem.addEventListener('click', function() {
                    // Remove 'selected' class from previously selected item, if any
                    if (selectedFoodItem) {
                        selectedFoodItem.classList.remove('selected');
                    }
                    // Set this item as the selected item
                    selectedFoodItem = this;
                    selectedFoodItem.classList.add('selected');
                });
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to recalculate nutrient values based on serving size
    function recalculateNutrients(servingSize, foodItem) {
        const nutrients = {
            calories: parseFloat(foodItem.querySelector('p:nth-child(3)').textContent.split(': ')[1]),
            carbs: parseFloat(foodItem.querySelector('p:nth-child(4)').textContent.split(': ')[1]),
            fats: parseFloat(foodItem.querySelector('p:nth-child(5)').textContent.split(': ')[1]),
            sugars: parseFloat(foodItem.querySelector('p:nth-child(6)').textContent.split(': ')[1]),
            protein: parseFloat(foodItem.querySelector('p:nth-child(7)').textContent.split(': ')[1])
        };

        foodItem.querySelector('p:nth-child(2)').textContent = `Serving Size: ${servingSize.toFixed(2)} g`;
        foodItem.querySelector('p:nth-child(3)').textContent = `Calories: ${(nutrients.calories * servingSize / 100).toFixed(2)}`;
        foodItem.querySelector('p:nth-child(4)').textContent = `Carbs: ${(nutrients.carbs * servingSize / 100).toFixed(2)} g`;
        foodItem.querySelector('p:nth-child(5)').textContent = `Fats: ${(nutrients.fats * servingSize / 100).toFixed(2)} g`;
        foodItem.querySelector('p:nth-child(6)').textContent = `Sugars: ${(nutrients.sugars * servingSize / 100).toFixed(2)} g`;
        foodItem.querySelector('p:nth-child(7)').textContent = `Protein: ${(nutrients.protein * servingSize / 100).toFixed(2)} g`;
    }

// Function to append food information to a target section
function appendFoodInformation(food) {
    // Create a div to contain the food information
    const foodItemClone = food.cloneNode(true); // Clone the selected food item
    foodItemClone.classList.remove('selected'); // Remove the 'selected' class
    const targetSectionId = food.getAttribute('data-target'); // Get the target section ID
    const targetSection = document.getElementById(targetSectionId); // Get the target section
    targetSection.appendChild(foodItemClone); // Append the cloned food item to the target section
}

// Event listener for form submission
searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const query = queryInput.value.trim();
    if (query !== '') {
        await fetchAndDisplayResults(query);
        $('#ingredient-search-modal').modal('show');
    } else {
        alert('Please enter a search query.');
    }
});

// Event listener for calculate button
calculateButton.addEventListener('click', function() {
    const servingSize = parseFloat(servingSizeInput.value);
    const foodItems = document.querySelectorAll('.food-item');
    if (!isNaN(servingSize) && servingSize !== 0) {
        foodItems.forEach(foodItem => {
            recalculateNutrients(servingSize, foodItem);
        });
    } else {
        console.error('Invalid serving size');
    }
});

    // Event listener for the append button
    appendButton.addEventListener('click', function() {
        if (selectedFoodItem) {
            appendFoodInformation(selectedFoodItem); // Append the selected food item to the target section
        } else {
            console.error('No food item selected.');
        }
    });

    // Event listeners for opening modals
    document.querySelectorAll('.ingredient-btn').forEach(button => {
        button.addEventListener('click', () => {
            $('#ingredient-search-modal').modal('show');
        });
    });

    // Event listener for closing modals
    document.querySelectorAll('.close-modal').forEach(closeButton => {
        closeButton.addEventListener('click', () => {
            $('.modal').modal('hide');
        });
    });
});
