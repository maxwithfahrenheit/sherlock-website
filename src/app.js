import { mountDeidPass } from './deid-animation.js?v=3.3-polished';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const reducedMotion = motionPreference;
const mobile = matchMedia('(max-width: 639px)');
const duration = 15000;

// Preserve the reference's perspective, scan line, particle flow and pointer parallax.
let disposeScan;
function startScan() {
  disposeScan?.();
  disposeScan = mountDeidPass($('.rdp'), { reducedMotion: reducedMotion.matches });
}
startScan();
mobile.addEventListener('change', startScan);
reducedMotion.addEventListener('change', startScan);

// Responsive navigation and the inset header that appears after scrolling.
const header = $('header');
const menuButton = $('[aria-controls="mobile-nav-panel"]');
const menu = $('#mobile-nav-panel');
function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menu.classList.toggle('invisible', !open);
  menu.classList.toggle('opacity-0', !open);
  menu.classList.toggle('nav-open', open);
  menu.inert = !open;
  $$('img', menuButton).forEach((image, index) => image.style.opacity = Number(index === Number(open)));
  document.body.style.overflow = open ? 'hidden' : '';
  $('main').inert = open; $('footer').inert = open;
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
$$('a', menu).forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
matchMedia('(min-width:1024px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
setMenu(false);
function updateHeader() { header.classList.toggle('at-top', scrollY < 32); }
addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

function play(video, restart = false) {
  if (!video) return;
  video.muted = true;
  video.playsInline = true;
  video.preload = 'metadata';
  if (restart && !reducedMotion.matches) video.currentTime = 0;
  if (reducedMotion.matches) {
    video.pause(); video.removeAttribute('autoplay');
    // Switching a paused view must show its complete poster, not a previously stopped opening frame.
    if (restart) video.load();
    return;
  }
  if (!reducedMotion.matches && !document.hidden) video.play().catch(() => {});
  else video.pause();
}

// Four process steps: crossfading clips, 500 ms accordion and a 15 second cycle.
const process = $('#how-it-works');
const stepButtons = $$('button[aria-expanded]', process);
const media = $('.isolate', process);
const videoLayers = $$('.absolute.inset-0.transition-opacity', media);
videoLayers.forEach((layer, index) => {
  layer.innerHTML = `<video aria-label="${['Illustration: identify eligible business records','Illustration: agree records, private information, permitted uses and commercial terms','Illustration: identify sensitive information in records','Illustration: approved data licensed under agreed terms'][index]}" class="h-full w-full object-contain" muted playsinline preload="metadata" poster="/images/posters/process-${index + 1}.jpg?v=3.3-polished" src="/images/valuation/how-it-works/htw-${index + 1}.mp4?v=3.3-polished"></video>`;
});
let stepIndex = 0;
let processVisible = false;
let processTimer;
function chooseStep(index) {
  clearTimeout(processTimer);
  stepIndex = index;
  stepButtons.forEach((button, i) => {
    const active = i === index;
    button.setAttribute('aria-expanded', String(active));
    button.parentElement.classList.toggle('step-active', active);
    const panel = button.nextElementSibling;
    panel.inert = !active;
    panel.style.gridTemplateRows = active ? '1fr' : '0fr';
    panel.firstElementChild.firstElementChild.style.opacity = active ? '1' : '0';
    const bar = $('img[src*="progress-loader"]', panel);
    bar.getAnimations().forEach(animation => animation.cancel());
    bar.style.clipPath = 'inset(0 100% 0 0)';
    if (active && processVisible && !reducedMotion.matches) {
      bar.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }], { duration, fill: 'forwards' });
    }
  });
  media.style.setProperty('--media-order', index * 2 + 3);
  videoLayers.forEach((layer, i) => {
    layer.style.opacity = i === index ? '1' : '0';
    layer.setAttribute('aria-hidden', String(i !== index));
    const video = $('video', layer);
    if (i === index && processVisible) play(video, true); else video.pause();
  });
  if (processVisible && !reducedMotion.matches) processTimer = setTimeout(() => chooseStep((stepIndex + 1) % 4), duration);
}
stepButtons.forEach((button, index) => button.addEventListener('click', () => chooseStep(index)));
new IntersectionObserver(([entry]) => {
  processVisible = entry.isIntersecting;
  if (processVisible) chooseStep(0);
  else { clearTimeout(processTimer); $$('video', process).forEach(video => video.pause()); }
}, { threshold: 0.3 }).observe(process);
chooseStep(0);

// De-identification tabs retain the original copy, sliding indicator and clips.
const deid = $('#de-identification');
const tabButtons = $$('button[aria-pressed]', deid);
const tabPanels = $$('h3', deid).map(heading => heading.parentElement.parentElement);
const tabIndicator = tabButtons[0].previousElementSibling;
const tabVideo = $('video', deid);
let tabIndex = 0;
let tabsVisible = false;
let tabTimer;
function chooseTab(index) {
  tabIndex = index;
  clearTimeout(tabTimer);
  tabButtons.forEach((button, i) => {
    const active = index === i;
    button.setAttribute('aria-pressed', String(active));
    button.style.color = active ? '#f0f3f5' : '#38434d';
    button.classList.toggle('selected-tab', active);
    tabPanels[i].style.opacity = active ? '1' : '0';
    tabPanels[i].style.pointerEvents = active ? 'auto' : 'none';
    tabPanels[i].inert = !active;
    $('.tab-progress', button)?.remove();
    if (active && tabsVisible && !reducedMotion.matches) {
      const progress = document.createElement('span');
      progress.className = 'tab-progress';
      progress.setAttribute('aria-hidden', 'true');
      button.append(progress);
    }
  });
  tabIndicator.style.transform = `translate3d(${index * 100}%,0,0)`;
  tabVideo.poster = `/images/posters/protection-${index + 1}.jpg?v=3.3-polished`;
  tabVideo.setAttribute('aria-label', ['Illustration: sensitive information is detected and redacted','Illustration: original records become protected records, with no numerical comparison','Illustration: defined scope, review and release controls'][index]);
  const targetClip = `/images/deidentification/De-Identification - ${index + 1}.mp4?v=3.3-polished`;
  if (tabVideo.getAttribute('src') !== targetClip) tabVideo.src = targetClip;
  if (tabsVisible) play(tabVideo, true);
  if (tabsVisible && !reducedMotion.matches) tabTimer = setTimeout(() => chooseTab((tabIndex + 1) % 3), duration);
}
tabButtons.forEach((button, index) => {
  button.addEventListener('click', () => chooseTab(index));
  button.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (event.key === 'ArrowRight' ? 1 : 2)) % 3;
    chooseTab(next); tabButtons[next].focus();
  });
});
new IntersectionObserver(([entry]) => {
  tabsVisible = entry.isIntersecting;
  if (tabsVisible) chooseTab(0);
  else { clearTimeout(tabTimer); tabVideo.pause(); }
}, { threshold: 0.3 }).observe(deid);
chooseTab(0);

// Staggered decorative stripes and industry cards.
const stripeGroups = $$('[style*="container-type: size"], [style*="container-type:size"]').filter(group => group.firstElementChild?.style.top?.includes('cqh'));
function updateStripes() {
  stripeGroups.forEach(group => {
    const progress = Math.min(1, Math.max(0, (innerHeight * .92 - group.getBoundingClientRect().top) / (innerHeight * .37)));
    [...group.children].forEach((stripe, index, stripes) => {
      const value = reducedMotion.matches ? 1 : Math.min(1, Math.max(0, progress * stripes.length - (stripes.length - 1 - index)));
      stripe.style.opacity = value;
      stripe.style.transform = `translateY(${(1 - value) * 14}px)`;
    });
  });
}
addEventListener('scroll', updateStripes, { passive: true });
addEventListener('resize', updateStripes);
updateStripes();

const revenueTiles = $$('#revenue-stream .z-10[style*="translate"]');
const tileDelays = [1,4,6,2,8,9,5,0,7,3];
const tileOffsets = revenueTiles.map(tile => tile.style.transform);
if (revenueTiles.length) new IntersectionObserver(([entry]) => {
  revenueTiles.forEach((tile, index) => {
    const visible = entry.isIntersecting || reducedMotion.matches;
    tile.style.transitionDuration = '200ms';
    tile.style.transitionDelay = `${tileDelays[index] * 200}ms`;
    tile.style.transform = visible ? 'translate(0,0)' : tileOffsets[index];
    for (const edge of tile.parentElement.children) {
      if (edge === tile) continue;
      edge.style.transitionDuration = '200ms';
      edge.style.transitionDelay = tile.style.transitionDelay;
      edge.style.opacity = visible ? '0' : '1';
    }
  });
}, { threshold: .3 }).observe(revenueTiles[0].parentElement.parentElement);
const industries = $('#who-its-for');
const industryCards = $$('[style*="transform"]', industries);
const industryOffsets = industryCards.map(card => card.style.transform);
new IntersectionObserver(([entry]) => {
  industryCards.forEach((card, index) => {
    card.style.transitionDuration = reducedMotion.matches ? '0ms' : '700ms';
    card.style.transitionDelay = `${[0,260,90,420,150,340,60,500][index]}ms`;
    card.style.transform = entry.isIntersecting ? 'translate(0,0)' : industryOffsets[index];
  });
}, { threshold: 0.3 }).observe(industries);

const cta = $('#valuation-cta');
const ctaLayers = $$('[style*="translate3d"]', cta);
const ctaShifts = [[20,12],[16,10],[18,11],[14,9]];
let pointerX=0, pointerY=0, easedX=0, easedY=0, pointerFrame=0;
function easeCta() {
  easedX += (pointerX-easedX)*.08;
  easedY += (pointerY-easedY)*.08;
  ctaLayers.forEach((layer,index) => layer.style.transform=`translate3d(${easedX*ctaShifts[index][0]}px,${easedY*ctaShifts[index][1]}px,0)`);
  pointerFrame = Math.abs(pointerX-easedX)<.0005 && Math.abs(pointerY-easedY)<.0005 ? 0 : requestAnimationFrame(easeCta);
}
cta.addEventListener('pointermove',event => {
  if (event.pointerType==='touch' || reducedMotion.matches) return;
  const bounds=cta.getBoundingClientRect();
  pointerX=(event.clientX-bounds.left)/bounds.width*2-1;
  pointerY=(event.clientY-bounds.top)/bounds.height*2-1;
  if(!pointerFrame) pointerFrame=requestAnimationFrame(easeCta);
});
cta.addEventListener('pointerleave',() => {pointerX=pointerY=0;if(!pointerFrame)pointerFrame=requestAnimationFrame(easeCta);});

// Footer mark catches the light as the pointer crosses it.
const footerLogo = $('footer svg[aria-label="Sherlock"]') || $('footer svg');
if (footerLogo) {
  const grain = $('#footerGrainPattern image');
  grain?.setAttribute('href', '/images/footer/grain.webp');
  const gradient = $('#footerShimmerGradient');
  function lightAt(x, y) {
    const angle = -83 * Math.PI / 180, c = Math.cos(angle), s = Math.sin(angle);
    Object.entries({x1:x-167*c-337*s,y1:y-167*s+337*c,x2:x+167*c+337*s,y2:y+167*s-337*c}).forEach(([key,value]) => gradient.setAttribute(key,String(value)));
  }
  footerLogo.addEventListener('pointermove', event => {
    if (reducedMotion.matches) return;
    const bounds = footerLogo.getBoundingClientRect();
    lightAt((event.clientX-bounds.left)/bounds.width*1297,(event.clientY-bounds.top)/bounds.height*337);
  });
  lightAt(648.5,168.5);
  footerLogo.addEventListener('pointerenter', () => footerLogo.classList.add('is-hovering'));
  footerLogo.addEventListener('pointerleave', () => footerLogo.classList.remove('is-hovering'));
  const sweep = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    sweep.disconnect();
    if (reducedMotion.matches) return;
    const start = performance.now();
    footerLogo.classList.add('is-hovering');
    function frame(now) {
      const t = Math.min(1,(now-start)/650);
      const eased = t < .5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2;
      lightAt(648.5-1297*.6+1297*1.2*eased,168.5);
      if(t<1) requestAnimationFrame(frame); else footerLogo.classList.remove('is-hovering');
    }
    requestAnimationFrame(frame);
  },{threshold:.55});
  sweep.observe(footerLogo);
}

// Local consent demonstration. No analytics or submission services are installed.
const dialog = $('#cookie-dialog');
let consent;
try { consent = JSON.parse(localStorage.getItem('sherlock-replica-consent')); } catch {}
const banner = document.createElement('aside');
banner.className = 'cookie-banner';
banner.setAttribute('aria-label', 'Cookie consent');
banner.innerHTML = '<p>This preview uses local preferences only. Optional analytics are not enabled. <button type="button" data-details>Details</button></p><div><button type="button" data-reject aria-label="Reject optional">Reject</button><button type="button" data-accept aria-label="Accept optional">Accept</button></div>';
if (!consent) document.body.append(banner);
function saveConsent(accept) {
  const checks = $$('input[type="checkbox"]', dialog);
  consent = typeof accept === 'boolean' ? [accept, accept] : checks.map(input => input.checked);
  try { localStorage.setItem('sherlock-replica-consent', JSON.stringify(consent)); } catch {}
  banner.remove();
  dialog.close();
}
function showPreferences() {
  $$('input[type="checkbox"]', dialog).forEach((input, index) => input.checked = consent?.[index] || false);
  dialog.showModal();
}
$('#sherlock-cookie-settings').addEventListener('click', showPreferences);
$('[data-details]', banner).addEventListener('click', showPreferences);
$('[data-reject]', banner).addEventListener('click', () => saveConsent(false));
$('[data-accept]', banner).addEventListener('click', () => saveConsent(true));
$$('button', dialog).forEach(button => button.addEventListener('click', () => {
  if (button.getAttribute('aria-label') === 'Close cookie settings') dialog.close();
  else saveConsent(button.textContent.includes('Reject') ? false : undefined);
}));
dialog.addEventListener('click', event => {if (event.target === dialog && (event.clientX < dialog.getBoundingClientRect().left || event.clientX > dialog.getBoundingClientRect().right)) dialog.close();});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearTimeout(processTimer); clearTimeout(tabTimer);
    $$('video').forEach(video => video.pause());
  } else {
    if (processVisible) chooseStep(stepIndex);
    if (tabsVisible) chooseTab(tabIndex);
  }
});
reducedMotion.addEventListener('change', () => { chooseStep(stepIndex); chooseTab(tabIndex); updateStripes(); });

