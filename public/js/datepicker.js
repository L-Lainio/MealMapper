document.addEventListener('DOMContentLoaded', function () {
    // Get reference to the datepicker input and the "Get Tracker" button
    const datepicker = document.getElementById('datepicker');
    const getTrackerBtn = document.getElementById('getTrackerBtn');

    // Event listener for the "Get Tracker" button click
    getTrackerBtn.addEventListener('click', function () {
        const selectedDate = datepicker.value; // Get the selected date from the datepicker

        // Make a request to fetch the tracker data for the selected date
        fetch(`../../models/tracker?date=${selectedDate}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch tracker data');
                }
                return response.json();
            })
            .then(data => {
                // Process the tracker data
                console.log('Tracker data for selected date:', data);
                // Handle the retrieved data as needed, such as displaying it on the page
            })
            .catch(error => {
                console.error('Error fetching tracker data:', error);
            });
    });
});