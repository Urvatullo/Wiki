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

    function displayNews(data) {
        console.log('Displaying news:', data);
        newsRow.innerHTML = '';
        data.forEach(newsItem => {
            const div = document.createElement('div');
            div.classList.add('content-item');
    
            const title = document.createElement('h4');
            title.textContent = newsItem.title;
    
            const description = document.createElement('p');
            description.textContent = newsItem.description;
    
            const link = document.createElement('a');
            link.textContent = 'Read more';
            link.href = newsItem.url;
            link.target = '_blank';
    
            div.appendChild(title);
            div.appendChild(description);
            div.appendChild(link);
    
            newsRow.appendChild(div);
        });
    }
    
    fetch('https://zakyatbot.ru/getnews')
        .then(response => {
            console.log('Fetch response:', response);
            return response.json();
        })
        .then(data => displayNews(data))
        .catch(error => console.error('Error fetching news:', error));

    function displayArticles(data) {
        articlesRow.innerHTML = '';
        data.forEach(article => {
            const div = document.createElement('div');
            div.classList.add('content-item');

            const title = document.createElement('h4');
            title.textContent = article.title;

            const description = document.createElement('p');
            description.textContent = article.description;

            const link = document.createElement('a');
            link.textContent = 'Read more';
            link.href = article.url;
            link.target = '_blank';

            div.appendChild(title);
            div.appendChild(description);
            div.appendChild(link);

            articlesRow.appendChild(div);
        });
    }

    fetch('data/articles.json')
        .then(response => response.json())
        .then(data => displayArticles(data))
        .catch(error => console.error('Error fetching articles:', error));

    findButton.addEventListener('click', filterOrganizations);
    browseButton.addEventListener('click', filterOrganizations);
});
