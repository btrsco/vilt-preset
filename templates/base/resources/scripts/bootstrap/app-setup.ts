import Components from '@/scripts/plugins/components';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {App as VueApp, createApp, createSSRApp, h, Plugin} from 'vue';
import {ZiggyVue, route as ZiggyRoute} from 'ziggy-js';
import {PageProps} from '@/scripts/types';

/* Setup inertia app and helpers.
 * - - - - - - - - - - - - - - - - - - */

dayjs.extend(utc);
dayjs.extend(timezone);

export default function initializeVueApp({el, App, props, plugin, page}: {
    el?: Element;
    App: any;
    props: Record<string, any>;
    plugin: Plugin;
    page?: { props: PageProps };
}): VueApp {
    /* Initialize vue app.
     * - - - - - - - - - - - - - - - - - - */

    let vueApp = page !== undefined
        ? createSSRApp({render: () => h(App, props)})
        : createApp({render: () => h(App, props)});

    /* Instantiate helpers and mixins.
     * - - - - - - - - - - - - - - - - - - */

    vueApp.config.globalProperties.route = ZiggyRoute;

    vueApp.mixin({
        methods: {dayjs},
    });

    /* Instantiate global plugins.
     * - - - - - - - - - - - - - - - - - - */

    vueApp.use(ZiggyVue, page !== undefined ? {
        ...page.props.ziggy,
        url: new URL(page.props.ziggy.location),
    } : Ziggy);

    vueApp.use(Components);
    vueApp.use(plugin);

    /* Mount app to element and window.
     * - - - - - - - - - - - - - - - - - - */

    if (el) vueApp.mount(el);

    return vueApp;
}
