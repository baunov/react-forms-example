import {Draggable, Droppable} from 'react-beautiful-dnd';
import Tag from '@/components/Tag';
import {ReactNode} from 'react';

export interface DraggableTagsListProps {
    dropName: string;
    tags: {label: string}[];
    deletable?: boolean;
    onDelete?: (tag: any) => void;
    children?: ReactNode;
    dragEnabled?: boolean;
}

export default function TagsList({children, tags, dropName, deletable, onDelete, dragEnabled}: DraggableTagsListProps) {
    if (dragEnabled) {
        return (
            <Droppable droppableId={dropName} direction={'horizontal'}>
                {
                    provided => (
                        <div className='flex flex-1 w-full items-center flex-wrap' ref={provided.innerRef} {...provided.droppableProps}>
                            {
                                tags.map((opt, index) => {
                                    return (
                                        <Draggable isDragDisabled={!dragEnabled} key={opt.label} draggableId={opt.label} index={index}>
                                            {
                                                (dProvided) => (
                                                    <Tag {...dProvided.draggableProps}
                                                         {...dProvided.dragHandleProps}
                                                         className={'mr-1 mb-1'}
                                                         ref={dProvided.innerRef}
                                                         deleted={() => onDelete?.(opt)} size={'md'}
                                                         draggable={true} key={opt.label}
                                                         data={opt} deletable={deletable}>
                                                        {opt.label}
                                                    </Tag>
                                                )
                                            }
                                        </Draggable>
                                    );
                                })
                            }
                            {provided.placeholder}
                            {children}
                        </div>
                    )
                }
            </Droppable>
        );
    }
    return (
        <div className='flex flex-1 w-full items-center flex-wrap'>
            {
                tags.map((opt) => {
                    return (
                        <Tag className={'mr-1 mb-1'}
                             deleted={() => onDelete?.(opt)} size={'md'}
                             key={opt.label}
                             data={opt} deletable={deletable}>
                            {opt.label}
                        </Tag>
                    );
                })
            }
            {children}
        </div>
    );
}
