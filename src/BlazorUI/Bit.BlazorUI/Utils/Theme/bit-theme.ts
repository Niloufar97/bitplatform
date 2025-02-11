type onThemeChangeType = (newThemeName: string, oldThemeName: string) => void;

class BitTheme {
    private static THEME_ATTRIBUTE = 'bit-theme';

    private static currentTheme = 'light';
    private static onThemeChange: onThemeChangeType = () => { };

    static init(options: any) {
        if (options.system) {
            this.currentTheme = this.isSystemDark() ? 'dark' : 'light';
        } else if (options.default) {
            this.currentTheme = options.default;
        }

        this.onThemeChange = options.onChange;

        this.set(this.currentTheme);
    }

    static onChange(fn: onThemeChangeType) {
        this.onThemeChange = fn;
    }

    static useSystem() {
        this.currentTheme = this.isSystemDark() ? 'dark' : 'light';
        this.set(this.currentTheme);
    }

    static get() {
        this.currentTheme = document.documentElement.getAttribute(this.THEME_ATTRIBUTE) || '';

        return this.currentTheme;
    }

    static set(themeName: string) {
        this.currentTheme = themeName;
        const oldTheme = document.documentElement.getAttribute(this.THEME_ATTRIBUTE) || '';

        document.documentElement.setAttribute(this.THEME_ATTRIBUTE, themeName);

        this.onThemeChange?.(themeName, oldTheme);
    }

    static toggleDarkLight() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';

        this.set(this.currentTheme);

        return this.currentTheme;
    }

    static applyBitTheme(theme: any, element?: HTMLElement) {
        const el = element || document.body;
        Object.keys(theme).forEach(key => el.style.setProperty(key, theme[key]));
    }

    static isSystemDark() {
        return matchMedia('(prefers-color-scheme: dark)').matches;
    }
}

if (document.documentElement.hasAttribute('use-system-theme')) {
    BitTheme.useSystem();
}