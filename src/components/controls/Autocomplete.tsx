import Tag from '../Tag';
import * as Popover from '@radix-ui/react-popover';
import React, {
    useEffect,
    useRef,
    useState,
    KeyboardEvent,
    MouseEvent,
    forwardRef,
    ForwardedRef,
    Ref, useMemo
} from 'react';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {useKeyPress} from '@/utils/hooks/useKeyPress.ts';
import TagsList from '@/components/TagsList.tsx';
import {ControlValueAccessorProps} from '@/components/common/ControlValueAccessorProps.ts';
import {CreateControl} from '@/components/common/CreateControl.tsx';

export interface AutocompleteOption<T> {
    label: string;
    value?: T;
}

export interface AutocompleteProps<T> extends ControlValueAccessorProps<AutocompleteOption<T>[]> {
    value: AutocompleteOption<T>[];
    onChange: (options: AutocompleteOption<T>[]) => void;
    optionsResolver?: (search: string) => Promise<AutocompleteOption<T>[]>;
    omitOptions?: AutocompleteOption<T>[];
    draggableOptions?: boolean;
    name?: string;
}

export const Autocomplete = forwardRef(function Autocomplete<T = any>(
    {
        value = [],
        optionsResolver,
        onChange,
        omitOptions,
        draggableOptions,
        name = 'autocomplete',
    }: AutocompleteProps<T>,
    ref: ForwardedRef<HTMLDivElement>
) {
    const [options, setOptions] = useState<AutocompleteOption<T>[]>([]);
    const [cursor, setCursor] = useState(0);
    const [opened, setOpened] = useState(false);
    const downPress = useKeyPress("ArrowDown");
    const upPress = useKeyPress("ArrowUp");

    const inputRef = useRef<HTMLInputElement>(null);

    const fetchOptions = async (search: string) => {
        const resolvedOptions = (optionsResolver && await optionsResolver(search)) ?? [];
        setOptions(resolvedOptions);
    };

    const selectOption = async (opt: AutocompleteOption<T>) => {
        onChange?.([...value ?? [], opt]);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        await fetchOptions('');
    };


    const displayOptions = useMemo(() => {
        const selectedSet = new Set(value?.filter(Boolean)?.map((s) => s.label));
        const omitSet = new Set((omitOptions ?? []).filter(Boolean).map((s) => s.label));
        return options.filter((opt) => {
            return !selectedSet.has(opt.label) && !omitSet.has(opt.label);
        });
    }, [value, omitOptions, options])

    useEffect(() => {
        if (displayOptions.length && downPress) {
            setCursor(prevState =>
                prevState < displayOptions.length - 1 ? prevState + 1 : prevState
            );
        }
    }, [downPress, displayOptions]);

    useEffect(() => {
        if (displayOptions.length && upPress) {
            setCursor(prevState =>
                prevState > 0 ? prevState - 1 : prevState
            );
        }
    }, [upPress, displayOptions]);

    const removeOption = (opt: AutocompleteOption<T>) => {
        console.log('DROP', opt);
        inputRef.current?.focus();
        onChange?.(value.filter((o) => o.label !== opt.label));
    }
    const onOpenChange = async (open: boolean) => {
        setOpened(open);
        if (open) {
            console.log('OPEN');
            inputRef.current?.focus();
            await fetchOptions(inputRef.current?.value ?? '');
        } else {
            inputRef.current?.focus();
        }
    };

    const onInputKey = async (e: KeyboardEvent) => {
        setOpened(true);
        if (e.key === 'Enter') {
            e.preventDefault();
            if (displayOptions[cursor]) {
                await selectOption(displayOptions[cursor]);
                setCursor((prevCursor) => {
                    return Math.max(
                        0,
                        Math.min(displayOptions.length - 2, prevCursor)
                    );
                });
            }
        }
        console.log(inputRef.current?.value, value?.length);
        if (e.key === 'Backspace' && !inputRef.current?.value && value?.length) {
            console.log('Back');
            removeOption(value[value.length - 1])
        }
    };

    const onTriggerClick = () => {
        console.log('Trigger click');
        inputRef.current?.focus();
    };

    const onContentClick = (e: MouseEvent) => {
        e.stopPropagation();
        inputRef.current?.focus();
    };

    const onClearClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        onChange?.([]);
    }

    return (
        <Popover.Root open={opened} onOpenChange={onOpenChange}>
            <Popover.Anchor asChild>
                <Popover.Trigger className='w-full flex flex-1'>
                    <div ref={ref} onClick={onTriggerClick} className='flex w-full rounded-md bg-background border border-border p-1 focus-within:outline outline-offset-2 outline-2 outline-border'>
                        <div className='flex flex-1 w-full items-center flex-wrap gap-1 -mb-1'>
                            <TagsList deletable={true}
                                      dropName={name}
                                      tags={value}
                                      onDelete={removeOption}
                                      dragEnabled={draggableOptions}>
                                <input
                                    ref={inputRef}
                                    className='leading-8 flex flex-1 w-full bg-transparent text-white border-none outline-none'
                                    type='text'
                                    onKeyDown={(e) => onInputKey(e)}
                                    onChange={(s) => fetchOptions(s.target.value)}/>
                            </TagsList>
                            {!!value.length && <XMarkIcon className='h-6 w-6 pr-2' onClick={onClearClick}/>}
                        </div>


                        <Popover.Portal>
                            <Popover.Content className='w-full' onCloseAutoFocus={(e) => e.preventDefault()} onOpenAutoFocus={(e) => e.preventDefault()}>
                                <div onClick={onContentClick} style={{width: 'var(--radix-popper-anchor-width)'}}
                                     className='my-1 flex flex-wrap gap-1 p-2 bg-white rounded border border-border'>
                                    {
                                        displayOptions.map((opt, index) => {
                                            return (
                                                <Tag size={'md'}
                                                     onClick={() => selectOption(opt)}
                                                     highlighted={index === cursor}
                                                     key={opt.label}>
                                                    {opt.label}
                                                </Tag>);
                                        })
                                    }
                                    {
                                        !displayOptions.length && <div className='flex justify-center text-slate-800'>Nothing found</div>
                                    }
                                </div>
                            </Popover.Content>
                        </Popover.Portal>
                    </div>
                </Popover.Trigger>
            </Popover.Anchor>
        </Popover.Root>
    )
}) as <T>(props: AutocompleteProps<T> & { ref?: Ref<HTMLDivElement> }) => React.JSX.Element;

export const AutocompleteControl = CreateControl<AutocompleteOption<any>[], AutocompleteProps<any>>(Autocomplete);


