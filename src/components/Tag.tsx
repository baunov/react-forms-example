import {ForwardedRef, forwardRef, InputHTMLAttributes, ReactNode} from 'react';
import {XMarkIcon} from '@heroicons/react/20/solid'
import classNames from 'classnames';

export interface TagProps extends Omit<InputHTMLAttributes<HTMLDivElement>, 'size'> {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    deletable?: boolean;
    color?: 'default' | 'primary';
    selected?: boolean;
    highlighted?: boolean;
    deleted?: () => void;
    children: ReactNode;
}

const CLASS_BY_SIZE = {
    'sm': 'px-1 py-0.5 text-sm',
    'md': 'px-2 py-1 text-sm text-sm',
    'lg': 'px-2 py-1 text-base text-base',
};

const CLASS_BY_COLOR = {
    'default': 'bg-white',
    'primary': 'bg-blue-600',
};

const CLASS_BY_SELECTED = {
    'true': 'bg-blue-600',
    'false': 'border-slate-600',
};

const CLASS_BY_HIGHLIGHTED = {
    'true': 'border-slate-900',
    'false': 'border-slate-600',
};
export default forwardRef(function Tag({
    children,
    size = 'lg',
    deletable = false,
    color = 'default',
    selected = false,
    deleted,
    highlighted = false,
    className,
    ...props
}: TagProps, ref: ForwardedRef<HTMLDivElement>) {
    return (
        <div ref={ref} tabIndex={0} className={
            classNames(
                'border-2 rounded flex flex-row items-center cursor-pointer select-none hover:border-slate-900 focus:border-slate-600',
                className,
                CLASS_BY_SIZE[size],
                {'border-blue-600 bg-blue-100': selected},
                {'border-transparent bg-blue-100': highlighted}
            )
        } {...props}>
            <div className=''>{children}</div>
            {deletable && <div className='h-4 text-slate-800 px-2 -mr-2 -ml-1' onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                deleted?.()
            }}>
                <XMarkIcon className='h-4 w-4'/>
            </div>}
        </div>
    )
});
