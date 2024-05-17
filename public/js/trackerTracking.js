function saveMeals() {
    const date = new Date().toISOString(); // Get the current date

    // Initialize an array to store recipe data
    const recipesData = [];

    // Retrieve all recipe cards
    const recipeCards = document.querySelectorAll('.recipe-item');

    // Iterate over each recipe card
    recipeCards.forEach(recipeCard => {
        // Retrieve recipe data from the dataset of the card
        const recipe = JSON.parse(recipeCard.dataset.recipe); // Parse the JSON string

        const recipeData = {
            section: recipeCard.closest('section').id, // Get the section ID from the closest section element
            name: recipe.name,
            nutrition: recipe.nutrition,
            instructions: recipe.instructions,
            thumbnail: recipe.thumbnail_url
            // Add more properties as needed, accessing them from the dataset
        };

        // Push the recipe data to the array
        recipesData.push(recipeData);
    });

    // Send the recipesData array to the backend server
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: date,
            recipes: recipesData
        })
    };

    fetch('/api/save-recipes', requestOptions) // Update the URL to match your backend endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save meals');
            }
            return response.json();
        })
        .then(data => {
            console.log('Meals saved successfully:', data);
        })
        .catch(error => {
            console.error('Error saving meals:', error);
        });
}

// Add event listener to the button that triggers the saveMeals function
document.addEventListener('DOMContentLoaded', function () {
    const saveMealsButton = document.querySelector('.tracker-save-btn');
    if (saveMealsButton) {
        saveMealsButton.addEventListener('click', saveMeals);
    }
});
