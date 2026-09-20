// Map to keep track of slide indices per container
const slideshowStates = {};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all slideshow containers on page load
    const containers = document.querySelectorAll('.slideshow-container');
    
    containers.forEach(container => {
        const id = container.id;
        slideshowStates[id] = 0; // set initial index to 0
        showSlides(id, 0);
    });
});

function changeSlide(containerId, step) {
    slideshowStates[containerId] += step;
    showSlides(containerId, slideshowStates[containerId]);
}

function currentSlide(containerId, index) {
    slideshowStates[containerId] = index;
    showSlides(containerId, index);
}

function showSlides(containerId, index) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const slides = container.querySelectorAll('.slide');
    const dots = container.querySelectorAll('.dot');

    if (index >= slides.length) {
        slideshowStates[containerId] = 0;
    } 
    if (index < 0) {
        slideshowStates[containerId] = slides.length - 1;
    }

    const currentIndex = slideshowStates[containerId];

    // Hide all slides
    slides.forEach(slide => slide.style.display = "none");
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));

    // Show active slide and activate corresponding dot
    slides[currentIndex].style.display = "block";
    if (dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
    }
}

// URL Auto-fill & Form Handling Logic
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const houseParam = urlParams.get('house');
    const agentParam = urlParams.get('agent');

    // Auto-select property dropdown if passed from properties page
    if (houseParam) {
        const propertySelect = document.getElementById('propertySelect');
        if (propertySelect) {
            for (let option of propertySelect.options) {
                if (option.value.toLowerCase() === houseParam.toLowerCase()) {
                    option.selected = true;
                    break;
                }
            }
        }
    }

    // Auto-select agent dropdown if passed from agents page
    if (agentParam) {
        const agentSelect = document.getElementById('agentSelect');
        if (agentSelect) {
            for (let option of agentSelect.options) {
                if (option.value.toLowerCase() === agentParam.toLowerCase()) {
                    option.selected = true;
                    break;
                }
            }
        }
    }
});

function handleFormSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('viewingForm');
    const successMsg = document.getElementById('formSuccessMessage');

    // Display success feedback
    if (form && successMsg) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
    }
}