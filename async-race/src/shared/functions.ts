// function, which gets two params 1st - tag name, 2nd - class name, and returns HTML element.
export function createElem(tag: keyof HTMLElementTagNameMap, className: string, innerHTML: string): HTMLElement {
  const elem = document.createElement(tag);
  if (className !== '') {
    elem.classList.add(className);
  }
  elem.innerHTML = innerHTML;
  return elem;
}

export function getPosition(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}
