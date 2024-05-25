import {Config as ZiggyConfig} from 'ziggy-js';
import {MetaConfig} from "@/scripts/types/config/meta";
import {SocialConfig} from "@/scripts/types/config/social";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface App {
    name: string;
    locale: string;
    meta: MetaConfig;
    social: SocialConfig;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    app: App;
    ziggy: ZiggyConfig & { location: string };
};
