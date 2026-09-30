(() => {
  'use strict';
  const menu = document.querySelector('[data-menu]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const closeMenu = () => { menu?.classList.remove('is-open'); toggle?.setAttribute('aria-expanded', 'false'); toggle?.setAttribute('aria-label', 'Menüyü aç'); };
  toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; menu.classList.toggle('is-open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç'); });
  menu?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
  document.addEventListener('click', e => { if (toggle?.getAttribute('aria-expanded') === 'true' && !e.target.closest('.header')) closeMenu(); });
  const config = window.ANADOLU_CONFIG || {};
  const validGA = /^G-[A-Z0-9]+$/.test(config.ga4Id || '');
  const validAds = /^AW-\d+$/.test(config.adsId || '');
  const measurementEnabled = validGA || validAds;
  const banner = document.querySelector('[data-cookie-banner]');
  const key = 'anadolu-cookie-choice-v1';
  let consent = null, loaded = false;
  try { consent = localStorage.getItem(key); } catch (_) {}
  const loadMeasurement = () => {
    if (!measurementEnabled || loaded || consent !== 'accepted') return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('consent', 'update', {ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'denied'});
    window.gtag('js', new Date());
    if (validGA) window.gtag('config', config.ga4Id, {allow_google_signals:false,allow_ad_personalization_signals:false});
    if (validAds) window.gtag('config', config.adsId, {allow_ad_personalization_signals:false});
    const script = document.createElement('script'); script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(validGA ? config.ga4Id : config.adsId);
    document.head.appendChild(script); loaded = true;
  };
  const forgetMeasurementCookies = () => {
    const names = document.cookie.split(';').map(c => c.trim().split('=')[0]).filter(n => /^(_ga|_gcl|_gid)/.test(n));
    const parts = location.hostname.split('.');
    names.forEach(name => {
      document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax';
      for (let i = 0; i < parts.length - 1; i++) document.cookie = name + '=; Max-Age=0; path=/; domain=.' + parts.slice(i).join('.') + '; SameSite=Lax';
    });
  };
  const chooseConsent = choice => {
    consent = choice; try { localStorage.setItem(key, choice); } catch (_) {}
    banner.hidden = true;
    if (choice === 'accepted') loadMeasurement();
    else if (loaded) { if (validGA) window['ga-disable-' + config.ga4Id] = true; window.gtag('consent','update',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'}); forgetMeasurementCookies(); location.reload(); }
  };
  if (measurementEnabled) {
    document.querySelectorAll('[data-cookie-open]').forEach(b => { b.hidden = false; b.addEventListener('click', () => { banner.hidden = false; banner.querySelector('button')?.focus(); }); });
    if (consent !== 'accepted' && consent !== 'rejected') banner.hidden = false;
    banner.querySelector('[data-accept]')?.addEventListener('click', () => chooseConsent('accepted'));
    banner.querySelector('[data-reject]')?.addEventListener('click', () => chooseConsent('rejected'));
    loadMeasurement();
  }
  const trackContact = (channel, source) => {
    if (!measurementEnabled || consent !== 'accepted' || !loaded || !window.gtag) return;
    // A contact click is intent, not a completed lead, call, message, or sale.
    if (validGA) window.gtag('event', 'contact_click', {contact_channel:channel,contact_placement:source,page_path:location.pathname,transport_type:'beacon'});
    const label = channel === 'phone' ? config.phoneConversionLabel : channel === 'whatsapp' ? config.whatsappConversionLabel : '';
    if (validAds && /^[A-Za-z0-9_-]+$/.test(label || '')) window.gtag('event', 'conversion', {send_to:config.adsId + '/' + label,transport_type:'beacon'});
  };
  document.querySelectorAll('[data-contact]').forEach(a => a.addEventListener('click', () => trackContact(a.dataset.contact, a.dataset.placement || 'page')));
  document.querySelectorAll('[data-quote-form]').forEach(form => {
    form.querySelector('[data-quote-submit]')?.removeAttribute('hidden');
    form.addEventListener('submit', e => {
      e.preventDefault(); if (!form.reportValidity()) return;
      const data = new FormData(form);
      const service = String(data.get('service') || '').trim();
      const region = String(data.get('region') || '').trim();
      const duration = String(data.get('duration') || '').trim();
      const notes = String(data.get('notes') || '').trim().slice(0,600);
      const message = `Merhaba Anadolu Manitou, Malatya için kiralama teklifi almak istiyorum.\n\nHizmet: ${service}\nİlçe / konum: ${region}\nKiralama süresi: ${duration}${notes ? '\nİş detayları: ' + notes : ''}`;
      const url = 'https://wa.me/' + encodeURIComponent(config.whatsappNumber) + '?text=' + encodeURIComponent(message);
      trackContact('whatsapp','quote_form');
      window.open(url, '_blank', 'noopener,noreferrer');
      const status = form.querySelector('[data-form-status]');
      status.replaceChildren(document.createTextNode('WhatsApp açılmadıysa '));
      const link = document.createElement('a'); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'hazırlanan mesajı buradan açın.'; link.style.textDecoration = 'underline'; status.appendChild(link);
    });
  });
})();
