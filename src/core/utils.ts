import Validator from "core/services/validator";

export const queryStringify = (data: Record<string, string>): string => {
    const keys = Object.keys(data);

    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

const getFormElementErrorText = (name: string, value: string): string => {
    const validator = new Validator();
    let errorText: string = '';

    switch (true) {
        case name === 'login' && !validator.checkLogin(value):
            errorText = 'Неверный логин';
            break;
        case name === 'password' && !validator.checkPassword(value):
        case name === 'repeat_password' && !validator.checkPassword(value):
        case name === 'oldPassword' && !validator.checkPassword(value):
        case name === 'newPassword' && !validator.checkPassword(value):
        case name === 'repeat_newPassword' && !validator.checkPassword(value):
            errorText = 'Неверный пароль';
            break;
        case name === 'email' && !validator.checkEmail(value):
            errorText = 'Неверная почта';
            break;
        case name === 'first_name' && !validator.checkName(value):
            errorText = 'Неверное имя';
            break;
        case name === 'second_name' && !validator.checkName(value):
            errorText = 'Неверная фамилия';
            break;
        case name === 'phone' && !validator.checkPhone(value):
            errorText = 'Неверный телефон';
            break; 
        case name === 'message' && !validator.checkEmptyString(value):
            errorText = 'Пустое сообщение';
            break; 
    }

    return errorText;
}

type TFormElementDetails = { name: string, value: string, allertElement: HTMLElement };

const getFormElementDetails = (formElement: HTMLElement): TFormElementDetails => {
    const { name, value } = formElement.querySelector('.form-input') as HTMLInputElement;
    const allertElement = formElement.querySelector('.line-input-allert') as HTMLElement;
    
    return { name, value, allertElement };
}

const addAllertElement = (formElementDetails: TFormElementDetails): void => {
    const { name, value, allertElement } = formElementDetails;

    if (getFormElementErrorText(name, value).length === 0) {
        allertElement.style.display = 'none';
    } else {
        allertElement.style.display = 'block';
        allertElement.textContent = getFormElementErrorText(name, value);
    }
}

export const formSubmitHandler = (event: SubmitEvent, context: Record<string, any>): void => {
    event.preventDefault();

    const formData: Record<string, string> = {};

    Object.values(context.refs).forEach((ref: any) => {
        const formElement = ref.getContent();
        const { name, value, allertElement } = getFormElementDetails(formElement);

        addAllertElement({name, value, allertElement});
        formData[name] = value;
    });
    //TODO убрать в следующих спринтах. Используется для Sprint_2.
    console.log(`formData`, formData);
}

export const elementChecker = (context: Record<string, any>): void => {
    const formElement = context.getContent() as HTMLElement;

    addAllertElement(getFormElementDetails(formElement));
}

export const elementCheckerWithClearValue = (event: SubmitEvent, context: Record<string, any>): void => {
    event.preventDefault;

    const formElement = context.getContent() as HTMLElement;
    const inputElement = formElement.querySelector('.form-input') as HTMLInputElement;
    inputElement.value = '';

    addAllertElement(getFormElementDetails(formElement));
}

type Indexed<T = any> = {
    [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch(e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

export function setObject(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);
    return merge(object as Indexed, result);
}
