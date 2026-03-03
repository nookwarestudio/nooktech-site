AOS.init({
    duration: 1000,
    once: true
});

// Menü Kontrolü
const menuBtn = document.getElementById("menuBtn");
const menuPanel = document.getElementById("menuPanel");

menuBtn.addEventListener("click", () => {
    menuPanel.classList.toggle("active");
    menuBtn.classList.toggle("open-menu");
    
    if(menuPanel.classList.contains("active")) {
        // Menu açılırken items'i sıralı animasyonla göster
        const items = menuPanel.querySelectorAll(".menu-item");
        gsap.from(items, {
            opacity: 0,
            x: 20,
            duration: 0.4,
            stagger: 0.08,
            ease: "power3.out"
        });
    }
});

// Menü dışına tıklandığında menüyü kapat
document.addEventListener("click", (e) => {
    if (!menuPanel.contains(e.target) && !menuBtn.contains(e.target)) {
        if(menuPanel.classList.contains("active")) {
            menuPanel.classList.remove("active");
            menuBtn.classList.remove("open-menu");
        }
    }
});

// Menu item'a tıklandığında menüyü kapat
const menuItems = menuPanel.querySelectorAll(".menu-item:not(.dropdown-btn)");
menuItems.forEach(item => {
    item.addEventListener("click", () => {
        menuPanel.classList.remove("active");
        menuBtn.classList.remove("open-menu");
    });
});

// Dropdown Menü Kontrolü
const dropdownBtns = document.querySelectorAll(".dropdown-btn");
dropdownBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const parent = btn.closest(".menu-dropdown");
        const content = parent.querySelector(".dropdown-content");
        
        parent.classList.toggle("open");
        
        if(parent.classList.contains("open")) {
            content.style.display = "flex";
            gsap.to(content, {
                maxHeight: "300px",
                duration: 0.4,
                ease: "power3.out"
            });
        } else {
            gsap.to(content, {
                maxHeight: "0px",
                duration: 0.4,
                ease: "power3.in",
                onComplete: () => {
                    content.style.display = "none";
                }
            });
        }
    });
});

// Yazı Animasyonu (Typed.js)
new Typed("#typedTop", {
    strings: ["Çalıştır."],
    typeSpeed: 80,
    showCursor: true,
    cursorChar: '|'
});

new Typed("#typed", {
    strings: ["Kod Yaz.", "Derle.", "Geliştir."],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true
});

// Sayaç Animasyonu
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
    const update = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / 150;

        if(count < target){
            counter.innerText = Math.ceil(count + increment);
            setTimeout(update, 20);
        } else {
            counter.innerText = target.toLocaleString();
        }
    }
    
    // Sayfa kaydırıldığında çalışması için basit bir gözlemci
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) update();
    }, { threshold: 0.5 });
    
    observer.observe(counter);
});

// Accordion control (faq page)
const accordionTitles = document.querySelectorAll('.accordion .item .title');
accordionTitles.forEach(title => {
    title.addEventListener('click', () => {
        const content = title.nextElementSibling;
        content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
    });
});

// Block F12 and right-click to deter inspection
window.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
    }
});

window.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// GSAP ile Telefon Giriş Animasyonu
gsap.from(".phone", {
    opacity: 0,
    scale: 0.8,
    duration: 1.5,
    stagger: 0.3,
    ease: "power4.out"
});

// GSAP for hero icon set
if(document.querySelectorAll('.hero-icons .icon-item').length){
    gsap.from('.hero-icons .icon-item', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.hero-icons',
            start: 'top 80%'
        }
    });
}
