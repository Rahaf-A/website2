document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.link');
    const description = document.querySelector('.description');

    links.forEach(link => {
        link.addEventListener('mouseover', () => {
            const linkDescription = link.getAttribute('data-description');
            description.textContent = linkDescription;
            description.style.display = 'block';
        });

        link.addEventListener('mouseout', () => {
            description.style.display = 'none';
        });
    });
});
