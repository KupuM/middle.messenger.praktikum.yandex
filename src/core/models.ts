import { type EMethod } from './enums';

export interface IRequestOptions {
    method?: EMethod;
    data?: IRequestOptionsData;
    headers?: Record<string, string>;
    timeout?: number;
}

export type IRequestOptionsData = Record<string, string>;

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
