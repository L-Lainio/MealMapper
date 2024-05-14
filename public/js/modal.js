document.addEventListener('DOMContentLoaded', function () {
    // Get modal element
    var modal = document.getElementById('search-modal');

    // Get buttons that opens the modal
    var breakfastBtn = document.getElementById('breakfast-search-btn');
    var lunchBtn = document.getElementById('lunch-search-btn');
    var dinnerBtn = document.getElementById('dinner-search-btn');
    var snacksBtn = document.getElementById('snacks-search-btn');

    // Function to open the modal
    function openModal() {
        modal.style.display = 'block';
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Listen for click on buttons and open modal accordingly
    breakfastBtn.addEventListener('click', openModal);
    lunchBtn.addEventListener('click', openModal);
    dinnerBtn.addEventListener('click', openModal);
    snacksBtn.addEventListener('click', openModal);

    // Close modal when clicked outside of the modal content
    window.addEventListener('click', function (e) {
        if (e.target == modal) {
            closeModal();
        }
    });

    // Close modal when the escape key is pressed
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
