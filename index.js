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
});
