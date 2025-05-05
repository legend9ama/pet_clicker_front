export const formatNumber = (num) => {
    if (typeof num !== 'number') return '0';
    
    const absNum = Math.abs(num);
    const suffixes = ['', 'k', 'M', 'B', 'T'];
    const suffixThresholds = [1, 1e3, 1e6, 1e9, 1e12];
  
    let index = 4;
    while (index > 0 && absNum < suffixThresholds[index]) index--;
  
    const divisor = suffixThresholds[index];
    const formatted = (num / divisor).toFixed(1)
      .replace(/\.0+$|(\.[1-9])0+$/, '$1');
  
    return `${formatted}${suffixes[index]}`.replace(/(\.|\.0)$/, '');
  };