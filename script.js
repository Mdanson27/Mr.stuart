document.body.classList.add('loading');

const loader = document.getElementById('loader');
const toast = document.getElementById('toast');
const saveButtons = [
  document.getElementById('saveContact'),
  document.getElementById('saveMini')
].filter(Boolean);

window.addEventListener('load', () => {
  window.setTimeout(() => {
    loader?.classList.add('is-hidden');
    document.body.classList.remove('loading');
  }, 2100);
});

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2200);
}

function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Sebunya;Stuart Sengonzi;;;',
    'FN:Stuart Sengonzi Sebunya',
    'ORG:Honest Estate Developers Ltd',
    "TITLE:Business Development Lead & Head of Diaspora Engagement",
    'TEL;TYPE=CELL,VOICE:+256750791591',
    'TEL;TYPE=WHATSAPP:+256750791591',
    'EMAIL;TYPE=INTERNET:mikart56@gmail.com',
    'ADR;TYPE=WORK:;;Martin Road;Old Kampala;;;Uganda',
    'URL:https://www.linkedin.com/stuart-sengonzi-mike',
    'NOTE:Business development, real estate, strategic partnerships and diaspora engagement.',
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Stuart-Sengonzi-Sebunya.vcf';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast('Stuart’s contact card downloaded');
}

saveButtons.forEach((button) => button.addEventListener('click', downloadVCard));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.animate(
          [
            { opacity: 0, transform: 'translateY(22px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' }
        );
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.panel, .connect-card').forEach((element) => observer.observe(element));
