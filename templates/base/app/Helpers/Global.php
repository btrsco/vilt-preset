<?php

if ( ! function_exists('is_enum')) {
    /**
     * Check if a value is an enum.
     *
     * @param mixed $value
     *
     * @return bool
     */
    function is_enum(mixed $value): bool
    {
        return $value instanceof \UnitEnum;
    }
}



if ( ! function_exists('inertia')) {
    /**
     * Inertia helper.
     *
     * @param string|null $component
     * @param array       $props
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    function inertia(?string $component = null, array $props = []): \Inertia\Response|\Inertia\ResponseFactory
    {
        $instance = \Inertia\Inertia::getFacadeRoot();

        if ($component) {
            return $instance->render($component, $props);
        }

        return $instance;
    }
}



if ( ! function_exists('inertia_location')) {
    /**
     * Inertia location helper.
     *
     * @param string $url
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    function inertia_location(string $url): \Symfony\Component\HttpFoundation\Response
    {
        $instance = Inertia\Inertia::getFacadeRoot();

        return $instance->location($url);
    }
}



if ( ! function_exists('cache_key')) {
    /**
     * Generate a cache key
     *
     * @param string $key
     * @param array  $params
     *
     * @return string
     */
    function cache_key(string $key, array $params = []): string
    {
        return !empty($params)
            ? "{$key}:" . implode('.', $params)
            : $key;
    }
}