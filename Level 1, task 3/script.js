// Dropdown: Change background color
document.getElementById('colorSelect').addEventListener('change', function() {
    document.body.style.backgroundColor = this.value || '#f9f9f9';
});

// Modal: Open and close
const modal = document.getElementById('modal');
document.getElementById('openModalBtn').onclick = function() {
    modal.style.display = 'block';
};
document.getElementById('closeModalBtn').onclick = function() {
    modal.style.display = 'none';
};
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Accordion
const accordions = document.getElementsByClassName('accordion');
for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener('click', function() {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }
    });
}

// Counter
let counter = 0;
const counterValue = document.getElementById('counterValue');
document.getElementById('incrementBtn').onclick = function() {
    counter++;
    counterValue.textContent = counter;
};
document.getElementById('decrementBtn').onclick = function() {
    counter--;
    counterValue.textContent = counter;
};

// Image Preview
document.getElementById('imgInput').addEventListener('change', function(event) {
    const preview = document.getElementById('preview');
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
});

// Toggle Switch (Light/Dark Mode)
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-mode');
        themeLabel.textContent = 'Dark Mode';
    } else {
        document.body.classList.remove('dark-mode');
        themeLabel.textContent = 'Light Mode';
    }
});

// Form: Validate inputs
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('formMessage');

    if (name.length < 2) {
        message.textContent = 'Name must be at least 2 characters.';
        message.style.color = 'red';
        return;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        message.textContent = 'Please enter a valid email address.';
        message.style.color = 'red';
        return;
    }
    message.style.color = 'green';
    message.textContent = 'Form submitted successfully!';
    this.reset();
    setTimeout(() => {
        message.textContent = '';
        message.style.color = 'red';
    }, 2000);
});