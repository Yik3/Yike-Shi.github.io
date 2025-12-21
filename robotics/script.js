// Robotics Story Page Specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
    console.log('Robotics Story page loaded');
    
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
    
    // Add animation to images when they come into view
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.story-image').forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        imageObserver.observe(img);
    });
    
    // Add interactive timeline effect
    const chapters = document.querySelectorAll('.story-chapter');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-active');
                
                // Add a pulse effect to the timeline dot
                const dot = entry.target.querySelector('.story-chapter::before');
                if (dot) {
                    entry.target.style.setProperty('--dot-scale', '1.2');
                    setTimeout(() => {
                        entry.target.style.setProperty('--dot-scale', '1');
                    }, 500);
                }
            }
        });
    }, {
        threshold: 0.2
    });
    
    chapters.forEach(chapter => {
        timelineObserver.observe(chapter);
        
        // Add CSS custom property for dot animation
        chapter.style.setProperty('--dot-scale', '1');
    });
    
    // Add CSS for dot animation
    const style = document.createElement('style');
    style.textContent = `
        .story-chapter::before {
            transform: scale(var(--dot-scale));
            transition: transform 0.3s ease;
        }
        
        .timeline-active .chapter-content {
            box-shadow: 0 8px 25px rgba(61, 126, 217, 0.15);
        }
    `;
    document.head.appendChild(style);
    
    // Goal cards hover effect enhancement
    const goalCards = document.querySelectorAll('.goal-card');
    goalCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.goal-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.goal-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
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
        background: linear-gradient(to right, #3d7ed9, #6a11cb);
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
    
    // Print button
    const printButton = document.createElement('button');
    printButton.textContent = 'Print This Story';
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
    
    // Share functionality
    const shareButton = document.createElement('button');
    shareButton.textContent = 'Share Story';
    shareButton.className = 'share-button';
    shareButton.style.cssText = `
        position: fixed;
        bottom: 70px;
        right: 20px;
        padding: 10px 20px;
        background-color: #3d7ed9;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1000;
        font-size: 0.9rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        transition: all 0.3s;
    `;
    
    shareButton.addEventListener('mouseenter', () => {
        shareButton.style.backgroundColor = '#2c5fb4';
        shareButton.style.transform = 'translateY(-2px)';
    });
    
    shareButton.addEventListener('mouseleave', () => {
        shareButton.style.backgroundColor = '#3d7ed9';
        shareButton.style.transform = 'translateY(0)';
    });
    
    shareButton.addEventListener('click', () => {
        const currentLang = document.querySelector('.lang-en').style.display === 'none' ? 'zh' : 'en';
        const title = currentLang === 'en' ? 'My Robotics Journey' : '我的机器人旅程';
        const text = currentLang === 'en' 
            ? "Check out my robotics journey from high school competitions to cutting-edge research at UCLA!" 
            : "查看我从高中机器人竞赛到UCLA前沿研究的机器人旅程！";
        const url = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: title,
                text: text,
                url: url,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${title}\n\n${text}\n\n${url}`).then(() => {
                alert(currentLang === 'en' 
                    ? 'Link copied to clipboard!' 
                    : '链接已复制到剪贴板！');
            });
        }
    });
    
    // Only show share button on larger screens
    if (window.innerWidth > 768 && navigator.share) {
        document.body.appendChild(shareButton);
    }
});