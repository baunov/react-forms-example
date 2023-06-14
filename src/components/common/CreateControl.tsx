import {Controller} from 'react-hook-form';
import {ComponentType} from 'react';
import {ControlValueAccessorProps} from './ControlValueAccessorProps.ts';

export function CreateControl<V, T extends ControlValueAccessorProps<V>>(ValueAccessor: ComponentType<T>) {
    const displayName =
        ValueAccessor.displayName || ValueAccessor.name || "Component";
    const ComponentControl = ({name, ...props}: {name: string} & Omit<T, keyof ControlValueAccessorProps<V>>) => {
        return (
            <Controller
                name={name}
                render={({field, fieldState}) => {
                    return (<ValueAccessor {...props} {...fieldState} {...field as any}/>);
                }}
            />
        );
    };

    ComponentControl.displayName = `${displayName}Control`;

    return ComponentControl;
}
