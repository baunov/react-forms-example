import {ForwardedRef, forwardRef, useMemo} from 'react';
import {ControlValueAccessorProps} from '@/components/common/ControlValueAccessorProps.ts';
import {Autocomplete, AutocompleteOption} from '@/components/controls/Autocomplete.tsx';
import {FormSection} from '@/components/FormSection.tsx';
import {Label} from '@/components/shadcn/ui/label.tsx';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/shadcn/ui/select.tsx';
import {Switch} from '@/components/shadcn/ui/switch.tsx';
import {CreateControl} from '@/components/common/CreateControl.tsx';


const languagesOptions = [
    {label: 'English', value: 'en'},
    {label: 'Spanish', value: 'sp'},
    {label: 'Italian', value: 'it'},
];

const languageLevelOptions = [
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C2',
    'NATIVE',
];

const langOptionsResolver = async (search: string) => {
    return languagesOptions.filter((l) => l.label.toLowerCase().includes(search.toLowerCase()));
};

type LanguageRequirementsPickerValue = Record<string, {
    required: boolean;
    level: string;
}>;


export const LanguageSection = forwardRef(function LanguageSection(
    {value, onChange, error}: ControlValueAccessorProps<LanguageRequirementsPickerValue>,
    ref: ForwardedRef<HTMLDivElement>
) {
    const onListChange = (options: AutocompleteOption<any>[]) => {
        onChange(options.reduce((acc: LanguageRequirementsPickerValue, opt) => {
            acc[opt.value] = value[opt.value] ?? {required: true};
            return acc;
        }, {}));
    }

    const selectedLanguages = useMemo(() => {
        return Object.keys(value).map((key) => {
            return languagesOptions.find((opt) => opt.value === key)!;
        });
    }, [value]);

    const onLevelChange = (lang: string, level: string) => {
        onChange({...value, [lang]: {...(value[lang] ?? {}), level}});
    };

    const onRequiredChange = (lang: string, required: boolean) => {
        onChange({...value, [lang]: {...(value[lang] ?? {}), required}});
    };

    return (
        <FormSection title={'Languages'} error={error} required={true} ref={ref}>
            <Autocomplete<string>
                onChange={onListChange}
                value={selectedLanguages}
                optionsResolver={langOptionsResolver}/>
            <div className='flex flex-col gap-2'>
                {
                    selectedLanguages.map((opt) => {
                        return (
                            <div key={opt.label} className='grid grid-cols-[90px_180px_1fr] gap-8 items-center'>
                                <Label>{opt.label}</Label>
                                <Select value={value[opt.value].level} onValueChange={(level) => onLevelChange(opt.value, level)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Level (Optional)"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languageLevelOptions.map((level) => {
                                            return (<SelectItem key={level}
                                                                value={level}>{level}</SelectItem>);
                                        })}
                                    </SelectContent>
                                </Select>

                                <div >
                                    <Label className='flex items-center gap-2'>
                                        <Switch checked={value[opt.value].required}
                                            onCheckedChange={(required) => onRequiredChange(opt.value, required)}/>
                                        {value[opt.value].required ? 'Must have' : 'Nice to have'}
                                    </Label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </FormSection>
    )
});

export const LanguageSectionControl = CreateControl<
    LanguageRequirementsPickerValue,
    ControlValueAccessorProps<LanguageRequirementsPickerValue>
>(LanguageSection);
