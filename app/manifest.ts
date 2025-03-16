import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'CampusIQ',
        short_name: 'CampusIQ',
        description: 'A Progressive school management system',
        start_url: '/',
        display: 'standalone',
        orientation: "any",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
            {
                src: '/icons/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: "maskable"
            },
            {
                src: '/icons/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: "maskable"
            },
        ],
    }
}