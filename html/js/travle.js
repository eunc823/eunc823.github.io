const imageContainers = document.querySelectorAll('.image-container');

imageContainers.forEach(container => {
    const image = container.querySelector('.image');
    const caption = container.querySelector('.caption');

    image.addEventListener('mouseover', () => {
        caption.style.display = 'block';
        image.style.transform = 'scale(1.1)';
    });

    image.addEventListener('mouseout', () => {
        caption.style.display = 'none';
        image.style.transform = 'scale(1)';
    });
});