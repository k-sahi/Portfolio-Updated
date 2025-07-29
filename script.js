// --- script.js (V7 - Reactive Background Added) ---
document.addEventListener('DOMContentLoaded', () => {

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
        window.dispatchEvent(new Event('themeChanged'));
    });

    // Staggered Animations on Scroll
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${index * 100}ms`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        animationObserver.observe(element);
    });

    // Skills Radar Chart
    const radarChartCanvas = document.getElementById('skillsRadarChart');
    if (radarChartCanvas) {
        const drawChart = () => {
            const isDark = document.body.classList.contains('dark-mode');
            const gridColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
            const labelColor = isDark ? '#c9d1d9' : '#57606a';

            if(window.myRadarChart) window.myRadarChart.destroy();

            window.myRadarChart = new Chart(radarChartCanvas.getContext('2d'), {
                type: 'radar',
                data: { labels: ['Python/SQL', 'Cloud & Big Data', 'ML Frameworks', 'Databases', 'Visualization', 'Statistics'], datasets: [{ label: 'Proficiency', data: [95, 85, 90, 88, 92, 80], backgroundColor: 'rgba(9, 105, 218, 0.2)', borderColor: 'rgba(9, 105, 218, 1)', pointBackgroundColor: '#fff', pointBorderColor: 'rgba(9, 105, 218, 1)', borderWidth: 2 }] },
                options: { responsive: true, maintainAspectRatio: false, scales: { r: { angleLines: { color: gridColor }, grid: { color: gridColor }, pointLabels: { font: { size: 12 }, color: labelColor }, ticks: { display: false }, suggestedMin: 0, suggestedMax: 100 } }, plugins: { legend: { display: false } } }
            });
        }
        drawChart();
        window.addEventListener('themeChanged', drawChart);
    }

    // Active Nav Link on Page Load
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active-link');
        } else {
            // Ensure other links are not active
            link.classList.remove('active-link');
        }
    });

    // --- NEW: REACTIVE BACKGROUND SPOTLIGHT EFFECT ---
    document.addEventListener('mousemove', (e) => {
        // Update CSS variables for mouse coordinates
        document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
        document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    });

});