/* 熟练度训练场 · 翻卡快测引擎
   用法：页面里放 <div class="quiz" data-quiz="唯一ID"></div>，
   然后 <script>registerQuiz("唯一ID", [{q:"问题(可含$公式$)", a:"答案"}, ...])</script>
   最后引入本文件 <script src="assets/quiz.js"></script> */
window.QUIZZES = window.QUIZZES || {};
function registerQuiz(id, cards) { window.QUIZZES[id] = cards; }

function buildQuiz(el, cards) {
  var orig = cards.slice();
  var idx = 0, known = 0, unknown = [];
  function renderMath(node) {
    if (window.renderMathInElement) {
      renderMathInElement(node, { delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ]});
    }
  }
  function card() {
    if (idx >= cards.length) return done();
    var c = cards[idx];
    el.innerHTML =
      '<div class="q-head"><span>翻卡 ' + (idx + 1) + ' / ' + cards.length +
      '</span><span>会了 ' + known + ' · 还不会 ' + unknown.length + '</span></div>' +
      '<div class="q-card"><div class="q-q">' + c.q + '</div></div>' +
      '<div class="q-btns"><button class="primary" data-act="show">显示答案</button></div>';
    renderMath(el.querySelector('.q-q'));
    el.querySelector('[data-act=show]').onclick = function () {
      var cardEl = el.querySelector('.q-card');
      cardEl.insertAdjacentHTML('beforeend', '<div class="q-a">' + c.a + '</div>');
      renderMath(el.querySelector('.q-a'));
      var btns = el.querySelector('.q-btns');
      btns.innerHTML = '<button data-act="yes">会了</button><button data-act="no">还不会</button>';
      btns.querySelector('[data-act=yes]').onclick = function () { known++; idx++; card(); };
      btns.querySelector('[data-act=no]').onclick = function () { unknown.push(cards[idx]); idx++; card(); };
    };
  }
  function done() {
    el.innerHTML =
      '<div class="q-card" style="text-align:center"><p class="q-score">本轮结束：' +
      known + ' 会 / ' + unknown.length + ' 还不会</p>' +
      (unknown.length === 0 ? '<p>全部拿下，去做计时默写吧。</p>' : '<p>不会的卡已经收好，专攻它们。</p>') +
      '</div><div class="q-btns">' +
      (unknown.length ? '<button class="primary" data-act="retry">只重练不会的（' + unknown.length + '）</button>' : '') +
      '<button data-act="all">全部重来</button></div>';
    var r = el.querySelector('[data-act=retry]');
    if (r) r.onclick = function () { cards = unknown.slice(); idx = 0; known = 0; unknown = []; card(); };
    el.querySelector('[data-act=all]').onclick = function () { cards = orig.slice(); idx = 0; known = 0; unknown = []; card(); };
  }
  card();
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.quiz[data-quiz]').forEach(function (el) {
    var cards = window.QUIZZES[el.getAttribute('data-quiz')] || [];
    if (cards.length) buildQuiz(el, cards);
  });
});
