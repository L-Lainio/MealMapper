// Function to open modal
function openModal(modal) {
    modal.style.display = 'block';
}

// Function to close modal
function closeModal(modal) {
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    // Get the modals
    const foodModal = document.getElementById('food-modal');
    const datepickerModal = document.getElementById('datepicker-modal');

    // Get the buttons that open the modals
    const openFoodModalBtns = document.querySelectorAll('.btn');
    const openDatepickerModalBtn = document.getElementById('open-datepicker-btn');

    // Get the close buttons
    const closeButtons = document.querySelectorAll('.close');

    // Function to set targetSectionId globally
    function setTargetSectionId(newId) {
        targetSectionId = newId;
    }

    // Event listener for open food modal buttons
    openFoodModalBtns.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation(); // Stop the event from propagating
            targetSectionId = this.getAttribute('data-target');
            setTargetSectionId(this.getAttribute('data-target')); // Update targetSectionId
            openModal(foodModal);
        });
    });

    // Event listener for open datepicker modal button
    openDatepickerModalBtn.addEventListener('click', function () {
        openModal(datepickerModal);
    });

    // Event listeners for close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            closeModal(this.closest('.modal'));
        });
    });

    // Event listeners to close modals when clicking outside the modal
    window.addEventListener('click', function (event) {
        if (event.target === foodModal || event.target === datepickerModal) {
            closeModal(event.target);
        }
    });

    // Event listener to prevent modal from closing when clicking inside the modal content
    foodModal.querySelector('.modal-content').addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent click event from bubbling up to the window
    });

    datepickerModal.querySelector('.modal-content').addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent click event from bubbling up to the window
    });
});

