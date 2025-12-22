// Teaching & Leadership Page Specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
    console.log('Teaching & Leadership page loaded');
    
    // Add hover effects to leadership items
    const leadershipItems = document.querySelectorAll('.leadership-item');
    
    leadershipItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const content = item.querySelector('.leadership-content');
            if (content) {
                content.style.boxShadow = '0 10px 30px rgba(106, 17, 203, 0.15)';
                content.style.transform = 'translateX(5px)';
                content.style.transition = 'all 0.3s ease';
            }
            
            // Highlight the timeline dot
            const dot = item.querySelector('.leadership-item::before');
            if (dot) {
                item.style.setProperty('--dot-scale', '1.3');
                item.style.setProperty('--dot-color', '#ff6b6b');
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const content = item.querySelector('.leadership-content');
            if (content) {
                content.style.boxShadow = '';
                content.style.transform = '';
            }
            
            // Reset timeline dot
            item.style.setProperty('--dot-scale', '1');
            item.style.setProperty('--dot-color', '#6a11cb');
        });
    });
    
    // Add CSS for dot animation
    const style = document.createElement('style');
    style.textContent = `
        .leadership-item::before {
            transform: scale(var(--dot-scale, 1));
            background-color: var(--dot-color, #6a11cb);
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Add click to expand/collapse leadership highlights
    const leadershipHighlights = document.querySelectorAll('.leadership-highlights');
    
    leadershipHighlights.forEach(highlight => {
        const header = highlight.querySelector('h4');
        if (header) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                const ul = highlight.querySelector('ul');
                if (ul) {
                    ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
                }
            });
        }
    });
    
    // Add stats animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStat = (element, target) => {
        let current = 0;
        const increment = target / 50; // 50 steps for animation
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target.toString().includes('.') ? '' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    };
    
    // Observe when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    const text = statNumber.textContent;
                    const number = parseFloat(text.replace('+', ''));
                    
                    if (!isNaN(number)) {
                        statNumber.textContent = '0';
                        setTimeout(() => {
                            animateStat(statNumber, number);
                        }, 300);
                    }
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Philosophy cards interaction
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    
    philosophyCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });
    
    // Print functionality
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Leadership Summary';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        background-color: #6a11cb;
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
        printButton.style.backgroundColor = '#5a0db3';
        printButton.style.transform = 'translateY(-2px)';
    });
    
    printButton.addEventListener('mouseleave', () => {
        printButton.style.backgroundColor = '#6a11cb';
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
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add reading progress indicator
    const readingProgress = document.createElement('div');
    readingProgress.className = 'reading-progress';
    readingProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(to right, #6a11cb, #2575fc);
        width: 0%;
        z-index: 9999;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(readingProgress);
    
    // Update reading progress
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        
        const progress = (scrolled / documentHeight) * 100;
        readingProgress.style.width = `${progress}%`;
    });
});