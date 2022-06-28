export { default as compose } from './compose';

export const isIOS = () => typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

export const homeBarHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--sab').slice(1, -2));
