document.addEventListener('DOMContentLoaded', function () {
    let checkedRecipes = []; // Array to store checked recipes
    let pageTarget = null;
    let searchResultsMap = {}; // Dictionary to store search results by recipe ID

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault();

        // Get form inputs
        const ingredientKeywords = document.getElementById('ingredientKeywords').value.trim();
        const minCalInput = document.getElementById('minCalories');
        const maxCalInput = document.getElementById('maxCalories');
        const minProInput = document.getElementById('minProtein');
        const maxProInput = document.getElementById('maxProtein');

        const minCal = minCalInput.value.trim();
        const maxCal = maxCalInput.value.trim();
        const minPro = minProInput.value.trim();
        const maxPro = maxProInput.value.trim();

        // Check if inputs are empty or null
        const calories = (minCal && maxCal) ? `${minCal}-${maxCal}` : null;
        const protein = (minPro && maxPro) ? `${minPro * 100}-${maxPro * 100}` : null;

        // Construct query parameters object
        const queryParams = {};

        if (ingredientKeywords) {
            queryParams.q = ingredientKeywords;
        }
        if (calories) {
            queryParams.calories = calories;
        }
        if (protein) {
            queryParams['nutrients[PROCNT]'] = protein;
        }

        // Convert object to query string
        const queryString = new URLSearchParams(queryParams).toString();

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'cdf8ee4cadmsh6838cb9546a4e4bp13090bjsn3df38061f747',
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        };

        // Fetch recipes from the API
        fetch(`https://tasty.p.rapidapi.com/recipes/list?${queryString}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Process the response data
                console.log('Recipe search results:', data);
                // Store search results in dictionary
                data.results.forEach(recipe => {
                    searchResultsMap[recipe.id] = recipe;
                });
                appendDataToModal(data.results);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }


    // Function to handle recipe card click
    function handleRecipeCardClick(recipe) {
        // Open the recipe details modal
        const recipeDetailsModal = document.getElementById('recipe-details-modal');
        openModal(recipeDetailsModal);

        // Populate the modal with recipe details
        const recipeDetailsContent = document.getElementById('recipe-details-content');
        recipeDetailsContent.innerHTML = ''; // Clear previous content

        // Create elements to display recipe details
        const recipeName = document.createElement('h2');
        recipeName.textContent = recipe.name;

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.thumbnail_url || 'default-image.jpg';
        recipeImage.alt = recipe.name;

        const recipeIngredients = document.createElement('p');
        if (recipe.ingredients && recipe.ingredients.length > 0) {
            recipeIngredients.textContent = `Ingredients: ${recipe.ingredients.join(', ')}`;
        } else {
            recipeIngredients.textContent = 'Ingredients not available';
        }

        const recipeInstructions = document.createElement('p');
        recipeInstructions.textContent = 'Instructions:';
        recipe.instructions.forEach(instruction => {
            const instructionText = document.createElement('p');
            instructionText.textContent = instruction.display_text;
            recipeInstructions.appendChild(instructionText);
        });

        // Append elements to modal content
        recipeDetailsContent.appendChild(recipeName);
        recipeDetailsContent.appendChild(recipeImage);
        recipeDetailsContent.appendChild(recipeIngredients);
        recipeDetailsContent.appendChild(recipeInstructions);

        // Create a close button
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', function () {
            closeModal(recipeDetailsModal);
        });
        recipeDetailsContent.appendChild(closeButton);

        // Create a button to append the recipe to the page
        const addButton = document.createElement('button');
        addButton.textContent = 'Add Recipe';
        addButton.addEventListener('click', function () {
            appendRecipeToPage(recipe);
            closeModal(recipeDetailsModal);
        });
        recipeDetailsContent.appendChild(addButton);
    }

    checkedRecipes = []; // Array to store checked recipes
    pageTarget = null;

    // Function to handle checkbox change
    function handleCheckboxChange(event) {
        const checkbox = event.target;
        const recipeId = parseInt(checkbox.value);

        if (checkbox.checked) {
            // Find the recipe in the searchResultsMap
            const recipe = searchResultsMap[recipeId];
            if (recipe && !checkedRecipes.some(r => r.id === recipeId)) {
                // Add recipe to the checkedRecipes array
                checkedRecipes.push(recipe);
            }
        } else {
            // Remove recipe from the checkedRecipes array
            checkedRecipes = checkedRecipes.filter(r => r.id !== recipeId);
        }
    }

    // Function to append recipe to the page
function appendRecipeToPage(recipe) {
    if (!pageTarget) return; // Ensure page target is set
    const targetSection = document.getElementById(pageTarget);
    const recipeInfoContainer = targetSection.querySelector('.recipe-info-container');
    const recipeItem = document.createElement('div');
    recipeItem.className = 'recipe-item';
    recipeItem.textContent = recipe.name;

    // Create the recipe image element
    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.thumbnail_url || 'default-image.jpg';
    recipeImage.alt = recipe.name;

    // Set smaller dimensions for the recipe image
    recipeImage.style.width = '100px'; // Adjust the width as needed
    recipeImage.style.height = '100px'; // Adjust the height as needed

    // Event listener for image click to open the recipe modal
    recipeImage.addEventListener('click', function () {
        handleRecipeCardClick(recipe); // Call the function to open the modal
    });

    recipeItem.appendChild(recipeImage);
    recipeInfoContainer.appendChild(recipeItem);
}

    // Function to append all selected recipes to the page
    function appendSelectedRecipes() {
        checkedRecipes.forEach(recipe => {
            appendRecipeToPage(recipe);
        });
        // Clear the checked recipes array
        checkedRecipes = [];
    }

    // Function to append data to the modal's search-results container
    function appendDataToModal(recipes) {
        const searchResultsContainer = document.getElementById('search-results');
        searchResultsContainer.innerHTML = ''; // Clear previous results

        recipes.forEach(recipe => {
            const item = document.createElement('div');
            item.className = 'search-result-item';

            // Create a checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'recipe-checkbox';
            checkbox.value = recipe.id; // Set a value for the checkbox, like recipe ID
            checkbox.id = `recipe-${recipe.id}`; // Set a unique ID for each checkbox

            const img = document.createElement('img');
        img.src = recipe.thumbnail_url || 'default-image.jpg'; // Use a default image if none is available
        img.alt = recipe.name;
        img.addEventListener('click', function() {
            handleRecipeCardClick(recipe); // Call handleRecipeCardClick function when the image is clicked
        });

            const name = document.createElement('p');
            name.textContent = recipe.name;

            checkbox.addEventListener('change', handleCheckboxChange);

            item.appendChild(checkbox); // Append the checkbox to the item
            item.appendChild(img);
            item.appendChild(name);
            searchResultsContainer.appendChild(item);
        });
    }

    // Add submit event listener to the form
    document.getElementById('search-form').addEventListener('submit', handleSubmit);

    // Function to append all selected recipes to the page
    function appendSelectedRecipes() {
        checkedRecipes.forEach(recipe => {
            appendRecipeToPage(recipe);
        });
        // Clear the checked recipes array
        checkedRecipes = [];
    }

    // Add click event listener to all buttons with class "btn"
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
        btn.addEventListener('click', function () {
            const newTargetSectionId = this.getAttribute('data-target');
            // Check if the target section ID is valid
            const validSections = ['breakfast', 'lunch', 'dinner', 'snacks'];
            if (validSections.includes(newTargetSectionId)) {
                console.log('Target section ID:', newTargetSectionId);
                // Update the value only if it's valid
                pageTarget = newTargetSectionId;
            } else {
                console.log('Invalid target section ID:', newTargetSectionId);
                // Handle invalid target section ID here
            }
        });
    });

    // Add submit event listener to the form
    document.getElementById('search-form').addEventListener('submit', handleSubmit);

        // Add change event listener to all checkboxes with class "recipe-checkbox"
        document.querySelectorAll('.recipe-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxChange);
        });

        // Add click event listener to the add food button
    document.getElementById('add-food-btn').addEventListener('click', appendSelectedRecipes);
});
