document.body.classList.add('loading');

const loader = document.getElementById('loader');
const toast = document.getElementById('toast');
const saveButtons = [
  document.getElementById('saveContact'),
  document.getElementById('saveMini'),
  document.getElementById('saveBottom'),
  document.getElementById('saveMobile')
].filter(Boolean);

function closeLoader() {
  loader?.classList.add('is-hidden');
  document.body.classList.remove('loading');
}

window.addEventListener('load', () => window.setTimeout(closeLoader, 1800));
window.setTimeout(closeLoader, 3400);

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 1900);
}

function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Sebunya;Stuart Sengonzi;;;',
    'FN:Stuart Sengonzi Sebunya',
    'ORG:Honest Estate Developers Ltd',
    'TITLE:Business Development Lead & Head of Diaspora Engagement',
    'TEL;TYPE=CELL,VOICE:+256750791591',
    'TEL;TYPE=WHATSAPP:+256750791591',
    'EMAIL;TYPE=INTERNET:mikart56@gmail.com',
    'ADR;TYPE=WORK:;;Martin Road;Old Kampala;;;Uganda',
    'URL:https://www.linkedin.com/in/stuart-sengonzi-mike',
    'NOTE:Business development, real estate, strategic partnerships and diaspora engagement.',
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'Stuart-Sengonzi-Sebunya.vcf';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 500);
  showToast('Stuart’s contact card is ready');
}

saveButtons.forEach((button) => button.addEventListener('click', downloadVCard));

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.animate(
        [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 520, easing: 'cubic-bezier(.22,.7,.2,1)', fill: 'both' }
      );
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  document.querySelectorAll('.profile-head, .profile-body, .connect-copy, .office-card').forEach((el) => observer.observe(el));
}
