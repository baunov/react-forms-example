import {StarIcon} from '@heroicons/react/20/solid'
import {ForwardedRef, forwardRef} from 'react';
import classNames from 'classnames';
import {RadioGroup} from '@headlessui/react';
import {ControlValueAccessorProps} from '@/components/common/ControlValueAccessorProps.ts';
import {FormSection} from '@/components/FormSection.tsx';
import {CreateControl} from '@/components/common/CreateControl.tsx';


export const SenioritySection = forwardRef(
    function SenioritySectionInternal(
        {value, onChange, error}: ControlValueAccessorProps<string>,
        ref: ForwardedRef<HTMLDivElement>
    ) {
    const seniorities = [
        'Trainee',
        'Junior',
        'Mid',
        'Senior',
        'Expert',
    ];

    return (
        <FormSection title={'Seniority level'}
                     ref={ref}
                     error={error && 'Seniority is required'}
                     required={true}>
            <RadioGroup value={value} onChange={onChange} className='grid md:grid-cols-5 gap-1 grid-cols-2'>
                {
                    seniorities.map((s, index) => {
                        return (
                            <RadioGroup.Option key={s} value={s} className='flex flex-1'>
                                {
                                    ({checked}) => (
                                        <div className={
                                            classNames(
                                                'grid-select-item !px-8 !py-4 flex flex-col w-full',
                                                {selected: checked}
                                            )
                                        }>
                                            <div
                                                className='text-center flex items-center justify-center gap-1 mb-1'>
                                                {new Array(index + 1).fill(0).map((_, i) => {
                                                    return (<StarIcon className='h-3 w-3 block' key={i}/>)
                                                })}
                                            </div>
                                            <div className='text-center'>{s}</div>
                                        </div>
                                    )
                                }
                            </RadioGroup.Option>
                        );
                    })
                }
            </RadioGroup>
        </FormSection>
    );
});

export const SenioritySectionControl = CreateControl<string, ControlValueAccessorProps<string>>(SenioritySection);

