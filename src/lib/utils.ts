import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { availableLocales } from "@/i18n.settings";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date, locale: availableLocales): string {
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric"
    };

    return new Intl.DateTimeFormat(locale, options).format(date).toUpperCase();
}