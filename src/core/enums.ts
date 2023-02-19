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
    REGISTER = '/register',
    PROFILE = '/profile',
    CHANGE_PROFILE = '/change-profile',
    CHANGE_PASSWORD = '/change-password',
    CHAT = '/chat',
    ERROR_404 = '/error-404',
    ERROR_500 = '/error-500',
    ALL = '*',
}
