import {ControlValueAccessorProps} from '@/components/common/ControlValueAccessorProps.ts';
import {ForwardedRef, forwardRef} from 'react';
import {FormSection} from '@/components/FormSection.tsx';
import {GridRadioGroup} from '@/components/controls/GridRadioGroup.tsx';
import {CATEGORIES, TECH_BY_CATEGORY} from '@/app-form/tech-by-category.ts';
import {CreateControl} from '@/components/common/CreateControl.tsx';

interface CategoryTechSectionValue {
    category: string | null;
    tech: string | null;
}

type CategoryTechSectionProps = ControlValueAccessorProps<CategoryTechSectionValue>

export const CategoryTechSection = forwardRef(
    function CategoryTechSection({value, onChange, error}: ControlValueAccessorProps<CategoryTechSectionValue>, ref: ForwardedRef<any>) {

    const onCategoryChange = (category: string | null) => {
        onChange({category, tech: null});
    }

    const onTechChange = (tech: string) => {
        onChange({...value, tech});
    }

    return (
        <FormSection title={'Category'} error={error} className='mb-4' required={true} ref={ref}>
            <GridRadioGroup<string> value={value.category ?? ''} options={CATEGORIES} onChange={onCategoryChange}></GridRadioGroup>
            {
                value.category && (TECH_BY_CATEGORY as any)[value.category]?.length &&
                <FormSection title='Technology' nested={true} className='border-none pl-0'>
                    <GridRadioGroup value={value.tech ?? ''}
                                    onChange={onTechChange}
                                    options={(TECH_BY_CATEGORY as any)[value.category] ?? []}></GridRadioGroup>
                </FormSection>
            }
        </FormSection>
    );
});

export const CategoryTechSectionControl = CreateControl<CategoryTechSectionValue, CategoryTechSectionProps>(CategoryTechSection);
