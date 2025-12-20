// Education Page Specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
    console.log('Education page loaded');
    
    // Initialize skill tags interaction
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            tag.style.transform = 'scale(0.95)';
            setTimeout(() => {
                tag.style.transform = '';
            }, 200);
        });
    });
    
    // Course item interaction
    const courseItems = document.querySelectorAll('.course-item');
    
    courseItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log('Course clicked:', item.querySelector('strong').textContent);
        });
    });
    
    // Handle language toggle - override if needed
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        console.log('Language button found on education page');
    }
    
    // Print functionality
    const printButton = document.createElement('button');
    printButton.textContent = 'Print This Page';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1000;
        font-size: 0.9rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        transition: all 0.3s;
    `;
    
    printButton.addEventListener('mouseenter', () => {
        printButton.style.backgroundColor = '#45a049';
        printButton.style.transform = 'translateY(-2px)';
    });
    
    printButton.addEventListener('mouseleave', () => {
        printButton.style.backgroundColor = '#4CAF50';
        printButton.style.transform = 'translateY(0)';
    });
    
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    // Only show print button on larger screens
    if (window.innerWidth > 768) {
        document.body.appendChild(printButton);
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && !document.querySelector('.print-button')) {
            document.body.appendChild(printButton);
        } else if (window.innerWidth <= 768 && document.querySelector('.print-button')) {
            document.querySelector('.print-button').remove();
        }
    });
    
    // Add print styles
    const printStyles = `
        @media print {
            .lang-toggle, .print-button, .back-button, .skill-tag:hover {
                display: none !important;
            }
            
            .container {
                box-shadow: none !important;
                margin: 0 !important;
            }
            
            .skill-tag {
                border: 1px solid #ccc !important;
                background-color: #f9f9f9 !important;
                color: #333 !important;
            }
            
            body {
                background-color: white !important;
                color: black !important;
                font-size: 12pt !important;
            }
            
            a {
                color: black !important;
                text-decoration: none !important;
            }
            
            .sidebar {
                background-color: #f5f5f5 !important;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = printStyles;
    document.head.appendChild(styleSheet);
    
    // Scroll animation for timeline items
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
});