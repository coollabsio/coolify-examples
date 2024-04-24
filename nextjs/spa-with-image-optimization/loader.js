'use client'

export default function myImageLoader({ src, width, quality }) {
    const isLocal = !src.startsWith('http');
    if (isLocal && process.env.NODE_ENV === 'development') {
        return src;
    }
    const query = new URLSearchParams();
    if (width) query.set('width', width);
    if (quality) query.set('quality', quality);
    if (isLocal) {
        const baseUrl = 'https://xoos0kk.heyandras.dev';
        const fullSrc = `${baseUrl}${src}`;
        return `https://images.coollabs.io/o/${fullSrc}?${query.toString()}`;
    }
    return `https://images.coollabs.io/o/${src}?${query.toString()}`;
}
