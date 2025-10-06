import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const protectedRoutes: Routes = {
    '/dashboard': {
        key: 'dashboard',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
    '/facility': {
        key: 'inventory.facility',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
    '/bus': {
        key: 'inventory.bus',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
    '/bus/create': {
        key: 'inventory.bus',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            // pageContainerType: 'contained',
			
            header: {
                title: 'Tambah Bus',
                description:
                    'Manage customer details, track purchases, and update preferences easily.',
                contained: true,
            },
            footer: false,
        
        },
    },
    '/halte': {
        key: 'inventory.halte',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
    '/halte/create': {
        key: 'inventory.halte',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            // pageContainerType: 'contained',
			
            header: {
                title: 'Tambah Halte',
                description:
                    'Manage customer details, track purchases, and update preferences easily.',
                contained: true,
            },
            footer: false,
        
        },
    },
    // '/loan': {
    //     key: 'transaction.loan',
    //     authority: [],
    //     meta: {
    //         pageBackgroundType: 'plain',
    //         pageContainerType: 'contained',
    //     },
    // },
    // '/maintenance': {
    //     key: 'transaction.maintenance',
    //     authority: [],
    //     meta: {
    //         pageBackgroundType: 'plain',
    //         pageContainerType: 'contained',
    //     },
    // },
    // '/procurement': {
    //     key: 'transaction.procurement',
    //     authority: [],
    //     meta: {
    //         pageBackgroundType: 'plain',
    //         pageContainerType: 'contained',
    //     },
    // },
    // '/disposal': {
    //     key: 'transaction.disposal',
    //     authority: [],
    //     meta: {
    //         pageBackgroundType: 'plain',
    //         pageContainerType: 'contained',
    //     },
    // },
    '/category': {
        key: 'master.category',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
    '/category/create': {
        key: 'master.category',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            // pageContainerType: 'contained',
			
            header: {
                title: 'Tambah Kategori',
                description:
                    'Manage customer details, track purchases, and update preferences easily.',
                contained: true,
            },
            footer: false,
        
        },
    },
    '/track': {
        key: 'master.track',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
    '/track/create': {
        key: 'inventory.track',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            // pageContainerType: 'contained',
			
            header: {
                title: 'Tambah Rute Trayek',
                description:
                    'Manage customer details, track purchases, and update preferences easily.',
                contained: true,
            },
            footer: false,
        
        },
    },
    '/user': {
        key: 'master.user',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
    '/user/create': {
        key: 'master.user',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            // pageContainerType: 'contained',
			
            header: {
                title: 'Tambah Pengguna',
                description:
                    'Manage customer details, track purchases, and update preferences easily.',
                contained: true,
            },
            footer: false,
        
        },
    },
    '/documentation': {
        key: 'guide.documentation',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
}

export const publicRoutes: Routes = {}

export const authRoutes = authRoute
