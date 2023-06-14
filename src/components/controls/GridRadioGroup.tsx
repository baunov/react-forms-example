import React, {ForwardedRef, forwardRef, Ref} from 'react'
import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames';
import {CreateControl} from '@/components/common/CreateControl.tsx';
import {ControlValueAccessorProps} from '@/components/common/ControlValueAccessorProps.ts';
import Tag from '@/components/Tag.tsx';

export type RadioOption = {
    value: any;
    label: string;
} | string;

interface GridRadioGroupProps<T extends RadioOption> extends ControlValueAccessorProps<T> {
    options: RadioOption[];
}

export const GridRadioGroup = forwardRef(
    function GridRadioGroup<T extends RadioOption>({value, onChange, options}: GridRadioGroupProps<T>, ref: ForwardedRef<any>) {
    return (
        <RadioGroup value={value} onChange={onChange} ref={ref} className='flex items-center gap-1 flex-wrap'>
            {
                options.map((opt) => {
                    if (typeof opt === 'string') {
                        return (
                            <RadioGroup.Option key={opt} value={opt}>
                                {({ checked }) => (
                                    <Tag selected={checked}>{opt}</Tag>
                                )}
                            </RadioGroup.Option>
                        )
                    }
                    return (
                        <RadioGroup.Option key={opt.value} value={opt.value}>
                            {({ checked }) => (
                                <Tag selected={checked}>{opt.label}</Tag>
                            )}
                        </RadioGroup.Option>
                    )
                })
            }
        </RadioGroup>
    )
}) as <T extends RadioOption>(props: GridRadioGroupProps<T> & { ref?: Ref<HTMLDivElement> }) => React.JSX.Element;

export const GridRadioGroupControl = CreateControl<RadioOption, GridRadioGroupProps<RadioOption>>(GridRadioGroup);
