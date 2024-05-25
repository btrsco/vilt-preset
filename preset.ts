import {group} from "@preset/core";

export default definePreset({
    name: 'vilt-preset',
    options: {
        migrate: false,
        seed: false,
        build: false,
    },
    postInstall: ({hl}) => [
        `Run the development server with ${hl('npm run dev')}`,
        `Edit your scripts in ${hl('resources/scripts')}`,
        `Edit your pages and components in ${hl('resources/views')}`,
        `Build for production with ${hl('npm run build')}`,
    ],
    handler: async (context) => {
        await group({
            title: 'install composer dependencies',
            handler: async () => {
                let composerPackages = [
                    'lorisleiva/laravel-actions',
                    'spatie/laravel-collection-macros',
                    'spatie/laravel-ray',
                    'spatie/typescript-transformer',
                    'spatie/laravel-typescript-transformer',
                ];

                let composerDevPackages = [
                    'itsgoingd/clockwork',
                ];

                await installPackages({
                    title: 'install composer dependencies',
                    for: 'php',
                    packages: composerPackages,
                    dev: false,
                    additionalArgs: [
                        '--no-cache',
                    ],
                });

                await installPackages({
                    title: 'install composer dev dependencies',
                    for: 'php',
                    packages: composerDevPackages,
                    dev: true,
                    additionalArgs: [
                        '--no-cache',
                    ],
                });
            }
        });

        await group({
            title: 'install npm dependencies',
            handler: async () => {
                let npmPackages = [
                    //
                ];

                let npmDevPackages = [
                    '@tailwindcss/line-clamp',
                    'dayjs',
                    'lodash',
                    'sass',
                    'ziggy-js',
                    '@vee-validate/zod',
                    '@vueuse/core',
                    'class-variance-authority',
                    'clsx',
                    'lucide-vue-next',
                    'radix-vue',
                    'tailwindcss-animate',
                    'tailwind-merge',
                    'vee-validate',
                    'vue-sonner',
                    'zod',
                ];

                await installPackages({
                    title: 'install npm dependencies',
                    for: 'node',
                    packages: npmPackages,
                    dev: false,
                });

                await installPackages({
                    title: 'install npm dev dependencies',
                    for: 'node',
                    packages: npmDevPackages,
                    dev: true,
                });
            }
        });

        await group({
            title: 'modify base laravel install',
            handler: async () => {
                await editFiles({
                    title: 'modify .gitignore',
                    files: '.gitignore',
                    operations: [
                        {
                            type: 'add-line',
                            lines: '.DS_Store',
                            position: 7,
                        },
                        {
                            type: 'add-line',
                            lines: '/storage/clockwork',
                            position: 6,
                        },
                    ],
                });

                await deletePaths({
                    title: 'remove default readme.md',
                    paths: ['readme.md'],
                });

                await deletePaths({
                    title: 'remove default laravel scaffolding',
                    paths: [
                        'app/Http/Middleware/HandleInertiaRequests.php',
                        'database/migrations/0001_01_01_000000_create_users_table.php',
                        'database/factories',
                        'database/seeders',
                        'vite.config.js',
                    ],
                });
            },
        });

        await group({
            title: 'modify laravel breeze',
            handler: async () => {
                await editFiles({
                    title: 'modify jsconfig.json',
                    files: 'tsconfig.json',
                    operations: [
                        {
                            type: 'edit-json',
                            replace: (json, omit) => ({
                                ...json,
                                compilerOptions: {
                                    ...json.compilerOptions,
                                    paths: {
                                        '@/*': ["./resources/*"],
                                    },
                                },
                                include: ["resources/**/*.ts", "resources/**/*.d.ts", "resources/**/*.vue"],
                            }),
                        }
                    ],
                });

                await deletePaths({
                    title: 'remove default breeze scaffolding',
                    paths: [
                        'app/Http/Middleware/HandleInertiaRequests.php',
                        'resources/css',
                        'resources/views',
                        'resources/js/app.ts',
                        'resources/js/bootstrap.ts',
                        'resources/js/ssr.ts',
                    ],
                });

                await renamePaths({
                    title: 'rename resources/js to resources/views',
                    paths: 'resources/js',
                    transformer: (path) => path.base.replace('js', 'views'),
                });

                await renamePaths({
                    title: 'rename directories to lower case',
                    paths: [
                        'resources/views/Components',
                        'resources/views/Layouts',
                        'resources/views/Pages',
                    ],
                    transformer: (path) => path.base.toLowerCase(),
                });

                await editFiles({
                    title: 'fix component imports',
                    files: [
                        'resources/views/layouts/AuthenticatedLayout.vue',
                        'resources/views/layouts/GuestLayout.vue',
                        'resources/views/pages/Dashboard.vue',
                        'resources/views/pages/Welcome.vue',
                        'resources/views/pages/Auth/ConfirmPassword.vue',
                        'resources/views/pages/Auth/ForgotPassword.vue',
                        'resources/views/pages/Auth/Login.vue',
                        'resources/views/pages/Auth/Register.vue',
                        'resources/views/pages/Auth/ResetPassword.vue',
                        'resources/views/pages/Auth/VerifyEmail.vue',
                        'resources/views/pages/Profile/Edit.vue',
                        'resources/views/pages/Profile/Partials/DeleteUserForm.vue',
                        'resources/views/pages/Profile/Partials/UpdatePasswordForm.vue',
                        'resources/views/pages/Profile/Partials/UpdateProfileInformationForm.vue',
                    ],
                    operations: [
                        {
                            type: 'update-content',
                            update: (content) => {
                                content = content.replace(/@\/Components/g, '@/views/components');
                                content = content.replace(/@\/Layouts/g, '@/views/layouts');
                                content = content.replace(/@\/Pages/g, '@/views/pages');
                                return content;
                            }
                        }
                    ],
                });
            }
        });

        await group({
            title: 'extract preset files',
            handler: async () => {
                await deletePaths({
                    title: 'remove files to replace with preset files',
                    paths: [
                        'public/robots.txt',
                    ],
                });

                await extractTemplates({
                    title: 'extract base preset files',
                    from: './base',
                    to: './',
                    whenConflict: 'override',
                });

                await editFiles({
                    title: 'modify package.json',
                    files: 'package.json',
                    operations: [
                        {
                            type: 'edit-json',
                            replace: (json, omit) => ({
                                ...json,
                                scripts: {
                                    ...json.scripts,
                                    'dev': 'vite --host',
                                },
                            }),
                        }
                    ],
                });

                await editFiles({
                    title: 'modify composer.json',
                    files: 'composer.json',
                    operations: [
                        {
                            type: 'edit-json',
                            replace: (json, omit) => ({
                                ...json,
                                autoload: {
                                    ...json.autoload,
                                    files: [
                                        'app/Helpers/Global.php',
                                    ],
                                }
                            }),
                        }
                    ]
                });
            }
        });

        if (context.options.build) {
            await group({
                title: 'build assets & helpers',
                handler: async () => {
                    await executeCommand({
                        title: 'build assets',
                        command: 'npm',
                        arguments: [
                            'run',
                            'build',
                        ],
                    });
                }
            });
        }

        if (context.options.migrate) {
            await group({
                title: 'migrate database',
                handler: async () => {
                    await executeCommand({
                        title: 'wipe database',
                        command: 'php',
                        arguments: [
                            'artisan',
                            'db:wipe',
                        ],
                    });

                    let options = ['--force'];

                    if (context.options.seed) options.push('--seed');

                    await executeCommand({
                        title: 'run migrations',
                        command: 'php',
                        arguments: [
                            'artisan',
                            'migrate',
                            ...options
                        ],
                    });
                }
            });
        }
    },
})
