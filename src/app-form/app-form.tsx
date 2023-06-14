import {FormProvider, useForm} from "react-hook-form";
import {CategoryTechSectionControl} from './sections/CategoryTechSection';
import {zodResolver} from '@hookform/resolvers/zod';
import {SenioritySectionControl} from './sections/SenioritySection';
import {SalarySectionControl} from './sections/SalarySection';
import {useEffect} from 'react';
import {LanguageSectionControl} from './sections/LanguageSection';
import {SkillsSectionControl} from './sections/SkillsSection';
import {TECH_BY_CATEGORY} from './tech-by-category';
import {formSchema, FormSchema} from './form-schema';
import {FormSection} from '@/components/FormSection.tsx';
import {Input} from '@/components/shadcn/ui/input.tsx';
import {Button} from '@/components/shadcn/ui/button.tsx';

const skillsResolver = async (search: string, category: string) => {
    return ((TECH_BY_CATEGORY as any)[category] ?? []).filter((s: string) => s.toLowerCase().includes(search.toLowerCase()))
        .map((s: string) => ({value: s, label: s}));
};

export function AppForm() {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            categoryTech: {
                category: '',
                tech: ''
            },
            seniority: '',
            salary: {
                currency: 'USD',
                min: '',
                max: '',
                period: 'MONTH'
            },
            skills: {
                mustHave: [],
                niceToHave: [],
            },
            languages: {}
        },
    });

    const  {formState: {errors}, register, watch} = form;
    const onSubmit = async (data: FormSchema) => {
        console.log(data);
    }

    const {category} = watch('categoryTech');

    useEffect(() => {
        form.setValue('skills', {mustHave: [], niceToHave: []});
    }, [category, form]);

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormSection title={'Job Title'} error={errors.title?.message} required={true}>
                    <Input placeholder="Job Title" {...register('title')} />
                </FormSection>

                <SalarySectionControl name={'salary'}/>
                <SenioritySectionControl name={'seniority'}/>
                <CategoryTechSectionControl name={'categoryTech'}/>
                {
                    category && (
                        <SkillsSectionControl name={'skills'} optionsResolver={(s: string) => skillsResolver(s, category)}/>
                    )
                }
                <LanguageSectionControl name={'languages'}/>
                <div className='flex justify-end'>
                    <Button type="submit">Submit</Button>
                </div>

            </form>
        </FormProvider>
    );
}
