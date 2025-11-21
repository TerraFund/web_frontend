import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TerraFund',
    short_name: 'TerraFund',
    description: 'Decentralized investment platform connecting landowners with investors',
    start_url: '/',
    display: 'standalone',
    background_color: '#F9FAFB',
    theme_color: '#0B6E4F',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}