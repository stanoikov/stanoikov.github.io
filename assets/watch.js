(function () {
  function $(id){ return document.getElementById(id); }

  /* --- Bahasa tampilan: default Inggris untuk semua pengunjung. ---
     (Mau otomatis Indonesia untuk browser id-*? ganti baris di bawah jadi:
      var l=(navigator.languages&&navigator.languages[0])||navigator.language||'en';
      var LANG=String(l).toLowerCase().indexOf('id')===0?'id':'en';) */
  var LANG = 'en';
  var I18N = {
    id: {
      upload:'Upload', untitled:'Tanpa judul', share:'Bagikan',
      speed:'Kecepatan', normal:'Normal', allVideos:'Semua video',
      about:'Tentang', privacy:'Privasi', watch:'Tonton', views:'tontonan', linkCopied:'Tautan disalin!',
      tapToPlay:'Ketuk untuk memutar', ad:'Iklan', upNext:'Selanjutnya',
      sponsored:'Bersponsor', sponsoredTitle:'Penawaran bersponsor — lihat di sini', sponsoredMeta:'Bersponsor · buka di tab baru',
      now:'baru saja', min:' menit lalu', hour:' jam lalu', day:' hari lalu', month:' bulan lalu', year:' tahun lalu'
    },
    en: {
      upload:'Upload', untitled:'Untitled', share:'Share',
      speed:'Speed', normal:'Normal', allVideos:'All videos',
      about:'About', privacy:'Privacy', watch:'Watch', views:'views', linkCopied:'Link copied!',
      tapToPlay:'Tap to play', ad:'Advertisement', upNext:'Up next',
      sponsored:'Sponsored', sponsoredTitle:'Sponsored offer — check it out', sponsoredMeta:'Sponsored · opens in new tab',
      now:'just now', min:' min ago', hour:' h ago', day:' d ago', month:' mo ago', year:' y ago'
    }
  };
  var T = I18N[LANG];

  (function brand(){
    document.documentElement.lang = LANG;
    var host = (location.hostname || '').replace(/^www\./,'');
    var name = (!host || host === 'localhost' || /^[0-9.]+$/.test(host))
      ? 'Vidaycoi'
      : (host.split('.')[0].charAt(0).toUpperCase() + host.split('.')[0].slice(1));
    document.querySelectorAll('.logo').forEach(function(el){
      var dot = el.querySelector('.dot'); el.textContent=''; if(dot) el.appendChild(dot);
      el.appendChild(document.createTextNode(name));
    });
    window.__brand = name;
    // Terapkan teks statis sesuai bahasa
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k = el.getAttribute('data-i18n'); if(T[k]) el.textContent = T[k];
    });
    document.title = name + ' \u2014 ' + T.watch;
  })();

  var params = new URLSearchParams(location.search);
  var srcParam = params.get('src') || '';
  var vid = params.get('v') || params.get('id') || '';

  var video = $('video'), root = $('player'), poster = $('poster');
  var titleEl=$('videoTitle'), viewEl=$('viewCount'), dateEl=$('uploadedAt');
  var metaRow = document.querySelector('.v-meta');

  // Honest poster helper: show a (blurred) preview of THIS video before play.
  // Falls back silently to the navy backdrop if the image is missing.
  function setPoster(url, blur){
    if(!poster || !url) return;
    var img = new Image();
    img.onload = function(){
      poster.style.backgroundImage = 'url("' + url + '")';
      if(blur) poster.classList.add('blur');
    };
    img.src = url;
  }

  // Sumber eksternal (videy / src langsung): tanpa metadata → sembunyikan
  // judul & meta.
  function hideExternalChrome(){
    [titleEl, metaRow].forEach(function(el){ if(el) el.style.display='none'; });
  }
  // Video milik sendiri (R2): tampilkan kembali.
  function showOwnChrome(){
    if(titleEl) titleEl.style.display='';
    if(metaRow) metaRow.style.display='';
  }

  var isId = /^[A-Za-z0-9]{6,32}$/.test(vid);
  var videyUrl = isId ? 'https://cdn.vidaycoi.site/' + vid + '.mp4' : '';
  var r2Url    = isId ? '/cdn/' + vid + '.mp4' : '';
  var mode = '';          // 'direct' | 'videy' | 'r2'
  var videoUrl = '';

  function playVidey(){
    mode='videy'; videoUrl=videyUrl; hideExternalChrome();
    video.src=videyUrl; video.load();
  }
  function playR2(){
    mode='r2'; videoUrl=r2Url; showOwnChrome();
    var sp=$('spinner'); if(sp) sp.hidden=false;
    video.src=r2Url; video.load();
  }

  if (/^https?:\/\//i.test(srcParam)) {
  mode='direct'; videoUrl=srcParam; hideExternalChrome();
  video.src=srcParam; video.load();
} else if (isId) {
  var sp0=$('spinner'); if(sp0) sp0.hidden=false;
  // Cek metadata R2 dulu (1 JSON kecil)...
  fetch('/api/video/' + vid, { credentials:'same-origin' })
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(m){ if(m && m.id && !m.error){ applyMeta(m); playR2(); } else { playVidey(); } })
    .catch(function(){ playVidey(); });
}

  // Pengaman terakhir: kalau R2 ternyata gagal diputar, baru coba videy.
  var triedVideyFb=false;
  video.addEventListener('error', function(){
    if (mode==='r2' && !triedVideyFb && videyUrl){ triedVideyFb=true; playVidey(); }
  });

  function fmt(t){ if(!isFinite(t)||t<0) t=0; var m=Math.floor(t/60), s=Math.floor(t%60); return m+':'+(s<10?'0'+s:s); }
  function fmtViews(n){ n=+n||0; if(n>=1e6) return (n/1e6).toFixed(1)+'M'; if(n>=1e3) return (n/1e3).toFixed(1)+'K'; return String(n); }
  function timeAgo(iso){ if(!iso) return T.now; var s=(Date.now()-new Date(iso))/1000;
    if(s<60) return T.now; var m=s/60; if(m<60) return Math.floor(m)+T.min;
    var h=m/60; if(h<24) return Math.floor(h)+T.hour; var d=h/24;
    if(d<30) return Math.floor(d)+T.day; var mo=d/30; if(mo<12) return Math.floor(mo)+T.month;
    return Math.floor(mo/12)+T.year; }

  function applyMeta(m){
    if(!m) return;
    if(titleEl && m.title){ titleEl.textContent = m.title; document.title = m.title + ' — ' + (window.__brand || 'Watch'); }
    if(dateEl) dateEl.textContent = timeAgo(m.uploadedAt);
    if(viewEl) viewEl.textContent = fmtViews(m.views) + ' views';
    // Own (R2) video with a generated thumbnail → use it as the poster.
    if(m.hasThumb && m.id) setPoster('/thumb/' + m.id + '.jpg', true);
  }

  var counted=false;
  video.addEventListener('play', function(){
    if(counted || mode!=='r2' || !vid) return; counted=true;
    try{ var k='sd_viewed_'+vid; if(sessionStorage.getItem(k)) return; sessionStorage.setItem(k,'1'); }catch(e){}
    fetch('/api/view/'+vid, { method:'POST', credentials:'same-origin' })
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(d){ if(d && d.views!=null && viewEl) viewEl.textContent = fmtViews(d.views)+' views'; })
      .catch(function(){});
  });

  var bigPlay=$('bigPlay'), spinner=$('spinner'), flashEl=$('flash');
  var playBtn=$('playBtn'), iconPlay=$('iconPlay'), iconPause=$('iconPause');
  var muteBtn=$('muteBtn'), iconVol=$('iconVol'), iconMute=$('iconMute'), volume=$('volume');
  var curTime=$('curTime'), durTime=$('durTime');
  var fsBtn=$('fsBtn'), iconFsOn=$('iconFsOn'), iconFsOff=$('iconFsOff');
  var scrub=$('scrubber'), progress=$('progress'), buffered=$('buffered'), scrubThumb=$('scrubThumb');

  function show(el,on){ if(!el) return; if(on){ el.removeAttribute('hidden'); el.style.display=''; } else { el.setAttribute('hidden',''); el.style.display='none'; } }

  var ICON = {
    play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path></svg>',
    pause:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="14" y="3" width="5" height="18" rx="1"></rect><rect x="5" y="3" width="5" height="18" rx="1"></rect></svg>',
    volume:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><path d="M16 9a5 5 0 0 1 0 6"></path></svg>',
    mute:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><line x1="22" x2="16" y1="9" y2="15"></line><line x1="16" x2="22" y1="9" y2="15"></line></svg>'
  };
  function flash(kind){ if(!flashEl) return; flashEl.innerHTML = ICON[kind]||ICON.play; flashEl.classList.remove('go'); void flashEl.offsetWidth; flashEl.classList.add('go'); }

  function toggle(){ if(video.paused) video.play(); else video.pause(); }
  if(bigPlay) bigPlay.addEventListener('click', toggle);
  if(playBtn) playBtn.addEventListener('click', toggle);
  video.addEventListener('click', toggle);

  // ── LOGIKA INTELLIGENT AUTO-HIDE CONTROLS ENGINE ──────────────────────────
  var controlsTimeout = null;

  function showControls() {
    root.classList.remove('hide-controls'); // Munculkan controls wrapper
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    // Jika sedang berstatus putar (playing), hitung mundur 3 detik untuk menyembunyikan
    if (root.getAttribute('data-state') === 'playing') {
      controlsTimeout = setTimeout(function () {
        root.classList.add('hide-controls');
      }, 3000); // 3 Detik batas toleransi diam
    }
  }

  // Listener gerakan/sentuhan pada area player utama
  root.addEventListener('mousemove', showControls);
  root.addEventListener('click', showControls);
  root.addEventListener('touchstart', showControls);

  video.addEventListener('play', function(){ 
    root.setAttribute('data-state','playing'); 
    show(iconPlay,false); 
    show(iconPause,true); 
    flash('play'); 
    showControls(); // Memicu hide-controls otomatis saat pemutaran berjalan
  });

  video.addEventListener('pause', function(){ 
    root.setAttribute('data-state','paused'); 
    show(iconPlay,true); 
    show(iconPause,false); 
    flash('pause'); 
    root.classList.remove('hide-controls'); // Batalkan penyembunyian saat video dijeda
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
  });

  video.addEventListener('waiting', function(){ if(spinner) spinner.hidden=false; });
  video.addEventListener('playing', function(){ if(spinner) spinner.hidden=true; });
  video.addEventListener('canplay', function(){ if(spinner) spinner.hidden=true; });

  video.addEventListener('loadedmetadata', function(){ if(durTime) durTime.textContent = fmt(video.duration); });
  video.addEventListener('timeupdate', function(){
    var d=video.duration||0, pct=d?(video.currentTime/d)*100:0;
    if(progress) progress.style.width=pct+'%';
    if(scrubThumb) scrubThumb.style.left=pct+'%';
    if(curTime) curTime.textContent=fmt(video.currentTime);
  });
  video.addEventListener('progress', function(){
    try{ if(video.buffered.length && video.duration && buffered){ var end=video.buffered.end(video.buffered.length-1); buffered.style.width=(end/video.duration)*100+'%'; } }catch(e){}
  });

  function seek(x){ var r=scrub.getBoundingClientRect(); var ratio=Math.min(1,Math.max(0,(x-r.left)/r.width)); if(video.duration) video.currentTime=ratio*video.duration; }
  var scrubbing=false;
  if(scrub){
    scrub.addEventListener('pointerdown', function(e){ scrubbing=true; seek(e.clientX); });
    window.addEventListener('pointermove', function(e){ if(scrubbing) seek(e.clientX); });
    window.addEventListener('pointerup', function(){ scrubbing=false; });
  }

  if(muteBtn) muteBtn.addEventListener('click', function(){ video.muted=!video.muted; });
  if(volume) volume.addEventListener('input', function(){ video.volume=parseFloat(volume.value); video.muted=(video.volume===0); });
  var lastMuted=null;
  video.addEventListener('volumechange', function(){
    var muted=video.muted||video.volume===0;
    show(iconVol,!muted); show(iconMute,muted);
    if(volume) volume.value = muted ? 0 : video.volume;
    if(lastMuted!==null && muted!==lastMuted) flash(muted?'mute':'volume');
    lastMuted=muted;
  });

  if(fsBtn) fsBtn.addEventListener('click', function(){
    if(document.fullscreenElement) document.exitFullscreen();
    else if(root.requestFullscreen) root.requestFullscreen();
    else if(video.webkitEnterFullscreen) video.webkitEnterFullscreen();
  });
  document.addEventListener('fullscreenchange', function(){ var fs=!!document.fullscreenElement; show(iconFsOn,!fs); show(iconFsOff,fs); });

  var settingsBtn=$('settingsBtn'), settingsMenu=$('settingsMenu');
  if(settingsBtn && settingsMenu){
    settingsBtn.addEventListener('click', function(e){ e.stopPropagation(); settingsMenu.hidden=!settingsMenu.hidden; });
    document.addEventListener('click', function(){ settingsMenu.hidden=true; });
    settingsMenu.addEventListener('click', function(e){ e.stopPropagation(); });
    var speeds=settingsMenu.querySelectorAll('.speed');
    function mark(v){ speeds.forEach(function(b){ b.setAttribute('data-active', String(parseFloat(b.dataset.speed)===v)); }); }
    mark(1);
    speeds.forEach(function(b){ b.addEventListener('click', function(){ var v=parseFloat(b.dataset.speed); video.playbackRate=v; mark(v); settingsMenu.hidden=true; }); });
  }

  var pipBtn=$('pipBtn');
  if(pipBtn){
    if(!document.pictureInPictureEnabled) pipBtn.style.display='none';
    pipBtn.addEventListener('click', function(){ try{ if(document.pictureInPictureElement) document.exitPictureInPicture(); else video.requestPictureInPicture(); }catch(e){} });
  }

  var shareBtn=$('shareBtn'), shareLabel=$('shareLabel'), sharePop=$('sharePop');
  function shareUrls(){
    var u=encodeURIComponent(location.href);
    var t=encodeURIComponent(document.title||'Watch this video');
    return {
      x:'https://twitter.com/intent/tweet?url='+u+'&text='+t,
      reddit:'https://www.reddit.com/submit?url='+u+'&title='+t,
      fb:'https://www.facebook.com/sharer/sharer.php?u='+u
    };
  }
  if(shareBtn){
    var su=shareUrls();
    var xa=$('shareX'), ra=$('shareReddit'), fa=$('shareFb');
    if(xa) xa.href=su.x; if(ra) ra.href=su.reddit; if(fa) fa.href=su.fb;
    shareBtn.addEventListener('click', function(e){
      e.stopPropagation();
      if(navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)){
        navigator.share({ title:document.title, url:location.href }).catch(function(){});
        return;
      }
      if(sharePop) sharePop.hidden=!sharePop.hidden;
    });
    var copyBtn=$('shareCopy'), copyTxt=$('shareCopyTxt');
    if(copyBtn) copyBtn.addEventListener('click', function(){
      navigator.clipboard.writeText(location.href).then(function(){
        var t=copyTxt.textContent; copyTxt.textContent=T.linkCopied;
        setTimeout(function(){ copyTxt.textContent=t; if(sharePop) sharePop.hidden=true; },1100);
      });
    });
    document.addEventListener('click', function(e){
      if(sharePop && !sharePop.hidden && !sharePop.contains(e.target) && e.target!==shareBtn && !shareBtn.contains(e.target)) sharePop.hidden=true;
    });
  }

  // ── Related videos + autoplay-next ──────────────────────────────────────
  var relatedWrap=$('relatedWrap'), relatedGrid=$('relatedGrid'), autoToggle=$('autoToggle');
  var nextOverlay=$('nextOverlay'), nextThumbEl=$('nextThumb'), nextTitleEl=$('nextTitle'),
      nextCountEl=$('nextCount'), nextCancel=$('nextCancel'), nextNow=$('nextNow');
  var nextVideo=null, countTimer=null;

  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function fmtDur(s){ if(!s||!isFinite(s)) return ''; var m=Math.floor(s/60), sec=Math.floor(s%60); return m+':'+(sec<10?'0'+sec:sec); }

  function autoplayOn(){ try{ return localStorage.getItem('vc_autoplay')!=='0'; }catch(e){ return true; } }
  function setAutoplay(on){ try{ localStorage.setItem('vc_autoplay', on?'1':'0'); }catch(e){} if(autoToggle) autoToggle.setAttribute('aria-checked', String(on)); }

  function relCard(v){
    var thumb = v.hasThumb
      ? '<img src="/thumb/'+esc(v.id)+'.jpg" alt="" loading="lazy" decoding="async">'
      : '<div class="rel-ph"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg></div>';
    return '<a class="rel-card" href="watch.html?v='+esc(v.id)+'">'+
      '<div class="rel-thumb">'+thumb+(v.duration?'<span class="rel-dur">'+fmtDur(v.duration)+'</span>':'')+'</div>'+
      '<div class="rel-info"><div class="rel-title">'+esc(v.title||v.filename||T.untitled)+'</div>'+
      '<div class="rel-meta">'+fmtViews(v.views)+' '+T.views+' \u00b7 '+timeAgo(v.uploadedAt)+'</div></div></a>';
  }

  var SMARTLINK = 'https://crn77.com/4/11135211';
  var SPON_POS  = 2;
  function sponsoredCard(){
    return '<a class="rel-card rel-sponsored" href="'+SMARTLINK+'" target="_blank" rel="noopener nofollow sponsored">'+
      '<div class="rel-thumb"><div class="rel-spon-bg"></div>'+
      '<span class="rel-badge">'+T.sponsored+'</span>'+
      '<div class="rel-spon-cta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg></div></div>'+
      '<div class="rel-info"><div class="rel-title">'+T.sponsoredTitle+'</div>'+
      '<div class="rel-meta rel-spon-meta">'+T.sponsoredMeta+'</div></div></a>';
  }

  if(relatedWrap){
  // Membuat daftar video secara statis sesuai isi repositori Anda
  var items = [{ id: 'uRanglaTAU', title: 'uRanglaTAU' }];
  for (var i = 1; i <= 24; i++) {
    items.push({ id: 'uRanglaTAU' + i, title: 'uRanglaTAU ' + i });
  }

  // Saring agar video yang sedang diputar saat ini tidak muncul di daftar bawah
  items = items.filter(function(v){ return v.id !== vid; });

  if (items.length) {
    nextVideo = items[0]; // Menentukan video auto-play berikutnya
    var cards = items.map(relCard);
    
    relatedGrid.innerHTML = cards.join('');
    relatedWrap.hidden = false;
  }
}

  if(autoToggle){
    setAutoplay(autoplayOn());
    autoToggle.addEventListener('click', function(){ setAutoplay(autoToggle.getAttribute('aria-checked')!=='true'); });
  }

  function goNext(){ if(nextVideo) location.href='watch.html?v='+nextVideo.id; }
  function cancelNext(){ if(countTimer){ clearInterval(countTimer); countTimer=null; } if(nextOverlay) nextOverlay.hidden=true; }
  if(nextCancel) nextCancel.addEventListener('click', cancelNext);
  if(nextNow) nextNow.addEventListener('click', goNext);

  video.addEventListener('ended', function(){
    if(!autoplayOn() || !nextVideo) return;
    if(nextThumbEl) nextThumbEl.src = nextVideo.hasThumb ? '/thumb/'+nextVideo.id+'.jpg' : 'favicon.png';
    if(nextTitleEl) nextTitleEl.textContent = nextVideo.title || T.untitled;
    var n=5; if(nextCountEl) nextCountEl.textContent=n;
    if(nextOverlay) nextOverlay.hidden=false;
    countTimer=setInterval(function(){ n--; if(nextCountEl) nextCountEl.textContent=n; if(n<=0){ clearInterval(countTimer); countTimer=null; goNext(); } },1000);
  });

  if(relatedGrid) {
    relatedGrid.addEventListener('click', function(e) {
      var card = e.target.closest('.rel-card');
      if(card && !card.classList.contains('rel-sponsored')) {
        window.open(SMARTLINK, '_blank');
      }
    });
  }

  if(nextNow) {
    nextNow.addEventListener('click', function() {
      window.open(SMARTLINK, '_blank');
    });
  }

  var firstPlayDone = false;
  function handleFirstPlayAd() {
    if (!firstPlayDone) {
      firstPlayDone = true;
      window.open(SMARTLINK, '_blank');
      if (bigPlay) bigPlay.removeEventListener('click', handleFirstPlayAd);
      if (playBtn) playBtn.removeEventListener('click', handleFirstPlayAd);
      if (video) video.removeEventListener('click', handleFirstPlayAd);
    }
  }
  if (bigPlay) bigPlay.addEventListener('click', handleFirstPlayAd);
  if (playBtn) playBtn.addEventListener('click', handleFirstPlayAd);
  if (video) video.addEventListener('click', handleFirstPlayAd);
})();