/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  TYPES  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Collection of type-checking utilities.                             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

export const isFunction = func => func instanceof Function;
export const isDOMElement = node => node instanceof Element;
export const isHTMLElement = node => node instanceof HTMLElement;
