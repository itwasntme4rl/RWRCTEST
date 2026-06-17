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

const ownerPhrases = [
    '25+ YEARS OF EXPERIENCE',
    'LICENSED & INSURED',
    'HUNDREDS OF ROOFS COMPLETED',
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
    'SERVING ARKANSAS!!'
];

if (ownerTypewriter) {
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    const typeOwnerPhrase = () => {
        const phrase = ownerPhrases[phraseIndex];
        ownerTypewriter.textContent = phrase.slice(0, letterIndex);

        if (!isDeleting && letterIndex < phrase.length) {
            letterIndex++;
            setTimeout(typeOwnerPhrase, 70);
            return;
        }

        if (!isDeleting && letterIndex === phrase.length) {
            isDeleting = true;
            setTimeout(typeOwnerPhrase, 1400);
            return;
        }

        if (isDeleting && letterIndex > 0) {
            letterIndex--;
            setTimeout(typeOwnerPhrase, 35);
            return;
        }

        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % ownerPhrases.length;
        setTimeout(typeOwnerPhrase, 300);
    };

    typeOwnerPhrase();
}
