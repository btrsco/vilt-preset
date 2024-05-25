import {PageProps as InertiaPageProps} from '@inertiajs/core';
import {AxiosInstance} from 'axios';
import {Config as ZiggyConfig, route as ZiggyRoute} from 'ziggy-js';
import {PageProps as AppPageProps} from './';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    let route: typeof ZiggyRoute;
    let Ziggy: typeof ZiggyConfig & { location: string };
}

declare module 'vue' {
    interface ComponentCustomProperties {
        route: typeof ZiggyRoute;
    }
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps {
    }
}
