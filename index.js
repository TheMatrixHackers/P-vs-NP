document.addEventListener('DOMContentLoaded', function() {
    const settingsIcon = document.getElementById('settings-icon');
    const socialIcons = document.querySelector('.social-icons');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    let hideTimeout;
    let isRotated = false;

    // Initial animation on page load
    setTimeout(() => {
        isRotated = true;
        settingsIcon.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(45deg)`;
        socialIcons.classList.add('show');

        // Hide after 10 seconds
        hideTimeout = setTimeout(() => {
            socialIcons.classList.remove('show');
            isRotated = false;
            settingsIcon.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(0deg)`;
        }, 10000);
    }, 2000); // Small delay to ensure smooth animation

    settingsIcon.addEventListener('mousedown', function(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        if (e.target === settingsIcon || settingsIcon.contains(e.target)) {
            isDragging = true;
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            const rotation = isRotated ? 45 : 0;
            settingsIcon.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // Click handler for showing/hiding social icons
    settingsIcon.addEventListener('click', function(e) {
        if (!isDragging) {
            // Clear any existing timeout
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }

            // Show the icons and rotate settings icon
            socialIcons.classList.add('show');
            isRotated = true;
            settingsIcon.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(45deg)`;

            // Set timeout to hide after 10 seconds
            hideTimeout = setTimeout(() => {
                socialIcons.classList.remove('show');
                isRotated = false;
                settingsIcon.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(0deg)`;
            }, 10000);
        }
    });

    // Initial position without rotation
    settingsIcon.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(0deg)`;
});