// Page loader
document.body.classList.add('loading');

const pageLoader = document.getElementById('pageLoader');

const hidePageLoader = () => {
    if (!pageLoader) return;

    pageLoader.classList.add('hide');
    document.body.classList.remove('loading');
};

window.addEventListener('load', () => {
    setTimeout(hidePageLoader, 4000);
});

setTimeout(hidePageLoader, 5000);

// Mobile Menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn) menuBtn.onclick = () => navLinks.classList.toggle('show');

// Form Handling for FormSubmit
const form = document.getElementById('estimateForm');
const formNote = document.getElementById('formNote');

if (form) {
    form.addEventListener('submit', () => {
        // Show success message
        formNote.textContent = 'Thank you! We will contact you soon.';
        formNote.style.color = '#28a745';
        
        // Do NOT preventDefault - let FormSubmit handle sending the email
    });
}

// Owner card typewriter
const ownerTypewriter = document.getElementById('ownerTypewriter');

const ownerPhraseSets = {
    en: [
        '25+ YEARS OF EXPERIENCE',
        'LICENSED & INSURED',
        '700+ OF ROOFS COMPLETED',
        'SERVING LITTLE ROCK',
        'SERVING CABOT',
        'SERVING CONWAY',
        'SERVING BENTON',
        'SERVING BRYANT',
        'SERVING NORTH LITTLE ROCK',
        'SERVING JACKSONVILLE',
        'SERVING SHERWOOD',
        'SERVING MAUMELLE',
        'SERVING HOT SPRINGS',
        'SERVING LONOKE',
        'SERVING ROGERS',
        'SERVING WEST MEMPHIS',
        'SERVING HOPE',
        'SERVING TEXARKANA',
        'SERVING ARKANSAS!!'
    ],
    es: [
        'MAS DE 25 ANOS DE EXPERIENCIA',
        'LICENCIADO Y ASEGURADO',
        'MAS DE SETECIENTOS DE TECHOS COMPLETADOS',
        'SIRVIENDO A LITTLE ROCK',
        'SIRVIENDO A CABOT',
        'SIRVIENDO A CONWAY',
        'SIRVIENDO A BENTON',
        'SIRVIENDO A BRYANT',
        'SIRVIENDO A NORTH LITTLE ROCK',
        'SIRVIENDO A JACKSONVILLE',
        'SIRVIENDO A SHERWOOD',
        'SIRVIENDO A MAUMELLE',
        'SIRVIENDO A HOT SPRINGS',
        'SIRVIENDO A LONOKE',
        'SIRVIENDO A ROGERS',
        'SIRVIENDO A WEST MEMPHIS',
        'SIRVIENDO A HOPE',
        'SIRVIENDO A TEXARKANA',
        'SIRVIENDO A TODO ARKANSAS!!'
    ]
};

if (ownerTypewriter) {
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let activeLanguage = window.currentLanguage || 'en';
    let typewriterTimer;

    const typeOwnerPhrase = () => {
        const phrases = ownerPhraseSets[activeLanguage] || ownerPhraseSets.en;
        const phrase = phrases[phraseIndex];
        ownerTypewriter.textContent = phrase.slice(0, letterIndex);

        if (!isDeleting && letterIndex < phrase.length) {
            letterIndex++;
            typewriterTimer = setTimeout(typeOwnerPhrase, 70);
            return;
        }

        if (!isDeleting && letterIndex === phrase.length) {
            isDeleting = true;
            typewriterTimer = setTimeout(typeOwnerPhrase, 1400);
            return;
        }

        if (isDeleting && letterIndex > 0) {
            letterIndex--;
            typewriterTimer = setTimeout(typeOwnerPhrase, 35);
            return;
        }

        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typewriterTimer = setTimeout(typeOwnerPhrase, 300);
    };

    window.addEventListener('languagechange', (event) => {
        activeLanguage = event.detail.lang || 'en';
        phraseIndex = 0;
        letterIndex = 0;
        isDeleting = false;
        clearTimeout(typewriterTimer);
        typeOwnerPhrase();
    });

    typeOwnerPhrase();
}

// Project gallery lightbox
const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
const galleryLightbox = document.getElementById('galleryLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

if (galleryImages.length && galleryLightbox && lightboxImage) {
    let activeImageIndex = 0;

    const showLightboxImage = (index) => {
        activeImageIndex = (index + galleryImages.length) % galleryImages.length;
        const image = galleryImages[activeImageIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || 'Roofing project photo';
    };

    const openLightbox = (index) => {
        showLightboxImage(index);
        galleryLightbox.classList.add('show');
        galleryLightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        galleryLightbox.classList.remove('show');
        galleryLightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        lightboxImage.src = '';
    };

    galleryImages.forEach((image, index) => {
        image.addEventListener('click', () => openLightbox(index));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => showLightboxImage(activeImageIndex - 1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => showLightboxImage(activeImageIndex + 1));

    galleryLightbox.addEventListener('click', (event) => {
        if (event.target === galleryLightbox) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
        if (!galleryLightbox.classList.contains('show')) return;

        if (event.key === 'Escape') closeLightbox();
        if (event.key === 'ArrowLeft') showLightboxImage(activeImageIndex - 1);
        if (event.key === 'ArrowRight') showLightboxImage(activeImageIndex + 1);
    });
}
