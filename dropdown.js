document.addEventListener('DOMContentLoaded', function () {
    const userProfileDropdown = document.querySelector('.dropdown');

    // Add a click event listener to the user profile button
    document.querySelector('.dropdown-toggle').addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent the dropdown from closing immediately
        userProfileDropdown.classList.toggle('show');
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', function (event) {
        if (!event.target.matches('.dropdown-toggle')) {
            const dropdowns = document.getElementsByClassName('dropdown-content');
            for (const dropdown of dropdowns) {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            }
        }
    });
});
