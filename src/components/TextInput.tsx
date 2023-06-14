import {ForwardedRef, forwardRef, InputHTMLAttributes} from 'react';

export const TextInput = forwardRef(function TextInput({...props}: InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<any>) {
    return <input {...props}
                  ref={ref}
                  className="bg-slate-800 text-slate-200 border-2 rounded p-2
                  border-slate-600 focus:outline-0 focus:border-blue-600 transition-all"
    />
})
