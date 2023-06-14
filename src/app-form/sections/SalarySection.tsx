import {ForwardedRef, forwardRef} from 'react';
import {ControlValueAccessorProps} from '@/components/common/ControlValueAccessorProps.ts';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/shadcn/ui/select.tsx';
import {FormSection} from '@/components/FormSection.tsx';
import {Input} from '@/components/shadcn/ui/input.tsx';
import {CreateControl} from '@/components/common/CreateControl.tsx';

export interface SalaryValue {
    currency: string;
    min: number | null;
    max: number | null;
    period: string;
}

export const SalarySection = forwardRef(
    function SalarySectionInternal({value, onChange, error}: ControlValueAccessorProps<SalaryValue>, ref: ForwardedRef<any>) {

    const onMinChange = (min: string) => {
        if (!min) {
            onChange({...value, min: null});
            return;
        }
        onChange({...value, min: parseInt(min)});
    }

    const onMaxChange = (max: string) => {
        if (!max) {
            onChange({...value, max: null});
            return;
        }
        onChange({...value, max: parseInt(max)});
    }

    const onCurrencyChange = (currency: string) => {
        onChange({...value, currency});
    }

    const onPeriodChange = (period: string) => {
        onChange({...value, period});
    }

    return (
        <FormSection title={'Salary'} error={error} className='mb-4' required={true} ref={ref}>
        <div className='flex items-baseline gap-2' tabIndex={0}>
            <Select onValueChange={onCurrencyChange} value={value.currency}>
                <SelectTrigger className='w-24'>
                    <SelectValue placeholder="Currency"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="PLN">PLN</SelectItem>
                    <SelectItem value="AUD">AUD</SelectItem>
                </SelectContent>
            </Select>
            <div>
                <Input type='number'
                       onChange={(e) => onMinChange(e.target.value)}
                       placeholder="From"/>
            </div>
            <div className='text-slate-500'>-</div>
            <div>
                <Input type='number'
                       onChange={(e) => onMaxChange(e.target.value)}
                       placeholder="To"/>
            </div>
            <div className='text-slate-500'>per</div>
            <Select onValueChange={onPeriodChange} defaultValue={value.period}>
                <SelectTrigger className='w-24'>
                    <SelectValue placeholder="Timeframe"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="HOUR">Hour</SelectItem>
                    <SelectItem value="DAY">Day</SelectItem>
                    <SelectItem value="MONTH">Month</SelectItem>
                    <SelectItem value="YEAR">Year</SelectItem>
                </SelectContent>
            </Select>
        </div>
        </FormSection>
    );
});

export const SalarySectionControl = CreateControl<SalaryValue, ControlValueAccessorProps<SalaryValue>>(SalarySection);

