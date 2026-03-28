document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript chargé');
    
    // Filtres
    const filterBtns = document.querySelectorAll('.filter-btn');
    const posterItems = document.querySelectorAll('.poster-item');
    
    function filterPosters(category) {
        let visibleCount = 0;
        posterItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        const grid = document.querySelector('.posters-grid');
        const existingMsg = document.querySelector('.no-results-msg');
        if (visibleCount === 0 && !existingMsg) {
            const msg = document.createElement('div');
            msg.className = 'no-results-msg';
            msg.innerHTML = '<p>Aucune affiche trouvée.</p>';
            msg.style.textAlign = 'center';
            msg.style.padding = '40px';
            msg.style.color = '#aaa';
            msg.style.gridColumn = '1 / -1';
            grid.appendChild(msg);
        } else if (visibleCount > 0 && existingMsg) {
            existingMsg.remove();
        }
    }
    
    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterPosters(this.getAttribute('data-filter'));
            });
        });
    }
    
    // Charger plus
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let visibleCount = 4;
    if (loadMoreBtn && posterItems.length) {
        function updateVisible() {
            posterItems.forEach((item, i) => { item.style.display = i < visibleCount ? 'block' : 'none'; });
            loadMoreBtn.style.display = visibleCount >= posterItems.length ? 'none' : 'inline-block';
        }
        updateVisible();
        loadMoreBtn.addEventListener('click', () => { visibleCount += 2; updateVisible(); });
    }
    
    // Menu burger
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('change', function() {
            if (this.checked) { navLinks.classList.add('show'); document.body.style.overflow = 'hidden'; }
            else { navLinks.classList.remove('show'); document.body.style.overflow = ''; }
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => { menuToggle.checked = false; navLinks.classList.remove('show'); document.body.style.overflow = ''; });
        });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuToggle.checked) { menuToggle.checked = false; navLinks.classList.remove('show'); document.body.style.overflow = ''; } });
    }
    
    // Smooth scroll ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href === '' || href.includes('contact.html')) return;
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { e.preventDefault(); window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' }); }
        });
    });
    
    // Navigation active au scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    function updateActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.clientHeight) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#accueil' && (current === 'accueil' || current === '')) link.classList.add('active');
            else if (href && href.substring(1) === current && !href.includes('contact.html')) link.classList.add('active');
        });
    }
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    
    // Animation scroll
    const animatedElements = document.querySelectorAll('.process-item, .skill-tool');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
});