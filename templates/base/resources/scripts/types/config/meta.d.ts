export interface MetaConfig {
    title: {
        default: string;
        separator: string;
    };
    type: 'website' | 'article';
    description: string;
    twitter_card: 'summary' | 'summary_large_image' | 'app' | 'player';
    image: string;
    theme: {
        light: string;
        dark: string;
    };
}
