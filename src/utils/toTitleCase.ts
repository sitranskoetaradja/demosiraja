export default function toTitleCase(str: string) {
    // Ubah string menjadi huruf kecil terlebih dahulu
    str = str.toLowerCase();
    // Pecah string menjadi array kata
    const words = str.split(' ');
    // Loop setiap kata dan ubah huruf pertamanya menjadi kapital
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    // Gabungkan kembali array kata menjadi string tunggal
    return words.join(' ');
}