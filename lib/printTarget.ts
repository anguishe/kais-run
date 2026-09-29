/**
 * Prints only the element marked `.print-target` (see globals.css). Anything inside it
 * marked `.print-hide` is dropped from the printout.
 */
export function printOnlyTarget(): void {
  document.body.classList.add('print-target-only');
  const done = () => {
    document.body.classList.remove('print-target-only');
    window.removeEventListener('afterprint', done);
  };
  window.addEventListener('afterprint', done);
  window.print();
}
