document.addEventListener('DOMContentLoaded', function () {
    const infoButtons = document.querySelectorAll('.info-btn');

    infoButtons.forEach(button => {
        button.addEventListener('click', function () {
            const infoText = this.nextElementSibling;
            if (infoText.style.display === 'block') {
                infoText.style.display = 'none';
            } else {
                infoText.style.display = 'block';
            }
        });
    });

    const findButton = document.getElementById('findButton');
    const browseButton = document.getElementById('browseButton');
    const searchNameInput = document.getElementById('searchName');
    const categorySelect = document.getElementById('categorySelect');
    const countrySelect = document.getElementById('countrySelect');
    const organizationsList = document.getElementById('organizationsList');

    function filterOrganizations() {
        const searchTerm = searchNameInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;
        const selectedCountry = countrySelect.value;

        const items = organizationsList.querySelectorAll('.content-item');

        items.forEach(item => {
            const name = item.querySelector('h4').textContent.toLowerCase();
            const category = item.getAttribute('data-category');
            const country = item.getAttribute('data-country');

            const nameMatches = !searchTerm || name.includes(searchTerm);
            const categoryMatches = !selectedCategory || category === selectedCategory;
            const countryMatches = !selectedCountry || country === selectedCountry;

            if (nameMatches && categoryMatches && countryMatches) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    findButton.addEventListener('click', filterOrganizations);
    browseButton.addEventListener('click', filterOrganizations);
});

function scrollLeft(rowId) {
    document.getElementById(rowId).scrollBy({
        left: -300,
        behavior: 'smooth'
    });
}

function scrollRight(rowId) {
    document.getElementById(rowId).scrollBy({
        left: 300,
        behavior: 'smooth'
    });
}
