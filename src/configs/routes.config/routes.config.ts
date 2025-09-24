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
    '/halte': {
        key: 'inventory.halte',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
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
    '/track': {
        key: 'master.track',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
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
