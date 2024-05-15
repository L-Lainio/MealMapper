document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('search-modal');
    var closeModalSpan = document.querySelector('.close-modal');

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    document.querySelectorAll('.open-modal-btn').forEach(button => {
        button.addEventListener('click', event => {
            const day = event.target.getAttribute('data-day');
            modal.setAttribute('data-day', day);
            openModal();
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

    document.getElementById('add-meal').addEventListener('click', function () {
        const day = modal.getAttribute('data-day');
        const mealDetails = document.getElementById('food-details').innerHTML;
        if (mealDetails) {
            document.getElementById(`${day}-meals`).innerHTML += `<div>${mealDetails}</div>`;
        }
        closeModal();
    });

    document.getElementById('save-meal-plan').addEventListener('click', async () => {
        const mealPlan = {
            sunday: document.getElementById('sunday-meals').innerHTML,
            monday: document.getElementById('monday-meals').innerHTML,
            tuesday: document.getElementById('tuesday-meals').innerHTML,
            wednesday: document.getElementById('wednesday-meals').innerHTML,
            thursday: document.getElementById('thursday-meals').innerHTML,
            friday: document.getElementById('friday-meals').innerHTML,
            saturday: document.getElementById('saturday-meals').innerHTML
        };

        try {
            const response = await fetch('/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mealPlan)
            });
            const result = await response.json();
            if (result.success) {
                alert('Meal plan saved successfully!');
            } else {
                alert('Error saving meal plan: ' + result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
