import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import {ForwardedRef, forwardRef} from 'react';
import {ControlValueAccessorProps} from '@/components/common/ControlValueAccessorProps.ts';
import {Autocomplete, AutocompleteOption} from '@/components/controls/Autocomplete.tsx';
import {reorder} from '@/utils/reorder.ts';
import {insertAt} from '@/utils/insertAt.ts';
import {FormSection} from '@/components/FormSection.tsx';
import {CreateControl} from '@/components/common/CreateControl.tsx';

export interface SkillsValue {
    mustHave: AutocompleteOption<string>[];
    niceToHave: AutocompleteOption<string>[];
}

export interface SkillsSectionProps extends ControlValueAccessorProps<SkillsValue> {
    optionsResolver: (search: string) => Promise<AutocompleteOption<string>[]>;
}

export const SkillsSection = forwardRef(
    function SkillsSection({value, onChange, error, optionsResolver}: SkillsSectionProps, ref: ForwardedRef<HTMLDivElement>) {

    const mustHaveSkills = value.mustHave;
    const niceToHaveSkills = value.niceToHave;

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        if (result.source.droppableId === result.destination.droppableId) {
            const dropId = result.destination.droppableId as keyof SkillsValue;
            onChange({
                ...value,
                [dropId]: reorder(value[dropId], result.source.index, result.destination.index)
            });
        } else {
            if (result.destination.droppableId === 'mustHave') {
                const opt = value.niceToHave.find((o) => o.label === result.draggableId)!;
                onChange({
                    mustHave: insertAt(value.mustHave, opt, result.destination.index),
                    niceToHave: value.niceToHave.filter((o) => o.label !== opt.label)
                });
            }
            if (result.destination.droppableId === 'niceToHave') {
                const opt = value.mustHave.find((o) => o.label === result.draggableId)!;
                onChange({
                    niceToHave: insertAt(value.niceToHave, opt, result.destination.index),
                    mustHave: value.mustHave.filter((o) => o.label !== opt.label)
                });
            }
        }
    }

    const onMustHaveChange = (options: AutocompleteOption<string>[]) => {
        onChange({...value, mustHave: options});
    };

    const onNiceToHaveChange = (options: AutocompleteOption<string>[]) => {
        onChange({...value, niceToHave: options});
    };

    return (
        <FormSection ref={ref} title={'Skills'} error={error} required={true}>
            <DragDropContext onDragEnd={onDragEnd}>
                <label className='grid grid-cols-[110px_1fr] items-center'>
                    <div>Must have</div>
                    <Autocomplete draggableOptions={true}
                                  value={value.mustHave}
                                  onChange={onMustHaveChange}
                                  omitOptions={niceToHaveSkills}
                                  optionsResolver={optionsResolver}
                                  name={'mustHave'}/>
                </label>


                <label className='grid grid-cols-[110px_1fr] items-center'>
                    <div>Nice to have</div>
                    <Autocomplete draggableOptions={true}
                                  value={value.niceToHave}
                                  onChange={onNiceToHaveChange}
                                  omitOptions={mustHaveSkills}
                                  optionsResolver={optionsResolver}
                                  name={'niceToHave'}/>
                </label>
            </DragDropContext>
        </FormSection>
    );
});

export const SkillsSectionControl = CreateControl<SkillsValue, SkillsSectionProps>(SkillsSection);
