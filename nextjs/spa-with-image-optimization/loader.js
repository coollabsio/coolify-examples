'use client'

export default function myImageLoader({ src, width, quality }) {
    const isLocal = !src.startsWith('http');
    if (isLocal && process.env.NODE_ENV === 'development') {
        return src;
    }
    if (isLocal) {
        const baseUrl = 'https://xoos0kk.heyandras.dev';
        const fullSrc = `${baseUrl}${src}`;
        return `https://images.coollabs.io/o/${encodeURIComponent(fullSrc)}?width=${width}&quality=${quality}`
    }
    return `https://images.coollabs.io/o/${encodeURIComponent(src)}?width=${width}&quality=${quality}`
}
