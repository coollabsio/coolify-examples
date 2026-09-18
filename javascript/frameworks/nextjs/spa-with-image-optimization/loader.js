'use client'

export default function myImageLoader({ src, width, quality }) {
    const isLocal = !src.startsWith('http');
    const query = new URLSearchParams();

    const imageOptimizationApi = 'https://images.coollabs.io/o';
    // Your NextJS application URL
    const baseUrl = 'https://xoos0kk.heyandras.dev';

    const fullSrc = `${baseUrl}${src}`;

    if (width) query.set('width', width);
    if (quality) query.set('quality', quality);

    if (isLocal && process.env.NODE_ENV === 'development') {
        return src;
    }
    if (isLocal) {
        return `${imageOptimizationApi}/${fullSrc}?${query.toString()}`;
    }
    return `${imageOptimizationApi}/${src}?${query.toString()}`;
}
