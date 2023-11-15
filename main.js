document.addEventListener("DOMContentLoaded", function () {
    const inputDay = document.querySelector('.input-day');
    const inputMonth = document.querySelector('.input-month');
    const inputYear = document.querySelector('.input-year');

    const errorDay = document.querySelector('.error-day');
    const errorMonth = document.querySelector('.error-month');
    const errorYear = document.querySelector('.error-year');

    const displayYear = document.querySelector('.display-result.year');
    const displayMonth = document.querySelector('.display-result.month');
    const displayDay = document.querySelector('.display-result.days');

    const imageContainer = document.querySelector('.image-container');

    function calculateAge() {
        const day = inputDay.value.trim();
        const month = inputMonth.value.trim();
        const year = inputYear.value.trim();
    
        // Clear previous errors and input values
        errorDay.textContent = '';
        errorMonth.textContent = '';
        errorYear.textContent = '';
        inputDay.value = '';
        inputMonth.value = '';
        inputYear.value = '';
    
        if (!day || isNaN(day) || !Number.isInteger(parseFloat(day)) || parseInt(day, 10) < 1 || parseInt(day, 10) > 31) {
            if (!day) displayError(errorDay, "This field is required");
            else displayError(errorDay, "Must be a valid day");
        }
    
        if (!month || isNaN(month) || !Number.isInteger(parseFloat(month)) || parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
            if (!month) displayError(errorMonth, "This field is required");
            else displayError(errorMonth, "Must be a valid month");
        }
    
        if (!year || isNaN(year) || !Number.isInteger(parseFloat(year)) || year.length !== 4 || parseInt(year, 10) < 1900)  {
            if (!year) displayError(errorYear, "This field is required");
            else displayError(errorYear, "Must be a valid 4-digit year");
        }
    
        if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year) || !Number.isInteger(parseFloat(day)) || !Number.isInteger(parseFloat(month)) || !Number.isInteger(parseFloat(year))) {
            return; // Stop further processing if any field is empty, invalid, or contains floats
        }
    
        // Convert to integers after empty check
        const parsedDay = parseInt(day, 10);
        const parsedMonth = parseInt(month, 10);
        const parsedYear = parseInt(year, 10);
    
        
        // Additional checks for valid ranges
        if (parsedDay < 1 || parsedDay > 31) {
            displayError(errorDay, "Must be a valid day");
            return;
        }

        if (parsedMonth < 1 || parsedMonth > 12) {
            displayError(errorMonth, "Must be a valid month");
            return;
        }

        // Calculate Age
        const currentDate = new Date();
        const inputDate = new Date(parsedYear, parsedMonth - 1, parsedDay);
        const ageInMilliseconds = currentDate - inputDate;
        const ageDate = new Date(ageInMilliseconds);
        const years = Math.abs(ageDate.getUTCFullYear() - 1970);
        const months = ageDate.getUTCMonth();
        const days = ageDate.getUTCDate() - 1;
    
        // Display Age
        displayYear.textContent = years;
        displayMonth.textContent = months;
        displayDay.textContent = days;
    }
    
    

    function displayError(element, message) {
        element.textContent = message;
    }

    // Event listener for all inputs
    [inputDay, inputMonth, inputYear].forEach(input => {
        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                calculateAge();
            }
        });
    });

    // Event listener to clear errors when focusing on input fields
    [inputDay, inputMonth, inputYear].forEach(input => {
        input.addEventListener("focus", function () {
            errorDay.textContent = '';
            errorMonth.textContent = '';
            errorYear.textContent = '';
        });
    });

    // Event listener for click on the image-container
    imageContainer.addEventListener("click", function () {
        calculateAge();
    });
    
});