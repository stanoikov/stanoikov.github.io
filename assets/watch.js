const MAIN = [
  { user:"@XPglsQ1c1", src:"https://cdn.videy.co/XPglsQ1c1.mp4", target:"https://colahcola078.github.io/XPglsQ1c1.mp4" },
  { user:"@rNqOw2C11", src:"https://cdn.videy.co/rNqOw2C11.mp4", target:"https://colahcola078.github.io/rNqOw2C11.mp4" },
  { user:"@jFtts4z21", src:"https://cdn.videy.co/jFtts4z21.mp4", target:"https://colahcola078.github.io/jFtts4z21.mp4" },
  { user:"@Shr4oHQ01", src:"https://cdn.videy.co/Shr4oHQ01.mp4", target:"https://colahcola078.github.io/Shr4oHQ01.mp4" },
  { user:"@SGQgUihZ1", src:"https://cdn.videy.co/SGQgUihZ1.mp4", target:"https://colahcola078.github.io/SGQgUihZ1.mp4" },
  { user:"@8BpARWbm1", src:"https://cdn.videy.co/8BpARWbm1.mp4", target:"https://colahcola078.github.io/8BpARWbm1.mp4" },
  { user:"@JiW2s6Qx1", src:"https://cdn.videy.co/JiW2s6Qx1.mp4", target:"https://colahcola078.github.io/JiW2s6Qx1.mp4" },
  { user:"@sGE0bP8L1", src:"https://cdn.videy.co/sGE0bP8L1.mp4", target:"https://colahcola078.github.io/sGE0bP8L1.mp4" },
  { user:"@8FRGZPuG1", src:"https://cdn.videy.co/8FRGZPuG1.mp4", target:"https://colahcola078.github.io/8FRGZPuG1.mp4" }
];

const MORE = [
  { user:"@la1Kavd61", src:"https://cdn.videy.co/la1Kavd61.mp4", target:"https://colahcola078.github.io/la1Kavd61.mp4" },
  { user:"@iQQxGZw21", src:"https://cdn.videy.co/iQQxGZw21.mp4", target:"https://colahcola078.github.io/iQQxGZw21.mp4" },
  { user:"@jWEZ8ff91", src:"https://cdn.videy.co/jWEZ8ff91.mp4", target:"https://colahcola078.github.io/jWEZ8ff91.mp4" },
  { user:"@5mkh055S1", src:"https://cdn.videy.co/5mkh055S1.mp4", target:"https://colahcola078.github.io/5mkh055S1.mp4" },
  { user:"@bqinMeuU1", src:"https://cdn.videy.co/bqinMeuU1.mp4", target:"https://colahcola078.github.io/bqinMeuU1.mp4" },
  { user:"@lavQiyRt1", src:"https://cdn.videy.co/lavQiyRt1.mp4", target:"https://colahcola078.github.io/lavQiyRt1.mp4" },
  { user:"@O0zslLHn1", src:"https://cdn.videy.co/O0zslLHn1.mp4", target:"https://colahcola078.github.io/O0zslLHn1.mp4" },
  { user:"@wjUQ8pki1", src:"https://cdn.videy.co/wjUQ8pki1.mp4", target:"https://colahcola078.github.io/wjUQ8pki1.mp4" },
  { user:"@zXxGt8KP1", src:"https://cdn.videy.co/zXxGt8KP1.mp4", target:"https://colahcola078.github.io/zXxGt8KP1.mp4" },
  { user:"@xzIl7niD1", src:"https://cdn.videy.co/xzIl7niD1.mp4", target:"https://colahcola078.github.io/xzIl7niD1.mp4" },
  { user:"@Yoc709wf1", src:"https://cdn.videy.co/Yoc709wf1.mp4", target:"https://colahcola078.github.io/Yoc709wf1.mp4" },
  { user:"@rS99hGLo1", src:"https://cdn.videy.co/rS99hGLo1.mp4", target:"https://colahcola078.github.io/rS99hGLo1.mp4" },
  { user:"@iH2E1W7i1", src:"https://cdn.videy.co/iH2E1W7i1.mp4", target:"https://colahcola078.github.io/iH2E1W7i1.mp4" },
  { user:"@Gjkd1tnR1", src:"https://cdn.videy.co/Gjkd1tnR1.mp4", target:"https://colahcola078.github.io/Gjkd1tnR1.mp4" },
  { user:"@KxhZLomR1", src:"https://cdn.videy.co/KxhZLomR1.mp4", target:"https://colahcola078.github.io/KxhZLomR1.mp4" },
  { user:"@W7DO6llC1", src:"https://cdn.videy.co/W7DO6llC1.mp4", target:"https://colahcola078.github.io/W7DO6llC1.mp4" },
  { user:"@5J9uwV4t1", src:"https://cdn.videy.co/5J9uwV4t1.mp4", target:"https://colahcola078.github.io/5J9uwV4t1.mp4" },
  { user:"@E5koyMrG1", src:"https://cdn.videy.co/E5koyMrG1.mp4", target:"https://colahcola078.github.io/E5koyMrG1.mp4" },
  { user:"@ykdjPPXT1", src:"https://cdn.videy.co/ykdjPPXT1.mp4", target:"https://colahcola078.github.io/ykdjPPXT1.mp4" }
];

// Menggabungkan semua video untuk pencarian mudah
const ALL_VIDEOS = MAIN.concat(MORE);

(function () {
  function $(id){ return document.getElementById(id); }

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

  function setPoster(url, blur){
    if(!poster || !url) return;
    var img = new Image();
    img.onload = function(){
      poster.style.backgroundImage = 'url("' + url + '")';
      if(blur) poster.classList.add('blur');
    };
    img.src = url;
  }

  function hideExternalChrome(){
    [titleEl, metaRow].forEach(function(el){ if(el) el.style.display='none'; });
  }

  function showOwnChrome(){
    if(titleEl) titleEl.style.display='';
    if(metaRow) metaRow.style.display='';
  }

  var isId = /^[A-Za-z0-9]{6,32}$/.test(vid);
  var videyUrl = isId ? 'https://cdn.vidaycoi.site/' + vid + '.mp4' : '';
  var mode = '';
  var videoUrl = '';

  function playVidey(){
    mode='videy'; videoUrl=videyUrl; hideExternalChrome();
    video.src=videyUrl; video.load();
  }

  if (/^https?:\/\//i.test(srcParam)) {
    mode='direct'; videoUrl=srcParam; hideExternalChrome();
    video.src=srcParam; video.load();
  } else if (isId) {
    mode = 'local';
    
    // Pencarian video dari array MAIN/MORE berdasarkan ID (menghapus tanda '@')
    var currentVideo = ALL_VIDEOS.find(function(v) {
      var cleanUser = v.user.replace('@', '');
      return cleanUser === vid || v.user === vid;
    });

    if (currentVideo) {
      videoUrl = currentVideo.target; // Menggunakan link colahcola078.github.io
      if (titleEl) titleEl.textContent = currentVideo.user;
    } else {
      // Fallback jika ID tidak ada di list
      videoUrl = vid + '.mp4';
      if (titleEl) titleEl.textContent = vid;
    }

    showOwnChrome();
    video.src = videoUrl;
    video.load();
  }

  var triedVideyFb=false;
  video.addEventListener('error', function(){
    if (mode==='local' && !triedVideyFb && videyUrl){ triedVideyFb=true; playVidey(); }
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
    if(m.hasThumb && m.id) setPoster('/thumb/' + m.id + '.jpg', true);
  }

  var counted=false;
  video.addEventListener('play', function(){
    if(counted || mode!=='local' || !vid) return; counted=true;
    try{ var k='sd_viewed_'+vid; if(sessionStorage.getItem(k)) return; sessionStorage.setItem(k,'1'); }catch(e){}
    // Fetch count log statis/diabaikan karena tidak ada API
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

  var controlsTimeout = null;
  function showControls() {
    root.classList.remove('hide-controls'); 
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    if (root.getAttribute('data-state') === 'playing') {
      controlsTimeout = setTimeout(function () {
        root.classList.add('hide-controls');
      }, 3000); 
    }
  }

  root.addEventListener('mousemove', showControls);
  root.addEventListener('click', showControls);
  root.addEventListener('touchstart', showControls);

  video.addEventListener('play', function(){ 
    root.setAttribute('data-state','playing'); 
    show(iconPlay,false); 
    show(iconPause,true); 
    flash('play'); 
    showControls(); 
  });

  video.addEventListener('pause', function(){ 
    root.setAttribute('data-state','paused'); 
    show(iconPlay,true); 
    show(iconPause,false); 
    flash('pause'); 
    root.classList.remove('hide-controls'); 
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

  if(relatedWrap){
  // Mengambil data otomatis dari ALL_VIDEOS yang valid
  var items = ALL_VIDEOS.filter(function(v) {
    var cleanId = v.user.replace('@', '');
    return cleanId !== vid;
  }).map(function(v) {
    var cleanId = v.user.replace('@', '');
    return {
      id: cleanId,
      title: v.user
    };
  });

  if (items.length) {
    nextVideo = items[0]; 
    var cards = items.slice(0, 12).map(relCard); 
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
