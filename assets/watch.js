const MAIN = [
  { user: "@XPglsQ1c1", src: "https://cdn.videy.co/XPglsQ1c1.mp4" },
  { user: "@rNqOw2C11", src: "https://cdn.videy.co/rNqOw2C11.mp4" },
  { user: "@Shr4oHQ01", src: "https://cdn.videy.co/Shr4oHQ01.mp4" },
  { user: "@SGQgUihZ1", src: "https://cdn.videy.co/SGQgUihZ1.mp4" },
  { user: "@8FRGZPuG1", src: "https://cdn.videy.co/8FRGZPuG1.mp4" }
];

// Pastikan array MORE terdefinisi agar tidak terjadi ReferenceError
const MORE = []; 

// Menggabungkan semua video untuk pencarian mudah
const ALL_VIDEOS = MAIN.concat(MORE);

(() => {
  const $ = id => document.getElementById(id);

  const LANG = 'en';
  const I18N = {
    id: {
      upload: 'Upload', untitled: 'Tanpa judul', share: 'Bagikan',
      speed: 'Kecepatan', normal: 'Normal', allVideos: 'Semua video',
      about: 'Tentang', privacy: 'Privasi', watch: 'Tonton', views: 'tontonan', linkCopied: 'Tautan disalin!',
      tapToPlay: 'Ketuk untuk memutar', ad: 'Iklan', upNext: 'Selanjutnya',
      sponsored: 'Bersponsor', sponsoredTitle: 'Penawaran bersponsor — lihat di sini', sponsoredMeta: 'Bersponsor · buka di tab baru',
      now: 'baru saja', min: ' menit lalu', hour: ' jam lalu', day: ' hari lalu', month: ' bulan lalu', year: ' tahun lalu'
    },
    en: {
      upload: 'Upload', untitled: 'Untitled', share: 'Share',
      speed: 'Speed', normal: 'Normal', allVideos: 'All videos',
      about: 'About', privacy: 'Privacy', watch: 'Watch', views: 'views', linkCopied: 'Link copied!',
      tapToPlay: 'Tap to play', ad: 'Advertisement', upNext: 'Up next',
      sponsored: 'Sponsored', sponsoredTitle: 'Sponsored offer — check it out', sponsoredMeta: 'Sponsored · opens in new tab',
      now: 'just now', min: ' min ago', hour: ' h ago', day: ' d ago', month: ' mo ago', year: ' y ago'
    }
  };
  const T = I18N[LANG];

  // Inisialisasi Brand & i18n teks halaman
  (() => {
    document.documentElement.lang = LANG;
    const host = (location.hostname || '').replace(/^www\./, '');
    const name = (!host || host === 'localhost' || /^[0-9.]+$/.test(host))
      ? 'Vidaycoi'
      : (host.split('.')[0].charAt(0).toUpperCase() + host.split('.')[0].slice(1));
    
    document.querySelectorAll('.logo').forEach(el => {
      const dot = el.querySelector('.dot'); 
      el.textContent = ''; 
      if (dot) el.appendChild(dot);
      el.appendChild(document.createTextNode(name));
    });
    
    window.__brand = name;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n'); 
      if (T[k]) el.textContent = T[k];
    });
    document.title = `${name} \u2014 ${T.watch}`;
  })();

  const params = new URLSearchParams(location.search);
  const srcParam = params.get('src') || '';
  const vid = params.get('v') || params.get('id') || '';

  const video = $('video'), root = $('player'), poster = $('poster');
  const titleEl = $('videoTitle'), viewEl = $('viewCount'), dateEl = $('uploadedAt');
  const metaRow = document.querySelector('.v-meta');

  const setPoster = (url, blur) => {
    if (!poster || !url) return;
    const img = new Image();
    img.onload = () => {
      poster.style.backgroundImage = `url("${url}")`;
      if (blur) poster.classList.add('blur');
    };
    img.src = url;
  };

  const hideExternalChrome = () => {
    [titleEl, metaRow].forEach(el => { if (el) el.style.display = 'none'; });
  };

  const showOwnChrome = () => {
    if (titleEl) titleEl.style.display = '';
    if (metaRow) metaRow.style.display = '';
  };

  const isId = /^[A-Za-z0-9]{6,32}$/.test(vid);
  const videyUrl = isId ? `https://cdn2.videy.co/${vid}.mp4` : '';
  let mode = '';
  let videoUrl = '';

  const playVidey = () => {
    mode = 'videy'; 
    videoUrl = videyUrl; 
    hideExternalChrome();
    video.src = videyUrl; 
    video.load();
  };

  if (/^https?:\/\//i.test(srcParam)) {
    mode = 'direct'; 
    videoUrl = srcParam; 
    hideExternalChrome();
    video.src = srcParam; 
    video.load();
  } else if (isId) {
    mode = 'local';
    
    // Pencarian video dari array MAIN/MORE berdasarkan ID (menghapus tanda '@')
    const currentVideo = ALL_VIDEOS.find(v => {
      const cleanUser = v.user.replace('@', '');
      return cleanUser === vid || v.user === vid;
    });

    if (currentVideo) {
      videoUrl = currentVideo.src; 
      if (titleEl) titleEl.textContent = currentVideo.user;
    } else {
      // Fallback langsung ke cdn.videy.co jika ID tidak terdaftar di list
      videoUrl = `https://cdn.videy.co/${vid}.mp4`;
      if (titleEl) titleEl.textContent = vid;
    }

    showOwnChrome();
    video.src = videoUrl;
    video.load();
  }

  let triedVideyFb = false;
  video.addEventListener('error', () => {
    if (mode === 'local' && !triedVideyFb && videyUrl) { 
      triedVideyFb = true; 
      playVidey(); 
    }
  });

  const fmt = t => { 
    if (!isFinite(t) || t < 0) t = 0; 
    const m = Math.floor(t / 60), s = Math.floor(t % 60); 
    return `${m}:${s < 10 ? '0' : ''}${s}`; 
  };
  
  const fmtViews = n => { 
    n = +n || 0; 
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'; 
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'; 
    return String(n); 
  };
  
  const timeAgo = iso => { 
    if (!iso) return T.now; 
    const s = (Date.now() - new Date(iso)) / 1000;
    if (s < 60) return T.now; 
    const m = s / 60; if (m < 60) return Math.floor(m) + T.min;
    const h = m / 60; if (h < 24) return Math.floor(h) + T.hour; 
    const d = h / 24; if (d < 30) return Math.floor(d) + T.day; 
    const mo = d / 30; if (mo < 12) return Math.floor(mo) + T.month;
    return Math.floor(mo / 12) + T.year; 
  };

  const applyMeta = m => {
    if (!m) return;
    if (titleEl && m.title) { 
      titleEl.textContent = m.title; 
      document.title = `${m.title} — ${window.__brand || 'Watch'}`; 
    }
    if (dateEl) dateEl.textContent = timeAgo(m.uploadedAt);
    if (viewEl) viewEl.textContent = `${fmtViews(m.views)} views`;
    if (m.hasThumb && m.id) setPoster(`/thumb/${m.id}.jpg`, true);
  };

  let counted = false;
  video.addEventListener('play', () => {
    if (counted || mode !== 'local' || !vid) return; 
    counted = true;
    try { 
      const k = `sd_viewed_${vid}`; 
      if (sessionStorage.getItem(k)) return; 
      sessionStorage.setItem(k, '1'); 
    } catch (e) {}
  });

  const bigPlay = $('bigPlay'), spinner = $('spinner'), flashEl = $('flash');
  const playBtn = $('playBtn'), iconPlay = $('iconPlay'), iconPause = $('iconPause');
  const muteBtn = $('muteBtn'), iconVol = $('iconVol'), iconMute = $('iconMute'), volume = $('volume');
  const curTime = $('curTime'), durTime = $('durTime');
  const fsBtn = $('fsBtn'), iconFsOn = $('iconFsOn'), iconFsOff = $('iconFsOff');
  const scrub = $('scrubber'), progress = $('progress'), buffered = $('buffered'), scrubThumb = $('scrubThumb');

  const show = (el, on) => { 
    if (!el) return; 
    if (on) { 
      el.removeAttribute('hidden'); 
      el.style.display = ''; 
    } else { 
      el.setAttribute('hidden', ''); 
      el.style.display = 'none'; 
    } 
  };

  const ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="14" y="3" width="5" height="18" rx="1"></rect><rect x="5" y="3" width="5" height="18" rx="1"></rect></svg>',
    volume: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><path d="M16 9a5 5 0 0 1 0 6"></path></svg>',
    mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><line x1="22" x2="16" y1="9" y2="15"></line><line x1="16" x2="22" y1="9" y2="15"></line></svg>'
  };

  const flash = kind => { 
    if (!flashEl) return; 
    flashEl.innerHTML = ICON[kind] || ICON.play; 
    flashEl.classList.remove('go'); 
    void flashEl.offsetWidth; 
    flashEl.classList.add('go'); 
  };

  const toggle = () => { if (video.paused) video.play(); else video.pause(); };
  if (bigPlay) bigPlay.addEventListener('click', toggle);
  if (playBtn) playBtn.addEventListener('click', toggle);
  video.addEventListener('click', toggle);

  let controlsTimeout = null;
  const showControls = () => {
    root.classList.remove('hide-controls'); 
    if (controlsTimeout) clearTimeout(controlsTimeout);
    if (root.getAttribute('data-state') === 'playing') {
      controlsTimeout = setTimeout(() => {
        root.classList.add('hide-controls');
      }, 3000); 
    }
  };

  root.addEventListener('mousemove', showControls);
  root.addEventListener('click', showControls);
  root.addEventListener('touchstart', showControls);

  video.addEventListener('play', () => { 
    root.setAttribute('data-state', 'playing'); 
    show(iconPlay, false); 
    show(iconPause, true); 
    flash('play'); 
    showControls(); 
  });

  video.addEventListener('pause', () => { 
    root.setAttribute('data-state', 'paused'); 
    show(iconPlay, true); 
    show(iconPause, false); 
    flash('pause'); 
    root.classList.remove('hide-controls'); 
    if (controlsTimeout) clearTimeout(controlsTimeout);
  });

  video.addEventListener('waiting', () => { if (spinner) spinner.hidden = false; });
  video.addEventListener('playing', () => { if (spinner) spinner.hidden = true; });
  video.addEventListener('canplay', () => { if (spinner) spinner.hidden = true; });

  video.addEventListener('loadedmetadata', () => { if (durTime) durTime.textContent = fmt(video.duration); });
  video.addEventListener('timeupdate', () => {
    const d = video.duration || 0, pct = d ? (video.currentTime / d) * 100 : 0;
    if (progress) progress.style.width = `${pct}%`;
    if (scrubThumb) scrubThumb.style.left = `${pct}%`;
    if (curTime) curTime.textContent = fmt(video.currentTime);
  });
  video.addEventListener('progress', () => {
    try { 
      if (video.buffered.length && video.duration && buffered) { 
        const end = video.buffered.end(video.buffered.length - 1); 
        buffered.style.width = `${(end / video.duration) * 100}%`; 
      } 
    } catch (e) {}
  });

  const seek = x => { 
    const r = scrub.getBoundingClientRect(); 
    const ratio = Math.min(1, Math.max(0, (x - r.left) / r.width)); 
    if (video.duration) video.currentTime = ratio * video.duration; 
  };
  
  let scrubbing = false;
  if (scrub) {
    scrub.addEventListener('pointerdown', e => { scrubbing = true; seek(e.clientX); });
    window.addEventListener('pointermove', e => { if (scrubbing) seek(e.clientX); });
    window.addEventListener('pointerup', () => { scrubbing = false; });
  }

  if (muteBtn) muteBtn.addEventListener('click', () => { video.muted = !video.muted; });
  if (volume) volume.addEventListener('input', () => { video.volume = parseFloat(volume.value); video.muted = (video.volume === 0); });
  
  let lastMuted = null;
  video.addEventListener('volumechange', () => {
    const muted = video.muted || video.volume === 0;
    show(iconVol, !muted); show(iconMute, muted);
    if (volume) volume.value = muted ? 0 : video.volume;
    if (lastMuted !== null && muted !== lastMuted) flash(muted ? 'mute' : 'volume');
    lastMuted = muted;
  });

  if (fsBtn) fsBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (root.requestFullscreen) root.requestFullscreen();
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
  });
  document.addEventListener('fullscreenchange', () => { const fs = !!document.fullscreenElement; show(iconFsOn, !fs); show(iconFsOff, fs); });

  const settingsBtn = $('settingsBtn'), settingsMenu = $('settingsMenu');
  if (settingsBtn && settingsMenu) {
    settingsBtn.addEventListener('click', e => { e.stopPropagation(); settingsMenu.hidden = !settingsMenu.hidden; });
    document.addEventListener('click', () => { settingsMenu.hidden = true; });
    settingsMenu.addEventListener('click', e => { e.stopPropagation(); });
    
    const speeds = settingsMenu.querySelectorAll('.speed');
    const mark = v => { speeds.forEach(b => { b.setAttribute('data-active', String(parseFloat(b.dataset.speed) === v)); }); };
    mark(1);
    
    speeds.forEach(b => { 
      b.addEventListener('click', () => { 
        const v = parseFloat(b.dataset.speed); 
        video.playbackRate = v; 
        mark(v); 
        settingsMenu.hidden = true; 
      }); 
    });
  }

  const pipBtn = $('pipBtn');
  if (pipBtn) {
    if (!document.pictureInPictureEnabled) pipBtn.style.display = 'none';
    pipBtn.addEventListener('click', () => { try { if (document.pictureInPictureElement) document.exitPictureInPicture(); else video.requestPictureInPicture(); } catch (e) {} });
  }

  const shareBtn = $('shareBtn'), sharePop = $('sharePop');
  const shareUrls = () => {
    const u = encodeURIComponent(location.href);
    const t = encodeURIComponent(document.title || 'Watch this video');
    return {
      x: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      reddit: `https://www.reddit.com/submit?url=${u}&title=${t}`,
      fb: `https://www.facebook.com/sharer/sharer.php?u=${u}`
    };
  };
  
  if (shareBtn) {
    const su = shareUrls();
    const xa = $('shareX'), ra = $('shareReddit'), fa = $('shareFb');
    if (xa) xa.href = su.x; if (ra) ra.href = su.reddit; if (fa) fa.href = su.fb;
    
    shareBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        navigator.share({ title: document.title, url: location.href }).catch(() => {});
        return;
      }
      if (sharePop) sharePop.hidden = !sharePop.hidden;
    });
    
    const copyBtn = $('shareCopy'), copyTxt = $('shareCopyTxt');
    if (copyBtn) copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(location.href).then(() => {
        const t = copyTxt.textContent; 
        copyTxt.textContent = T.linkCopied;
        setTimeout(() => { copyTxt.textContent = t; if (sharePop) sharePop.hidden = true; }, 1100);
      });
    });
    
    document.addEventListener('click', e => {
      if (sharePop && !sharePop.hidden && !sharePop.contains(e.target) && e.target !== shareBtn && !shareBtn.contains(e.target)) sharePop.hidden = true;
    });
  }

  const relatedWrap = $('relatedWrap'), relatedGrid = $('relatedGrid'), autoToggle = $('autoToggle');
  const nextOverlay = $('nextOverlay'), nextThumbEl = $('nextThumb'), nextTitleEl = $('nextTitle'),
        nextCountEl = $('nextCount'), nextCancel = $('nextCancel'), nextNow = $('nextNow');
  let nextVideo = null, countTimer = null;

  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fmtDur = s => { if (!s || !isFinite(s)) return ''; const m = Math.floor(s / 60), sec = Math.floor(s % 60); return `${m}:${sec < 10 ? '0' : ''}${sec}`; };

  const autoplayOn = () => { try { return localStorage.getItem('vc_autoplay') !== '0'; } catch (e) { return true; } };
  const setAutoplay = on => { try { localStorage.setItem('vc_autoplay', on ? '1' : '0'); } catch (e) {} if (autoToggle) autoToggle.setAttribute('aria-checked', String(on)); };

  const relCard = v => {
    const thumb = v.hasThumb
      ? `<img src="/thumb/${esc(v.id)}.jpg" alt="" loading="lazy" decoding="async">`
      : '<div class="rel-ph"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg></div>';
    return `<a class="rel-card" href="watch.html?v=${esc(v.id)}">` +
      `<div class="rel-thumb">${thumb}${v.duration ? `<span class="rel-dur">${fmtDur(v.duration)}</span>` : ''}</div>` +
      `<div class="rel-info"><div class="rel-title">${esc(v.title || v.filename || T.untitled)}</div>` +
      `<div class="rel-meta">${fmtViews(v.views)} ${T.views} \u00b7 ${timeAgo(v.uploadedAt)}</div></div></a>`;
  };

  const SMARTLINK = 'https://crn77.com/4/11135211';

  if (relatedWrap) {
    const items = ALL_VIDEOS.filter(v => v.user.replace('@', '') !== vid).map(v => {
      const cleanId = v.user.replace('@', '');
      return { id: cleanId, title: v.user };
    });

    if (items.length) {
      nextVideo = items[0];
      const cards = items.slice(0, 12).map(relCard);
      relatedGrid.innerHTML = cards.join('');
      relatedWrap.hidden = false;
    }
  }

  if (autoToggle) {
    setAutoplay(autoplayOn());
    autoToggle.addEventListener('click', () => { setAutoplay(autoToggle.getAttribute('aria-checked') !== 'true'); });
  }

  const goNext = () => { if (nextVideo) location.href = `watch.html?v=${nextVideo.id}`; };
  const cancelNext = () => { if (countTimer) { clearInterval(countTimer); countTimer = null; } if (nextOverlay) nextOverlay.hidden = true; };
  if (nextCancel) nextCancel.addEventListener('click', cancelNext);
  if (nextNow) nextNow.addEventListener('click', goNext);

  video.addEventListener('ended', () => {
    if (!autoplayOn() || !nextVideo) return;
    if (nextThumbEl) nextThumbEl.src = nextVideo.hasThumb ? `/thumb/${nextVideo.id}.jpg` : 'favicon.png';
    if (nextTitleEl) nextTitleEl.textContent = nextVideo.title || T.untitled;
    let n = 5; if (nextCountEl) nextCountEl.textContent = n;
    if (nextOverlay) nextOverlay.hidden = false;
    countTimer = setInterval(() => { n--; if (nextCountEl) nextCountEl.textContent = n; if (n <= 0) { clearInterval(countTimer); countTimer = null; goNext(); } }, 1000);
  });

  if (relatedGrid) {
    relatedGrid.addEventListener('click', e => {
      const card = e.target.closest('.rel-card');
      if (card && !card.classList.contains('rel-sponsored')) {
        window.open(SMARTLINK, '_blank');
      }
    });
  }

  if (nextNow) {
    nextNow.addEventListener('click', () => { window.open(SMARTLINK, '_blank'); });
  }

  let firstPlayDone = false;
  const handleFirstPlayAd = () => {
    if (!firstPlayDone) {
      firstPlayDone = true;
      window.open(SMARTLINK, '_blank');
      if (bigPlay) bigPlay.removeEventListener('click', handleFirstPlayAd);
      if (playBtn) playBtn.removeEventListener('click', handleFirstPlayAd);
      if (video) video.removeEventListener('click', handleFirstPlayAd);
    }
  };
  
  if (bigPlay) bigPlay.addEventListener('click', handleFirstPlayAd);
  if (playBtn) playBtn.addEventListener('click', handleFirstPlayAd);
  if (video) video.addEventListener('click', handleFirstPlayAd);
})();
