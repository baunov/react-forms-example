import {FieldError} from 'react-hook-form/dist/types/errors';


export interface ControlValueAccessorProps<T> {
    value: T;
    onChange: (value: T) => void;
    error?: FieldError;
    ref?: any;
}
