import {ForwardedRef, forwardRef, InputHTMLAttributes, ReactNode} from 'react';
import classNames from 'classnames';
import {ExclamationCircleIcon} from '@heroicons/react/20/solid';
import {FieldError} from 'react-hook-form/dist/types/errors';

interface FormSectionProps extends InputHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    title: string;
    required?: boolean;
    nested?: boolean;
    error?: FieldError | string;
}
export const FormSection = forwardRef(
    function FormSection(
        {title, error, nested, required, children, ...props}: FormSectionProps,
        ref: ForwardedRef<HTMLDivElement>
    ) {
    return (
        <div {...props} className={classNames(props.className, 'p-4 border border-border rounded', {
            'border-none pl-0': nested
        })} ref={ref} tabIndex={0}>
            <div className='mb-4'>
                <h2 className='text-slate-800 text-xl font-medium flex gap-2'>
                    <span>{title}</span>
                    {required && <span className='text-red-500'>*</span>}
                </h2>
                {error &&
                    <div className='mt-2 text-destructive flex items-center gap-1'>
                        <ExclamationCircleIcon className='h-5'/>
                        <span>{typeof error === 'string' ? error : error?.message}</span>
                    </div>
                }
            </div>

            <div className='flex flex-col gap-4'>
                {children}
            </div>
        </div>
    )
});
