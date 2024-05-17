document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('ingredient-search-modal');
    var closeModalSpan = document.querySelector('.close-modal');
    var searchInput = document.getElementById('query');
    const ingredientButtons = document.querySelectorAll('.ingredient-btn');

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        // Clear modal content when closing
        clearModalContent();
        clearSearchInput(); // Clear search input value
    }

    function clearModalContent() {
        // Clear content of modal elements
        clearSearchResults();
        clearFoodDetails();
        clearAmountInput();
        clearNutrientResults();
    }

    function clearSearchInput() {
        searchInput.value = ''; // Clear search input value
    }

    // Event listener for ingredient buttons
    ingredientButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetSectionId = this.getAttribute('data-target');
            openModal(targetSectionId);
        });
    });

    window.addEventListener('click', function (e) {
        if (e.target == modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    closeModalSpan.addEventListener('click', closeModal);
});
