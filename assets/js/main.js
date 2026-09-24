document.addEventListener('DOMContentLoaded', () => {
    // ---- Theme Toggling ----
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const mobileDarkIcon = document.getElementById('mobile-theme-toggle-dark-icon');
    const mobileLightIcon = document.getElementById('mobile-theme-toggle-light-icon');

    // Check system preference & localStorage
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

    function updateThemeUI() {
        if (isDark) {
            document.documentElement.classList.add('dark');
            if(darkIcon && lightIcon) {
                darkIcon.classList.remove('hidden');
                lightIcon.classList.add('hidden');
            }
            if(mobileDarkIcon && mobileLightIcon) {
                mobileDarkIcon.classList.remove('hidden');
                mobileLightIcon.classList.add('hidden');
            }
        } else {
            document.documentElement.classList.remove('dark');
            if(darkIcon && lightIcon) {
                lightIcon.classList.remove('hidden');
                darkIcon.classList.add('hidden');
            }
            if(mobileDarkIcon && mobileLightIcon) {
                mobileLightIcon.classList.remove('hidden');
                mobileDarkIcon.classList.add('hidden');
            }
        }
    }

    function toggleTheme() {
        isDark = !isDark;
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeUI();
    }

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    updateThemeUI();

    // ---- RTL Toggling ----
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    const mobileRtlToggleBtn = document.getElementById('mobile-rtl-toggle');
    
    const savedRtl = localStorage.getItem('rtl') === 'true';
    let isRtl = savedRtl;

    function updateRtlUI() {
        document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    }

    function toggleRtl() {
        isRtl = !isRtl;
        localStorage.setItem('rtl', isRtl);
        updateRtlUI();
    }

    if (rtlToggleBtn) rtlToggleBtn.addEventListener('click', toggleRtl);
    if (mobileRtlToggleBtn) mobileRtlToggleBtn.addEventListener('click', toggleRtl);
    updateRtlUI();

    // ---- Mobile Menu ----
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuIconOpen.classList.toggle('hidden');
            menuIconClose.classList.toggle('hidden');
        });

        // Close menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
            });
        });
    }

    // ---- Sticky Header ----
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('shadow-md');
                header.classList.replace('bg-brand-ivory/90', 'bg-brand-ivory');
                header.classList.replace('dark:bg-brand-nearblack/90', 'dark:bg-brand-nearblack');
            } else {
                header.classList.remove('shadow-md');
                header.classList.replace('bg-brand-ivory', 'bg-brand-ivory/90');
                header.classList.replace('dark:bg-brand-nearblack', 'dark:bg-brand-nearblack/90');
            }
        });
    }

    // ---- Scroll To Top ----
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                scrollToTopBtn.classList.add('opacity-100');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
                scrollToTopBtn.classList.remove('opacity-100');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
