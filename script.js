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
