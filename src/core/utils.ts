import Validator from 'core/services/validator';
import { EErrorText } from './enums';
import { type Indexed } from './models';

/* Функция принимает объект и возвращает строку для get-параметров. */
export const queryStringify = (data: Partial<Record<string, string | number | number[]>> | number): string => {
    if (typeof data !== 'object' && data !== null) {
        return `${data}`;
    }

    const keys = Object.keys(data);

    if (keys.length === 0) {
        return '';
    }

    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]!}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
};

/* Функция получения текста ошибки. */
const getFormElementErrorText = (name: string, value: string): string => {
    const validator = new Validator();
    let errorText: string = '';

    switch (true) {
        case name === 'login' && !validator.checkLengthFrom3To20(value):
            errorText = EErrorText.ENTER_LATIN_SYMBOLS;
            break;
        case (name === 'login' && (!validator.checkOnlyLatinic(value) || validator.checkOnlyNumbers(value))):
            errorText = EErrorText.ENTER_LATIN_SYMBOLS;
            break;
        case name === 'password' && !validator.checkLengthFrom8To40(value):
        case name === 'repeat_password' && !validator.checkLengthFrom8To40(value):
        case name === 'oldPassword' && !validator.checkLengthFrom8To40(value):
        case name === 'newPassword' && !validator.checkLengthFrom8To40(value):
        case name === 'repeat_newPassword' && !validator.checkLengthFrom8To40(value):
            errorText = EErrorText.ENTER_SYMBOLS;
            break;
        case name === 'password' && !validator.checkPassword(value):
        case name === 'repeat_password' && !validator.checkPassword(value):
        case name === 'oldPassword' && !validator.checkPassword(value):
        case name === 'newPassword' && !validator.checkPassword(value):
        case name === 'repeat_newPassword' && !validator.checkPassword(value):
            errorText = EErrorText.PASSWORD_MUST_CONTAINS;
            break;
        case name === 'email' && !validator.checkEmail(value):
            errorText = EErrorText.INVALID_EMAIL;
            break;
        case name === 'first_name' && !validator.checkAllowedNameSymbols(value):
            errorText = EErrorText.INVALID_SYMBOLS;
            break;
        case name === 'second_name' && !validator.checkAllowedNameSymbols(value):
            errorText = EErrorText.INVALID_SYMBOLS;
            break;
        case name === 'phone' && !validator.checkPhone(value):
            errorText = EErrorText.INVALID_PHONE;
            break;
        case name === 'title' && !validator.checkEmptyString(value):
        case name === 'message' && !validator.checkEmptyString(value):
            errorText = EErrorText.EMPTY_MESSAGE;
            break;
        case name === 'userid' && !validator.checkOnlyNumbers(value) && !validator.checkEmptyString(value):
            errorText = EErrorText.ID_IN_NUMBERS;
            break;
    }

    return errorText;
};

interface TFormElementDetails {
    name: string;
    value: string;
    allertElement: HTMLElement;
}

/* Функция получения детальной информации поля формы. */
const getFormElementDetails = (formElement: HTMLElement): TFormElementDetails => {
    const { name, value } = formElement.querySelector('.form-input') as HTMLInputElement;
    const allertElement = formElement.querySelector('.line-input-allert') as HTMLElement;

    return { name, value, allertElement };
};

/* Функция добавления сообщения об ошибке в поле формы. */
const addAllertElement = (formElementDetails: TFormElementDetails): void => {
    const { name, value, allertElement } = formElementDetails;

    if (getFormElementErrorText(name, value).length === 0) {
        allertElement.style.display = 'none';
    } else {
        allertElement.style.display = 'block';
        allertElement.textContent = getFormElementErrorText(name, value);
    }
};

/* Обработчик отправки форм. */
export const formSubmitHandler = (event: SubmitEvent, context: Record<string, any>, callback?: (formData?: Partial<Record<string, string | number | number[]>> | FormData | string) => void): void => {
    event.preventDefault();

    const formData: Record<string, string> = {};
    let hasError: boolean = false;

    Object.values(context.refs).forEach((ref: any) => {
        const formElement = ref.getContent();
        const { name, value, allertElement } = getFormElementDetails(formElement);

        addAllertElement({ name, value, allertElement });
        formData[name] = value;
        if (allertElement.style.display === 'block') {
            hasError = true;
        }
    });

    if (hasError) return;

    !!callback && callback(formData);
};

export const elementChecker = (context: Record<string, any>): void => {
    const formElement = context.getContent() as HTMLElement;

    addAllertElement(getFormElementDetails(formElement));
};

export const elementCheckerWithClearValue = (context: Record<string, any>): void => {
    const formElement = context.getContent() as HTMLElement;
    const inputElement = formElement.querySelector('.form-input') as HTMLInputElement;
    inputElement.value = '';

    addAllertElement(getFormElementDetails(formElement));
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

export function setObject(object: Indexed, path: string, value: unknown): Indexed {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    const result = path.split('.').reduceRight<Indexed>(
        (acc, key) => ({
            [key]: acc,
        }),
        value as any,
    );
    return merge(object, result);
}

type TSetCookieProps = Record<string, string | Date | number | boolean>

/* Функция записи cookie. */
export const setCookie = (name: string, value: string, props: TSetCookieProps = {}): void => {
    let exp = props.expires;
    if (typeof exp === "number" && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    // @ts-expect-error
    if (exp?.toUTCString) props.expires = exp.toUTCString();

    value = encodeURIComponent(value);
    let updatedCookie = name + "=" + value;
    for (const propName in props) {
        updatedCookie += "; " + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
}

/* Функция получения cookie по названию. */
export const getCookie = (name: string): string | undefined => {
    const matches = document.cookie.match(
        // eslint-disable-next-line
        new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

/* Функция удаления cookie. */
export const deleteCookie = (name: string) => {
    setCookie(name, '', { expires: 0 })
}

/* Проверка на авторизованного пользователя. */
export const checkAuthorization = (): boolean => {
    if (getCookie('isLoggedIn')) {
        return true;
    } else {
        return false;
    }
}

export const deepEqual = (a: Indexed, b: Indexed): boolean => {
    if (a === b) {
        return true;
    }

    if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
        return false;
    }

    const aObjectKeys = Object.keys(a);
    const bObjectKeys = Object.keys(b);

    if (aObjectKeys.length !== bObjectKeys.length) {
        return false;
    }

    return aObjectKeys.reduce((acc: boolean, key) => {
        if (!acc) return false;

        if (!bObjectKeys.includes(key)) {
            return false;
        }

        return deepEqual(a[key] as Indexed, b[key] as Indexed);
    }, true);
}

/* Функция экранирования спецсимволов */
export const escapeHtml = (unsafe: string | number): string | number => {
    return typeof unsafe === 'number' ? unsafe : (
        unsafe
            ?.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/(\/)/g, "&#47;")
            .replace(/\\/g, "&#92;")
    );
}

/* Форматирование даты. */
export const dateToLocaleString = (date: string): string => {
    try {
        return new Date(date).toLocaleString('ru', {
            hour12: false,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: 'numeric',
        });
    } catch (error) {
        return date;
    }
};
