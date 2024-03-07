

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseover', function () {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseout', function () {
            card.style.transform = 'translateY(0)';
        });
    });
});
