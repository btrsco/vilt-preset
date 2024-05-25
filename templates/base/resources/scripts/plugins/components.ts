import {App} from 'vue';
import {Head, Link} from '@inertiajs/vue3';

export default {
    install: function (app: App) {
        registerComponents(app, {
            'inertia-link': Link,
            'inertia-head': Head,
        });
    },
};

function registerComponents(app: App, components: Record<string, any>) {
    for (const [name, component] of Object.entries(components)) {
        app.component(name, component);
    }
}
