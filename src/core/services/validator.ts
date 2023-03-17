export class Validator {
    checkOnlyLatinic(value: string): boolean {
        return /^[a-zA-Z0-9]+$/.test(value);
    }

    checkLengthFrom3To20(value: string): boolean {
        const check = value.length >= 3 && value.length <= 20;
        return check;
    }

    checkLengthFrom8To40(value: string): boolean {
        const check = value.length >= 8 && value.length <= 40;
        return check;
    }

    checkPassword(value: string): boolean {
        return /[0-9a-z-_]/i.test(value) && /[A-Z]+/.test(value) && /\d+/.test(value);
    }

    checkEmail(value: string): boolean {
        return /[0-9a-z-_.]+@[a-z0-9-]+.[a-z]{2,3}/.test(value);
    }

    checkPhone(value: string): boolean {
        return /\+?\d{10,15}/i.test(value) && value.length <= 15;
    }

    checkAllowedNameSymbols(value: string): boolean {
        return /^[A-ZА-ЯЁ][a-zа-я-]+$/.test(value);
    }

    checkOnlyNumbers(value: string): boolean {
        return /^\d+$/.test(value);
    }

    checkEmptyString(value: string): boolean {
        return value.trim() !== '';
    }
}
