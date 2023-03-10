import { type EMethod } from './enums';

export interface IRequestOptionsGet {
    method?: EMethod;
    data?: IRequestOptionsData | number;
    headers?: Record<string, string>;
    timeout?: number;
}

export interface IRequestOptions {
    method?: EMethod;
    data?: IRequestOptionsData | number | FormData;
    headers?: Record<string, string>;
    timeout?: number;
}

export type IRequestOptionsData = Partial<Record<string, string | number | number[]>>;

export type IBlockProps = Record<string, any>;

export interface IFormElementProps extends IBlockProps {
    name?: 'login' | 'password' | 'first_name' | 'second_name' | 'display_name' | 'email' | 'phone';
    type?: 'text' | 'password' | 'phone' | 'email' | 'file';
    value?: string | HTMLInputElement | HTMLImageElement | File;
    placeholder?: string;
    id?: string;
    onFocus?: (event: SubmitEvent) => void;
    onBlur?: (event: SubmitEvent) => void;
    onInput?: (event: SubmitEvent) => void;
}

export type Indexed<T = any> = {
    [key in string]: T;
};
