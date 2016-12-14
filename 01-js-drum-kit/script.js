(() => {

  function forEach(items, callback) {
    for (let i = 0; i < items.length; i++) {
      callback(items[i]);
    }
  }

  let drumKit = (() => {
    let repository = {};

    forEach(document.querySelectorAll('audio'), audio => {
      repository[audio.dataset.key] = {};
      repository[audio.dataset.key].audio = audio;
    });
    forEach(document.querySelectorAll('.key'), key => {
      repository[key.dataset.key].key = key;
      key.addEventListener('transitionend', e => {
        if (e.propertyName !== 'transform') return;
        key.classList.remove('playing');
      })
    });

    return {
      play(keyCode) {
        let elements = repository[keyCode];
        if (!elements) return;
        let audio = elements.audio;
        let key = elements.key;
        audio.currentTime = 0;
        audio.play();
        key.classList.add('playing');
      }
    };
  })();

  window.addEventListener('keydown', e => drumKit.play(e.keyCode));

})();