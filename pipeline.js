(function () {
  var _animEl  = null;
  var _animCSS = '';
  var _uid     = 0;
  var PURPLE = '#9747FF';
  var GREEN  = '#3EFFA0';

  function buildLines() {
    if (_animEl) _animEl.remove();
    _animEl  = document.createElement('style');
    document.head.appendChild(_animEl);
    _animCSS = '';
    _uid     = 0;

    var svg  = document.getElementById('conn-svg');
    var grid = document.getElementById('cards-grid');
    if (!svg || !grid) return;

    // Read per-page config from data attributes on the SVG element
    var rawOffsets = svg.getAttribute('data-arc-offsets') || '-10,0,10';
    var arcOffsets = rawOffsets.split(',').map(Number);
    var dropBase   = Number(svg.getAttribute('data-drop-base') || 40);
    var dropStep   = Number(svg.getAttribute('data-drop-step') || 8);

    var gr = grid.getBoundingClientRect();
    svg.innerHTML = '';

    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML =
      '<filter id="glow-p" x="-200%" y="-200%" width="500%" height="500%">' +
        '<feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur"/>' +
        '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter>' +
      '<filter id="glow-g" x="-200%" y="-200%" width="500%" height="500%">' +
        '<feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur"/>' +
        '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter>';
    svg.appendChild(defs);

    function R(el) {
      var b = el.getBoundingClientRect();
      return { l: b.left-gr.left, t: b.top-gr.top, r: b.right-gr.left, b: b.bottom-gr.top,
               cx: b.left-gr.left+b.width/2, cy: b.top-gr.top+b.height/2 };
    }
    function mkPath(d, stroke, opacity, extra) {
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', d); p.setAttribute('stroke', stroke);
      p.setAttribute('stroke-width', '1'); p.setAttribute('fill', 'none');
      p.setAttribute('stroke-opacity', opacity);
      if (extra) Object.keys(extra).forEach(function(k) { p.setAttribute(k, extra[k]); });
      return p;
    }
    function drawLine(d, x1, y1, color, filterId, duration, delay, addStartDot) {
      svg.appendChild(mkPath(d, color, '0.25'));
      var pulse = mkPath(d, color, '1', { 'stroke-linecap':'round', 'filter':'url(#'+filterId+')' });
      svg.appendChild(pulse);
      var len = pulse.getTotalLength() || 200;
      var seg = Math.max(18, Math.min(55, len * 0.18));
      pulse.setAttribute('stroke-dasharray', seg+' '+(len+1));
      var name = 'p'+(++_uid);
      _animCSS += '@keyframes '+name+'{from{stroke-dashoffset:'+((len+seg).toFixed(1))+'}to{stroke-dashoffset:0}}';
      pulse.style.animation = name+' '+duration+'s '+delay+'s linear infinite';
      if (addStartDot) {
        var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', x1); dot.setAttribute('cy', y1); dot.setAttribute('r', '2.5');
        dot.setAttribute('fill', color); dot.setAttribute('opacity', '0.55');
        svg.appendChild(dot);
      }
    }
    function hBez(x1, y1, x2, y2, color, fId, dur, dly, dot) {
      var cp = (x2-x1)*0.5;
      drawLine('M'+x1+' '+y1+' C'+(x1+cp)+' '+y1+','+(x2-cp)+' '+y2+','+x2+' '+y2, x1, y1, color, fId, dur, dly, dot);
    }
    function topArc(x1, y1, x2, y2, apex, color, fId, dur, dly) {
      drawLine('M'+x1+' '+y1+' C'+x1+' '+apex+','+x2+' '+apex+','+x2+' '+y2, x1, y1, color, fId, dur, dly, true);
    }

    var hls  = [0,1,2,3].map(function(i) { return document.getElementById('hl'+i); });
    var s2ps = [0,1,2,3].map(function(i) { return document.getElementById('s2p'+i); });
    hls.forEach(function(hl, i) {
      if (!hl || !s2ps[i]) return;
      var h = R(hl), p = R(s2ps[i]);
      hBez(h.r, h.cy, p.l, p.cy, PURPLE, 'glow-p', 0.9, i*0.18, false);
    });

    var s3ls = [0,1,2].map(function(i) { return document.getElementById('s3l'+i); });
    var s3rs = [0,1,2].map(function(i) { return document.getElementById('s3r'+i); });
    s3ls.forEach(function(lEl, i) {
      if (!lEl || !s3rs[i]) return;
      var l = R(lEl), rv = R(s3rs[i]);
      hBez(l.r, l.cy, rv.l, rv.cy, GREEN, 'glow-g', 0.75, i*0.12, false);
    });

    var s4ps = [0,1,2,3].map(function(i) { return document.getElementById('s4p'+i); });
    s2ps.forEach(function(pEl, i) {
      if (!pEl || !s4ps[i]) return;
      var p = R(pEl), t = R(s4ps[i]);
      topArc(p.r, p.cy, t.l, t.cy, -(42+i*10), PURPLE, 'glow-p', 2.0, i*0.28);
    });

    var s5ps = [0,1,2,3].map(function(i) { return document.getElementById('s5p'+i); });
    s4ps.forEach(function(pEl, i) {
      if (!pEl || !s5ps[i]) return;
      var p = R(pEl), t = R(s5ps[i]);
      hBez(p.r, p.cy, t.l, t.cy, PURPLE, 'glow-p', 1.4, i*0.18, true);
    });

    var s3tEl = document.getElementById('s3-table');
    var s5tEl = document.getElementById('s5-table');
    if (s3tEl && s5tEl) {
      var s3t = R(s3tEl), s5t = R(s5tEl);
      arcOffsets.forEach(function(off, i) {
        var x1=s3t.cx+off, y1=s3t.b, x2=s5t.cx+off, y2=s5t.b;
        var drop = dropBase + i*dropStep;
        drawLine('M'+x1+' '+y1+' C'+x1+' '+(y1+drop)+','+x2+' '+(y2+drop)+','+x2+' '+y2, x1, y1, GREEN, 'glow-g', 2.0, i*0.15, true);
      });
    }

    _animEl.textContent = _animCSS;
  }

  window.addEventListener('load', buildLines);
  window.addEventListener('resize', function() {
    clearTimeout(window._pipelineRt);
    window._pipelineRt = setTimeout(buildLines, 90);
  });
})();
