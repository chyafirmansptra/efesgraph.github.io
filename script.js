document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth Scrolling untuk Navigasi ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Animasi Fade-in saat Scroll (Intersection Observer) ---
    // Targetkan semua elemen yang ingin dianimasikan saat masuk viewport
    const faders = document.querySelectorAll(
        '.section-container, .portfolio-item, .service-item, .contact-item, ' +
        '.about-image-content, .about-text-content, ' +
        '.hero-text-content, .hero-image-content' // Targetkan langsung wrapper teks dan gambar di hero
    );

    const appearOptions = {
        threshold: 0.3, // Berapa persen elemen harus terlihat sebelum animasi
        rootMargin: "0px 0px -100px 0px" // Adjust if needed
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                // Untuk hero section, kita tidak unobserve agar animasi tetap terlihat jika halaman di-refresh
                // (Ini opsional, jika ingin animasi hanya sekali, bisa tetap di-unobserve)
                // Cek apakah elemen ada di dalam hero-content-wrapper
                const isHeroElement = entry.target.closest('.hero-content-wrapper');
                if (!isHeroElement) {
                    appearOnScroll.unobserve(entry.target);
                }
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        fader.classList.add('animated-on-scroll'); // Tambahkan kelas awal
        appearOnScroll.observe(fader);
    });

    // --- Efek Ketik di Hero Section (opsional) ---
    const taglineElement = document.querySelector('.hero-text-content .tagline');
    if (taglineElement) {
        const originalText = taglineElement.textContent;
        taglineElement.textContent = ''; // Kosongkan teks awal

        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                taglineElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Kecepatan ketik
            }
        }
        // Panggil setelah jeda singkat agar tidak bentrok dengan animasi CSS lainnya
        setTimeout(typeWriter, 1700); // Sesuaikan timing ini agar setelah animasi slide selesai
    }
});