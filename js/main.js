// Star rating elements
let stars = document.getElementsByClassName("star");
let output = document.getElementById("output");

// Function to update rating and apply filter
function gfg(n) {
    remove();  // Reset all stars
    let cls = "";  // Define CSS class for selected rating
    
    // Apply color class based on rating
    if (n === 1) cls = "one";
    else if (n === 2) cls = "two";
    else if (n === 3) cls = "three";
    else if (n === 4) cls = "four";
    else if (n === 5) cls = "five";
    
    for (let i = 0; i < n; i++) {
        stars[i].classList.add(cls);
    }
    
    output.innerText = `Rating is: ${n}/5`;
    
    // Save selected rating in local storage
    localStorage.setItem('selectedRating', n);
    filterByRating(n);
}

// Reset styling for all stars
function remove() {
    Array.from(stars).forEach(star => {
        star.className = "star";  // Reset to base star class
    });
}

// Filter products by selected star rating
function filterByRating(rating) {
    const products = document.querySelectorAll('.product-item');
    products.forEach(product => {
        const productRating = parseInt(product.getAttribute('data-rating'), 10);
        product.style.display = productRating >= rating ? 'block' : 'none';
    });
}

// Apply saved rating on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedRating = parseInt(localStorage.getItem('selectedRating'), 10);
    if (savedRating) {
        gfg(savedRating);  // Apply saved rating filter
    }
});

// Form Validation Function
function validateForm() {
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    const email = emailField.value;
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address.');
        emailField.focus();
        return false;
    }

    if (password.length < 8) {
        showAlert('Password must be at least 8 characters long.');
        passwordField.focus();
        return false;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match.');
        confirmPasswordField.focus();
        return false;
    }

    showAlert('Form submitted successfully!', 'success');
    return true;
}

// Show Alert Function (Reusable)
function showAlert(message, type = 'error') {
    const alertBox = document.getElementById('errorMessage');
    alertBox.textContent = message;
    alertBox.style.color = type === 'success' ? 'green' : 'red';

    setTimeout(() => {
        alertBox.textContent = '';
    }, 3000);
}

// Theme toggle button and event listener
const themeToggle = document.getElementById('theme-toggle');

// Check and apply saved theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    themeToggle.textContent = savedTheme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode';
});

// Toggle theme and save preference
themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    themeToggle.textContent = isDark ? 'Switch to Day Mode' : 'Switch to Night Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});



// Event listener for form submission
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            form.submit();
        }
    });
}

// Popup subscription/contact form
const popup = document.getElementById('popup');
const openPopupButton = document.getElementById('open-popup');
const closePopupButton = document.getElementById('close-popup');

// Open popup when the button is clicked
if (openPopupButton && closePopupButton && popup) {
    openPopupButton.addEventListener('click', () => {
        popup.classList.remove('hidden');
        popup.classList.add('fade-in');
    });

    // Close popup when the close button is clicked
    closePopupButton.addEventListener('click', () => {
        popup.classList.add('fade-out');
        setTimeout(() => {
            popup.classList.remove('fade-in');
            popup.classList.remove('fade-out');
            popup.classList.add('hidden');
        }, 300);
    });

    // Close popup if the user clicks outside the form
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.add('fade-out');
            setTimeout(() => {
                popup.classList.add('hidden');
                popup.classList.remove('fade-in');
                popup.classList.remove('fade-out');
            }, 300);
        }
    });
}

// Change background color
const changeColorButton = document.getElementById('change-color');
let lastColor = '';
if (changeColorButton) {
    changeColorButton.addEventListener('click', () => {
        const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff'];
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        while (randomColor === lastColor) {
            randomColor = colors[Math.floor(Math.random() * colors.length)];
        }
        document.body.style.backgroundColor = randomColor;
        lastColor = randomColor;
    });
}

// Display current date and time
function displayDateTime() {
    const now = new Date();
    const dateTimeContainer = document.getElementById('date-time');
    if (dateTimeContainer) {
        dateTimeContainer.textContent = now.toLocaleString();
    }
}

setInterval(displayDateTime, 1000);
displayDateTime();

// "Buy Now" button with sound effect and confirmation
const buyNowButtons = document.querySelectorAll('.buy-now-btn');
const purchaseSound = new Audio('sounds/purchase.mp3');
buyNowButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const confirmPurchase = confirm('Do you want to proceed with the purchase?');
        if (confirmPurchase) {
            alert('Thank you for your purchase!');
            purchaseSound.play();
        } else {
            alert('Purchase canceled.');
        }
    });
});

// FAQs - Expand/Collapse functionality
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.classList.toggle('visible');
        question.classList.toggle('active');
        
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
        } else {
            answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
    });
});

// Show greeting dynamically based on the time of day
function showGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = '';

    switch (true) {
        case (hour < 12):
            greeting = 'Good morning!';
            break;
        case (hour >= 12 && hour < 18):
            greeting = 'Good afternoon!';
            break;
        case (hour >= 18):
            greeting = 'Good evening!';
            break;
        default:
            greeting = 'Hello!';
    }

    const greetingContainer = document.getElementById('greeting');
    if (greetingContainer) {
        greetingContainer.textContent = greeting;
    }
}

showGreeting();

// "Read More" Toggle Button
const readMoreBtn = document.getElementById('read-more-btn');
const extraContent = document.getElementById('extra-content');

if (readMoreBtn && extraContent) {
    readMoreBtn.addEventListener('click', () => {
        if (extraContent.style.display === "none") {
            extraContent.style.display = "block";
            readMoreBtn.textContent = "Read Less";
        } else {
            extraContent.style.display = "none";
            readMoreBtn.textContent = "Read More";
        }
    });
}

// Dynamic Greeting with User Input
const nameInput = document.getElementById('name-input');
const submitNameBtn = document.getElementById('submit-name-btn');
const greeting = document.getElementById('greeting');

if (submitNameBtn && nameInput && greeting) {
    submitNameBtn.addEventListener('click', () => {
        const name = nameInput.value;
        greeting.textContent = `Hello, ${name || 'Guest'}!`;
    });
}

// Load dynamic content (random quotes)
const getQuoteBtn = document.querySelector('#get-quote-btn');
const quoteElement = document.querySelector('#random-quote');
const quotes = [
    "Electronic shops often see a 30% increase in sales during holiday seasons.",
    "Smartphones are among the best-selling electronic items online.",
    "Customer reviews impact 90% of online electronic sales.",
    "Free shipping is a key factor in 80% of electronic purchase decisions.",
    "Online electronic shops offer a wider variety of products than most physical stores.",
    "Laptops and tablets are commonly purchased for remote work and study needs.",
    "Electronic products sold online often come with easy return policies.",
    "Refurbished electronics are gaining popularity as a sustainable shopping option.",
    "Over 70% of online shoppers compare prices on multiple sites before purchasing electronics.",
    "Online electronic stores often provide 24/7 customer support through chatbots.",
    "The average lifespan of a smartphone is about 2-3 years.",
    "Many online shops now offer interest-free installment payment options for electronics.",
    "Virtual reality is becoming a new way to shop for electronics online.",
    "Wireless earbuds have become one of the fastest-growing electronic segments.",
    "Product warranties are available on nearly 85% of electronics sold online.",
    "Smart home devices are popular online purchases, especially during sales events.",
    "The global online electronics market is expected to grow by over 5% each year.",
    "Online electronic shops frequently bundle accessories to add value to purchases.",
    "Eco-friendly packaging is a growing trend among online electronic retailers.",
    "Consumers increasingly look for energy-efficient ratings when buying electronics online.",
    "Many electronics come with online support and tutorials for easy setup and use.",
    "Online electronic stores are using AI to personalize shopping experiences for customers."
];


if (getQuoteBtn && quoteElement) {
    getQuoteBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex];
    });
}

// Fetch and Load More Content
const loadMoreBtn = document.getElementById('load-more-btn');
const postContainer = document.getElementById('post-container');

if (loadMoreBtn && postContainer) {
    loadMoreBtn.addEventListener('click', async () => {
        // Simulated electronic shop content for demonstration purposes
        const electronicProducts = [
            { title: 'Smartphone XYZ', body: 'Latest 5G smartphone with 64MP camera and 128GB storage.' },
            { title: 'Laptop Pro 2024', body: 'Ultra-slim laptop with i9 processor, 16GB RAM, and 1TB SSD.' },
            { title: '4K Smart TV', body: '55-inch 4K UHD Smart TV with built-in voice control and streaming apps.' },
            { title: 'Wireless Earbuds', body: 'Noise-cancelling wireless earbuds with 12-hour battery life.' },
            { title: 'Smart Home Assistant', body: 'Voice-controlled assistant to manage your home devices seamlessly.' }
        ];

        // Append electronic product content to the container
        electronicProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('post');
            productElement.innerHTML = `<h3>${product.title}</h3><p>${product.body}</p>`;
            postContainer.appendChild(productElement);
        });
    });
}


// Keyboard navigation for menu items
const menuItems = document.querySelectorAll('#menu a');
let currentIndex = 0;

document.addEventListener('keydown', (e) => {
    const activeElement = document.activeElement;

    // Check if the active element is not an input field
    if (activeElement.tagName.toLowerCase() !== 'input' && menuItems.length > 0) {
        if (e.key === 'ArrowDown') {
            currentIndex = (currentIndex + 1) % menuItems.length;
        } else if (e.key === 'ArrowUp') {
            currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
        }

        menuItems.forEach(item => item.classList.remove('active'));
        menuItems[currentIndex].focus();
    }
});

// Asynchronous form submission using Fetch and callback
const contactForm = document.getElementById('contact-form');
const feedbackElement = document.getElementById('form-feedback');

if (contactForm && feedbackElement) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const response = await fetch('https://formspree.io/f/mbljlqaw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, message })
        });

        if (response.ok) {
            feedbackElement.textContent = 'Message sent successfully!';
        } else {
            feedbackElement.textContent = 'Failed to send message.';
        }
    });
}

// Typing Effect
const text = `<strong>🌐 AITES: Your Ultimate Online Electronics Store 🌐</strong><br><br>
AITES is an all-in-one online store designed to cater to every tech need, from the latest smartphones and laptops to home appliances and smart home solutions. Our platform combines an intuitive shopping experience with comprehensive customer support, making it easy for customers to explore and purchase the electronics that fit their lifestyles. With a wide range of high-quality products from trusted brands, competitive prices, and convenient delivery options, AITES makes online shopping for electronics seamless and enjoyable.<br><br>
<strong>🔹 Product Categories 🔹</strong><br><br>
<strong>1. Smartphones & Accessories 📱</strong><br>
AITES offers an extensive selection of smartphones from top brands like Apple, Samsung, Google, and OnePlus. Our detailed product pages provide specifications, user reviews, and high-resolution images, ensuring you can make an informed decision. From budget-friendly options to flagship models, you’ll find something for every budget and preference. Additionally, we carry essential accessories, including cases, chargers, screen protectors, and wireless earbuds.<br><br>
<strong>2. Laptops, Computers & Tablets 💻</strong><br>
For students, professionals, and gamers, AITES’s laptops and computers section is tailored to meet a variety of needs. We feature ultrabooks, gaming laptops, and business-grade laptops with the latest processors and graphic cards. Each product listing includes key specifications and performance insights, making it easy to compare models. If you’re looking for something more portable, our tablet section has popular choices from brands like Apple, Samsung, and Microsoft, ideal for work, study, or entertainment on the go.<br><br>
<strong>3. Home Entertainment 📺</strong><br>
Transform your home into an entertainment hub with our range of high-definition televisions, sound systems, and streaming devices. AITES’s inventory includes LED, OLED, and QLED TVs in various sizes and price ranges. Our sound system options cover everything from compact soundbars to complete home theater systems, ensuring every customer can find the perfect match for their living space.<br><br>
<strong>4. Home Appliances 🧺</strong><br>
AITES also provides a wide variety of home appliances, from refrigerators and washing machines to air purifiers and vacuum cleaners. With a focus on energy efficiency and durability, we carefully select products from trusted brands, including LG, Samsung, and Bosch. Each appliance listing features energy ratings, warranty information, and detailed specifications, helping customers find reliable and eco-friendly solutions for their homes.<br><br>
<strong>5. Smart Home Technology 🏠</strong><br>
Our Smart Home section brings together the latest in home automation, including smart speakers, lighting, security cameras, and thermostats. We also offer integrated bundles to simplify the process of setting up a smart home ecosystem. With options from brands like Google Nest, Amazon Alexa, and Philips Hue, AITES makes it easy for customers to build an interconnected home environment that’s secure, convenient, and easy to manage.<br><br>
<strong>6. Gaming & Accessories 🎮</strong><br>
AITES’s gaming section is stocked with consoles, gaming PCs, and accessories to satisfy casual and hardcore gamers alike. From the latest PlayStation and Xbox consoles to custom-built gaming rigs, we provide a range of products to suit various gaming preferences. We also offer a variety of peripherals like controllers, headsets, keyboards, and mice, ensuring a fully immersive gaming experience.<br><br>
<strong>7. Cameras & Photography Equipment 📷</strong><br>
For photographers and videographers, AITES carries a wide range of cameras, including DSLRs, mirrorless cameras, and action cameras from brands like Canon, Nikon, and Sony. Each camera listing includes key features, comparison options, and user reviews. We also provide essential photography accessories, from lenses and tripods to memory cards and lighting equipment.<br><br>
<strong>🔹 Features & Services 🔹</strong><br><br>
<strong>User-Friendly Interface 🔍</strong><br>
Our website is designed to make shopping easy and enjoyable. With clear categories, filters, and a powerful search bar, customers can quickly find products, compare features, and read reviews. Product pages are detailed, providing full specifications, high-resolution images, and in-depth descriptions, helping customers make informed purchasing decisions.<br><br>
<strong>Customer Support 📞</strong><br>
AITES is committed to customer satisfaction. Our customer support team is available via live chat, email, and phone, ready to assist with product inquiries, order tracking, or technical support. Our team also offers guidance through video tutorials, setup instructions, and troubleshooting tips to ensure every customer can use their products to their fullest potential.<br><br>
<strong>Flexible Payment Options 💳</strong><br>
We offer a range of secure payment options, including credit/debit cards, digital wallets, and financing plans for larger purchases. Customers can enjoy the flexibility of paying in installments, making it easier to purchase high-end electronics without straining their budgets.<br><br>
<strong>Free Shipping & Fast Delivery 🚚</strong><br>
AITES provides free standard shipping on orders over a specified amount and offers express delivery options for those needing their products quickly. We partner with reliable couriers to ensure your purchases arrive safely and on time.<br><br>
<strong>Hassle-Free Returns 🔄</strong><br>
Our hassle-free return policy allows customers to shop with confidence. If a product doesn’t meet expectations, we provide easy return and refund options within a specified period. Our customer service team will guide you through the return process, ensuring a smooth experience.<br><br>
<strong>Extended Warranty & Protection Plans 🛡️</strong><br>
To provide extra peace of mind, AITES offers extended warranty and protection plans on a variety of products. Customers can choose from coverage options that best suit their needs, protecting their investments against accidental damage or defects beyond the standard warranty period.<br><br>
<strong>Rewards Program 🎉</strong><br>
We value loyal customers, which is why we offer a rewards program where customers can earn points on every purchase. Points can be redeemed for discounts, exclusive products, or special offers, making shopping at AITES even more rewarding.<br><br>
<strong>🔹 Why Choose AITES? 🔹</strong><br>
AITES is committed to delivering the best in electronics, combining convenience, variety, and outstanding customer service. Whether you’re a tech enthusiast, a gamer, or someone looking to upgrade their home appliances, AITES is here to meet all your electronic needs. With a user-friendly platform, a wide selection of products, and a dedication to customer satisfaction, AITES transforms online shopping into a simple, satisfying experience.`;

let index = 0;

function typeText() {
    document.getElementById("typingEffect").innerHTML = text.substring(0, index);
    index++;
    if (index <= text.length) {
        setTimeout(typeText, 50);
    }
}

window.onload = function() {
    typeText();
};

// Password Generator
document.getElementById("generatePasswordBtn").addEventListener("click", generatePassword);

function generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    document.getElementById("passwordOutput").innerText = password;
}

// Authentication Logic
const loginForm = document.querySelector('.form-wrapper.sign-in form');
const signupForm = document.querySelector('.form-wrapper.sign-up form');
const logoutBtn = document.createElement('button'); // dynamically create logout button if required

// Store user data in localStorage upon successful signup
signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = signupForm.querySelector('input[type="text"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;
    localStorage.setItem('user', JSON.stringify({ username, password }));
    alert('Account created successfully! Please log in.');
});

// Handle login by checking stored user data
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = loginForm.querySelector('input[type="text"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        localStorage.setItem('isAuthenticated', 'true');
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password.');
    }
});

// Logout function
function logout() {
    localStorage.removeItem('isAuthenticated');
    alert('You have been logged out.');
    window.location.href = 'login.html';
}

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isAuthenticated')) {
        logoutBtn.innerText = 'Logout';
        logoutBtn.onclick = logout;
        document.querySelector('header').appendChild(logoutBtn);
    }
});