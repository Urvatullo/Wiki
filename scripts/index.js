document.addEventListener('DOMContentLoaded', function () {
    const infoButtons = document.querySelectorAll('.info-btn');

    infoButtons.forEach(button => {
        button.addEventListener('click', function () {
            const infoText = this.nextElementSibling;
            infoText.style.display = infoText.style.display === 'block' ? 'none' : 'block';
        });
    });

    const findButton = document.getElementById('findButton');
    const browseButton = document.getElementById('browseButton');
    const searchNameInput = document.getElementById('searchName');
    const categorySelect = document.getElementById('categorySelect');
    const countrySelect = document.getElementById('countrySelect');
    const organizationsList = document.getElementById('organizationsList');
    const newsRow = document.getElementById('newsRow');
    const articlesRow = document.getElementById('articlesRow');

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

            item.style.display = (nameMatches && categoryMatches && countryMatches) ? '' : 'none';
        });
    }

    async function fetchContent(url, targetElement) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            // Log the fetched data to verify it's being retrieved correctly
            console.log('Fetched Data:', data);

            data.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('content-item');

                const title = document.createElement('h4');
                title.textContent = item.title;

                const description = document.createElement('p');
                description.textContent = item.description;

                const link = document.createElement('a');
                link.textContent = 'Read more';
                link.href = item.url;
                link.target = '_blank';

                div.appendChild(title);
                div.appendChild(description);
                div.appendChild(link);

                targetElement.appendChild(div);
            });
        } catch (error) {
            console.error('Error fetching content:', error);
        }
    }

    fetchContent('https://cors-anywhere.herokuapp.com/https://zakyatbot.ru/getnews', newsRow);
    fetchContent('data/articles.json', articlesRow);

    findButton.addEventListener('click', filterOrganizations);
    browseButton.addEventListener('click', filterOrganizations);
});
