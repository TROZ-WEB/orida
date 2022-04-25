export enum Theme {
    Dark = 'DARK',
    Light = 'LIGHT',
}

interface WithTheme {
    theme?: Theme;
}

export default WithTheme;
