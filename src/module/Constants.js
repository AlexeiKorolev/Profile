
export const THREASH = 200;
export const phrases = [
    "Data Scientist",
    "Software Engineer",
    "AI Researcher",
    "Technology Enthusiast"
];

export const customPhrases = [
    `// Simple quicksort implementation
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[0];
    const left = arr.filter((x, i) => i > 0 && x < pivot);
    const right = arr.filter(x => x >= pivot);
    
    return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    `// Binary search implementation
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`
];

export const customEquations = [
    `\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x) e^{-2\\pi i x \\xi} \\, dx`,
    `\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}`,
    `f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x - \\mu)^2}{2\\sigma^2}}`,
    `\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}`,
    `E[X] = \\int_{-\\infty}^{\\infty} x f(x) dx`,
    `E[X] = \\sum_{i} x_i P(x_i)`,
    `\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{i=1}^{n} X_i = E[X]`,
    `P(G, \\lambda) = \\sum_{i=1}^{n} (-1)^i c_i \\lambda^{n-i}`,
    `PR(v) = \\frac{1 - d}{N} + d \\sum_{u \\in \\text{in}(v)} \\frac{PR(u)}{\\deg^+(u)}`
];
