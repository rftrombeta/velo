export function generateOrder() {
    const prefix = 'VLO';

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = Array.from({ length: 3 }, () =>
        letters.charAt(Math.floor(Math.random() * letters.length))
    ).join('');

    const randomNumbers = Math.floor(100 + Math.random() * 900);

    return `${prefix}-${randomLetters}${randomNumbers}`;
}
