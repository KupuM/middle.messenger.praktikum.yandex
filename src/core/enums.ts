/**
 * Типы методов HTTP запросов.
 */
export enum EMethod {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

/**
 * Маршруты страниц приложения.
 */
export enum ERoutes {
    MAIN = '/',
    LOGIN = '/login',
    REGISTER = '/sing-up',
    PROFILE = '/settings',
    CHANGE_PROFILE = '/change-profile',
    CHANGE_PASSWORD = '/change-password',
    CHAT = '/messenger',
    ERROR_404 = '/error-404',
    ERROR_500 = '/error-500',
    ALL = '*',
}
