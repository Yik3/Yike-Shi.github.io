// Research Page Specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
    console.log('Research page loaded');
    
    // Filter projects by tags
    const filterTags = document.querySelectorAll('.tag');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const selectedTag = this.textContent.trim();
            
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            this.classList.add('active');
            
            // Show/hide projects based on tag
            projectCards.forEach(card => {
                const cardTags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.trim());
                
                if (selectedTag === 'All' || cardTags.includes(selectedTag)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Add active state CSS for tags
    const style = document.createElement('style');
    style.textContent = `
        .tag.active {
            background: #3d7ed9;
            color: white;
            transform: scale(1.05);
            box-shadow: 0 3px 10px rgba(61, 126, 217, 0.3);
        }
        
        .tag {
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .tag:hover {
            transform: translateY(-2px);
            box-shadow: 0 3px 8px rgba(61, 126, 217, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    // Add "All" filter button
    const allTagsContainer = document.querySelector('.project-tags');
    if (allTagsContainer && !document.querySelector('.tag.all-filter')) {
        const allButton = document.createElement('span');
        allButton.className = 'tag all-filter';
        allButton.textContent = 'All';
        allButton.style.order = '-1';
        allContainer.insertBefore(allButton, allTagsContainer.firstChild);
        
        // Set initial active state
        allButton.classList.add('active');
    }
    
    // Expand project details on click
    projectCards.forEach(card => {
        const description = card.querySelector('.project-description');
        const details = card.querySelector('.project-details');
        
        if (description && details) {
            description.style.cursor = 'pointer';
            description.addEventListener('click', () => {
                details.style.display = details.style.display === 'none' ? 'block' : 'none';
            });
        }
    });
    
    // Add print functionality
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Research Summary';
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
        display: none;
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
        printButton.style.display = 'block';
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            printButton.style.display = 'block';
        } else {
            printButton.style.display = 'none';
        }
    });
    
    // Add print styles
    const printStyles = `
        @media print {
            .lang-toggle, .print-button, .nav-button {
                display: none !important;
            }
            
            .project-card {
                break-inside: avoid;
                box-shadow: none !important;
                border: 1px solid #ddd !important;
            }
            
            .tag {
                background: #f0f0f0 !important;
                color: #333 !important;
                border: 1px solid #ccc !important;
            }
            
            .project-link {
                display: none !important;
            }
            
            body {
                background-color: white !important;
                color: black !important;
            }
            
            .sidebar {
                background-color: #f5f5f5 !important;
            }
        }
    `;
    
    const printStyleSheet = document.createElement('style');
    printStyleSheet.textContent = printStyles;
    document.head.appendChild(printStyleSheet);
    
    // Add scroll animation for project cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    projectCards.forEach(card => {
        observer.observe(card);
    });
});