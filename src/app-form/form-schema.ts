import * as z from 'zod';

export const formSchema = z.object({
    title: z.string().min(2, {
        message: "Job title should be at least 2 characters long",
    }),
    categoryTech: z.object({
        category: z.string().min(2),
        tech: z.optional(z.string().or(z.null()))
    }).refine((value) => {
        return !!value.category;
    }, "This section is required"),
    seniority: z.string().min(2),
    salary: z.object({
        currency: z.string(),
        min: z.number().or(z.null()).or(z.literal("")),
        max: z.number().or(z.null()).or(z.literal("")),
        period: z.string(),
    }).refine((val) => {
        return !!val.min && !!val.max;
    },  {message: 'Salary is required'})
        .refine((val) => {
            return val.min! <= val.max!;
        }, {message: 'Invalid minimum/maximum salary'}),
    skills: z.object({
        mustHave: z.array(z.object({
            label: z.string(),
            value: z.string()
        })),
        niceToHave: z.array(z.object({
            label: z.string(),
            value: z.string()
        }))
    }).refine(({mustHave}) => {
        return mustHave.length > 0;
    }, 'This section is required'),
    languages: z.record(z.string(), z.object({
        level: z.optional(z.string()),
        required: z.boolean()
    })).refine((value) => {
        return Object.keys(value).length > 0;
    }, {message: 'Select at least one language'})
}).required();

export type FormSchema = z.infer<typeof formSchema>;
