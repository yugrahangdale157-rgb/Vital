// ==========================================================================
// VITAL CLOUD — Infrastructure map (stylized world dot-grid + glowing nodes)
// ==========================================================================
(function(){
  const svg = document.getElementById('world-map');
  if(!svg) return;

  const W = 1000, H = 500;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  // Simplified continent silhouettes as dot-grid coordinates (stylized, not geographically precise)
  const regions = [
    { name:'North America', cx:200, cy:170 },
    { name:'Europe',        cx:520, cy:130 },
    { name:'Asia Pacific',  cx:800, cy:210 },
    { name:'South America', cx:290, cy:340 },
    { name:'Australia',     cx:840, cy:390 },
    { name:'Africa',        cx:540, cy:300 }
  ];

  const ns = 'http://www.w3.org/2000/svg';
  function el(tag, attrs){
    const e = document.createElementNS(ns, tag);
    for(const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  // Dot-grid background suggesting landmasses (randomized cluster around each region)
  const grid = el('g', { opacity: '0.35' });
  regions.forEach(r => {
    for(let i=0;i<70;i++){
      const angle = Math.random()*Math.PI*2;
      const dist = Math.random()*90 * Math.sqrt(Math.random());
      const x = r.cx + Math.cos(angle)*dist*1.3;
      const y = r.cy + Math.sin(angle)*dist*0.7;
      const dot = el('circle', { cx:x, cy:y, r: Math.random()*0.9+0.4, fill:'rgba(255,255,255,0.18)' });
      grid.appendChild(dot);
    }
  });
  svg.appendChild(grid);

  // Connections between regions
  const connections = [
    [0,1],[1,2],[0,2],[1,4],[2,4],[0,3],[1,3],[1,5],[2,5]
  ];
  const connGroup = el('g');
  connections.forEach(([a,b], idx) => {
    const A = regions[a], B = regions[b];
    const midX = (A.cx+B.cx)/2, midY = (A.cy+B.cy)/2 - 40;
    const path = el('path', {
      d: `M ${A.cx} ${A.cy} Q ${midX} ${midY} ${B.cx} ${B.cy}`,
      fill:'none', stroke:'url(#lineGrad)', 'stroke-width':'1', opacity:'0.5'
    });
    connGroup.appendChild(path);

    // traveling pulse
    const pulse = el('circle', { r:'2.2', fill:'#22D3EE' });
    const anim = el('animateMotion', {
      dur: (3 + idx*0.4) + 's', repeatCount:'indefinite',
      path: `M ${A.cx} ${A.cy} Q ${midX} ${midY} ${B.cx} ${B.cy}`
    });
    pulse.appendChild(anim);
    const glow = el('animate', { attributeName:'opacity', values:'0;1;1;0', keyTimes:'0;0.1;0.9;1', dur:(3+idx*0.4)+'s', repeatCount:'indefinite' });
    pulse.appendChild(glow);
    connGroup.appendChild(pulse);
  });
  svg.appendChild(connGroup);

  // Gradient def
  const defs = el('defs', {});
  const grad = el('linearGradient', { id:'lineGrad', x1:'0%', y1:'0%', x2:'100%', y2:'0%' });
  grad.appendChild(el('stop', { offset:'0%', 'stop-color':'#3B82F6' }));
  grad.appendChild(el('stop', { offset:'100%', 'stop-color':'#A855F7' }));
  defs.appendChild(grad);
  svg.insertBefore(defs, svg.firstChild);

  // Region nodes with latency labels
  const latencies = [8, 12, 14, 22, 31, 27];
  regions.forEach((r, i) => {
    const g = el('g', { class:'map-node' });

    const ring = el('circle', { cx:r.cx, cy:r.cy, r:'14', fill:'none', stroke:'#22D3EE', 'stroke-width':'1', opacity:'0.4' });
    const pulseRing = el('circle', { cx:r.cx, cy:r.cy, r:'6', fill:'none', stroke:'#22D3EE', 'stroke-width':'1.5' });
    const pulseAnim = el('animate', { attributeName:'r', values:'6;22;6', dur:'3s', repeatCount:'indefinite' });
    const opacityAnim = el('animate', { attributeName:'opacity', values:'0.8;0;0.8', dur:'3s', repeatCount:'indefinite' });
    pulseRing.appendChild(pulseAnim);
    pulseRing.appendChild(opacityAnim);

    const dot = el('circle', { cx:r.cx, cy:r.cy, r:'4.5', fill:'#4ADE80' });

    const label = el('text', {
      x:r.cx, y:r.cy - 22, 'text-anchor':'middle',
      'font-family':'JetBrains Mono, monospace', 'font-size':'10', fill:'#E5E9F0'
    });
    label.textContent = r.name;

    const latency = el('text', {
      x:r.cx, y:r.cy + 30, 'text-anchor':'middle',
      'font-family':'JetBrains Mono, monospace', 'font-size':'9', fill:'#4ADE80'
    });
    latency.textContent = latencies[i] + 'ms';

    g.appendChild(ring);
    g.appendChild(pulseRing);
    g.appendChild(dot);
    g.appendChild(label);
    g.appendChild(latency);
    svg.appendChild(g);
  });
})();
