document.addEventListener('DOMContentLoaded', function () {
    // Function to open modal
    function openModal(modal) {
        modal.style.display = 'block';
    }

    // Function to close modal
    function closeModal(modal) {
        modal.style.display = 'none';
        clearModalContent(modal); // Clear content of the modal when closing
    }

    // Function to clear modal content
    function clearModalContent(modal) {
        if (modal.id === 'ingredient-search-modal') {
            clearSearchResults();
            clearFoodDetails();
            clearAmountInput();
            clearNutrientResults();
            clearSearchInput();
        }
        // Add similar clearing functions for other modals if needed
    }

    function clearSearchInput() {
        const searchInput = document.getElementById('query');
        if (searchInput) {
            searchInput.value = ''; // Clear search input value
        }
    }

    // Dummy functions for clearing modal content
    function clearSearchResults() {
        const searchResults = document.getElementById('ingredient-results');
        if (searchResults) searchResults.innerHTML = '';
    }

    function clearFoodDetails() {
        const foodDetails = document.getElementById('ingredient-food-details');
        if (foodDetails) foodDetails.innerHTML = '';
    }

    function clearAmountInput() {
        const amountInput = document.getElementById('serving-size');
        if (amountInput) amountInput.value = '';
    }

    function clearNutrientResults() {
        const nutrientResults = document.getElementById('ingredient-nutrient-results');
        if (nutrientResults) nutrientResults.innerHTML = '';
    }

    // Get all modals
    const modals = document.querySelectorAll('.modal');

    // Get the buttons that open the modals
    const openModalButtons = {
        foodModal: document.querySelectorAll('.recipe-btn'),
        ingredientSearchModal: document.querySelectorAll('.ingredient-btn'),
        datepickerModal: [document.getElementById('open-datepicker-btn')],
    };

    // Attach event listeners to open modal buttons
    for (const [modalId, buttons] of Object.entries(openModalButtons)) {
        const modal = document.getElementById(modalId);
        if (modal) {
            buttons.forEach(button => {
                if (button) {
                    button.addEventListener('click', function () {
                        openModal(modal);
                    });
                }
            });
        }
    }

    // Get the close buttons
    const closeButtons = document.querySelectorAll('.close, .close-modal');

    // Attach event listeners to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Event listener to close modals when clicking outside the modal content
    window.addEventListener('click', function (event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Event listener to close modals when pressing the Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                closeModal(modal);
            });
        }
    });

    // Prevent modal from closing when clicking inside the modal content
    document.querySelectorAll('.modal-content').forEach(modalContent => {
        modalContent.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });
});
