export function currencyFormatter(val) {
  if (!typeof (val) === 'number') return '';

  return val.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}
