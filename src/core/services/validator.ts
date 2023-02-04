export default class Validator {
    checkLogin(value: string): boolean {
        const check = /[A-Za-z0-9]{3,20}/i.test(value) && /^\S+$/.test(value) && /[a-z-_]/i.test(value) && value.length <= 20;
        console.log(`/[0-9a-z-_]{3,20}/i.test(value) =`, /[0-9a-z-_]{3,20}/i.test(value));
        return check;
    }

    checkPassword(value: string): boolean {
        return /[0-9a-z-_]{8,40}/i.test(value) && /[A-Z]+/.test(value) && /\d+/.test(value) && value.length <= 40;
    }

    checkEmail(value: string): boolean {
        return /[0-9a-z-_.]+@[a-z0-9-]+.[a-z]{2,3}/.test(value);
    }

    checkPhone(value: string): boolean {
        return /\+?\d{10,15}/i.test(value) && value.length <= 15;
    }

    checkName(value: string): boolean {
        return /^[A-ZA-Я]+[A-Za-zA-Яа-я-]+$/.test(value);
    }

    checkEmptyString(value: string): boolean {
        return value !== "";
    }
} 
