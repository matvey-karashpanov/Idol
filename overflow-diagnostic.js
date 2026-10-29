(() => {
  const isVisible = (el) => {
    const style = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' &&
      rect.width > 1 && rect.height > 1;
  };
  const label = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    if (typeof el.className === 'string' && el.className.trim()) {
      s += '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.');
    }
    return s.slice(0, 90);
  };
  function run() {
    document.querySelectorAll('[data-overflow-debug]').forEach(el => el.removeAttribute('data-overflow-debug'));
    const vw = document.documentElement.clientWidth;
    const offenders = [...document.body.querySelectorAll('*')]
      .filter(el => !el.closest('#overflow-debug-panel') && isVisible(el))
      .map(el => ({ el, r: el.getBoundingClientRect() }))
      .filter(({r}) => r.right > vw + 2 || r.left < -2)
      .sort((a,b) => Math.max(b.r.right-vw, -b.r.left, 0) - Math.max(a.r.right-vw, -a.r.left, 0))
      .slice(0, 12);

    offenders.forEach(({el}) => el.setAttribute('data-overflow-debug','true'));
    let panel = document.getElementById('overflow-debug-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'overflow-debug-panel';
      panel.innerHTML = '<div class="od-head"><strong>IDOLVERSE · Диагностика ширины</strong><button type="button" id="od-refresh">Проверить снова</button></div><div id="od-results"></div><p class="od-note">Сделай скриншот этого блока вместе с красными рамками и отправь его в чат.</p>';
      document.body.appendChild(panel);
      document.getElementById('od-refresh').addEventListener('click', run);
    }
    const sw = document.documentElement.scrollWidth;
    const results = document.getElementById('od-results');
    results.innerHTML = `<p>Ширина экрана: <b>${vw}px</b> · Ширина страницы: <b>${sw}px</b> · Переполнение: <b>${Math.max(0,sw-vw)}px</b></p>` +
      (offenders.length ? '<ol>' + offenders.map(({el,r}) => `<li><code>${label(el)}</code><br>лево: ${Math.round(r.left)}px, право: ${Math.round(r.right)}px, ширина: ${Math.round(r.width)}px</li>`).join('') + '</ol>' : '<p>Элементы за границами не найдены. Нажми «Проверить снова» после попытки прокрутки вправо.</p>');
  }
  const style = document.createElement('style');
  style.textContent = `
    [data-overflow-debug="true"] { outline: 3px solid #ff3b5c !important; outline-offset: -2px !important; }
    #overflow-debug-panel { position: fixed; z-index: 2147483647; left: 8px; right: 8px; bottom: 8px; max-height: 44vh; overflow: auto; background: #fff; color: #171717; border: 2px solid #ff3b5c; border-radius: 12px; padding: 10px 12px; box-shadow: 0 5px 30px #0008; font: 12px/1.4 system-ui,sans-serif; }
    #overflow-debug-panel .od-head { display:flex; gap:8px; justify-content:space-between; align-items:center; flex-wrap:wrap; }
    #overflow-debug-panel button { border:0; border-radius:8px; padding:7px 9px; background:#5c3bd6; color:white; font-weight:700; }
    #overflow-debug-panel p { margin:7px 0; }
    #overflow-debug-panel ol { padding-left:22px; margin:6px 0; }
    #overflow-debug-panel li { margin:5px 0; overflow-wrap:anywhere; }
    #overflow-debug-panel code { font-size:11px; }
    #overflow-debug-panel .od-note { color:#555; border-top:1px solid #ddd; padding-top:6px; }
  `;
  document.head.appendChild(style);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
  window.addEventListener('resize', () => setTimeout(run, 250));
})();
