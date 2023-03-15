/* Типы методов HTTP запросов. */
export enum EMethod {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

/* Маршруты страниц приложения. */
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

/* Типы маршрутизации по типу пользователя. */
export enum ERedirectType {
    AUTHORIZED = 'authorized',
    GUEST = 'guest',
}

/* Список текстов для отображения ошибки. */
export enum EErrorText {
    ENTER_SYMBOLS = 'Введите от 3 до 8 символов',
    ENTER_LATIN_SYMBOLS = 'Введите от 3 до 8 латинских символов',
    INVALID_SYMBOLS = 'Некорректные символы',
    PASSWORD_MUST_CONTAINS = 'Пароль должен содержать цифры, заглавные и маленькие буквы',
    INVALID_EMAIL = 'Неверная почта',
    INVALID_PHONE = 'Неверный телефон',
    INVALID_PASSWORD = 'Неверный пароль',
    EMPTY_MESSAGE = 'Введите текст',
    INVALID_LOGIN_OR_PASSWORD = 'Неправильный логин или пароль',
    USER_ALREADY_EXISTS = 'Пользователь с таким логином или email уже существует',
    TRY_AGAIN_LATER = 'Непредвиденная ошибка. Попробуйте повторить позднее',
    USER_NOT_FOUND = 'Пользователь не найден.',
    ID_IN_NUMBERS = 'ID должен должен содержать только цифры.'
}

/* Список текстов для отображения предупреждений. */
export enum EAlertText {
    DATA_UPDATE_SUCCESSFUL = 'Данные успешно обновлены',
    FILE_UPDATE_SUCCESSFUL = 'Файл загружен',
}

/* Список текстов для отображения ошибки. */
export enum ERequestStatus {
    OK = 200,
    BAD_REQUEST = 400,
}

