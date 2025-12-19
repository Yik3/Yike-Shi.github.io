document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('lang-btn');
    
    // 找到所有的英文区块和中文区块（包括左侧和右侧）
    const enSections = document.querySelectorAll('.lang-en');
    const zhSections = document.querySelectorAll('.lang-zh');

    let currentLang = 'en';

    btn.addEventListener('click', () => {
        if (currentLang === 'en') {
            // 隐藏所有英文，显示所有中文
            enSections.forEach(el => el.style.display = 'none');
            zhSections.forEach(el => el.style.display = 'block');
            
            btn.textContent = 'Click to English Version';
            currentLang = 'zh';
        } else {
            // 隐藏所有中文，显示所有英文
            zhSections.forEach(el => el.style.display = 'none');
            enSections.forEach(el => el.style.display = 'block');
            
            btn.textContent = '切换中文';
            currentLang = 'en';
        }
    });
});