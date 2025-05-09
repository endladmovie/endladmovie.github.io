function enableRemoteNavigation(selector) {
  let focusIndex = 0;
  let elements = Array.from(document.querySelectorAll(selector));

  if (elements.length === 0) return;

  elements.forEach(el => el.tabIndex = -1); // сделать фокусируемыми
  elements[focusIndex].focus();

  window.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        focusIndex = (focusIndex + 1) % elements.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        focusIndex = (focusIndex - 1 + elements.length) % elements.length;
      }

      elements[focusIndex].focus();
    }

    if (e.key === 'Enter') {
      elements[focusIndex].click();
    }
  });
}

enableRemoteNavigation('button, .clickable, a, input, select, option'); // укажи, что должно быть листабельным