<?php

namespace App\Enums;

enum UserRole: string
{
    case ROOT = 'root';
    case ADMIN = 'admin';
    case MOD = 'mod';
    case USER = 'user';
    case GUEST = 'guest';

    public function label(): string
    {
        return match ($this) {
            self::ROOT => 'Super Administrator',
            self::ADMIN => 'Administrator',
            self::MOD => 'Moderator',
            self::USER => 'User',
            self::GUEST => 'Guest',
        };
    }

    public static function options(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn(self $option) => [
                $option->value => $option->label(),
            ])
            ->toArray();
    }

    public static function values(): array
    {
        return collect(self::cases())
            ->map(fn(self $option) => $option->value)
            ->toArray();
    }

    public static function ruleIn(): string
    {
        return 'in:' . implode(',', self::values());
    }
}
