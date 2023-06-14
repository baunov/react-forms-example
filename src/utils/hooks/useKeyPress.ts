import {useEffect, useState} from 'react';

export const useKeyPress = function(targetKey: string) {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
        const downHandler = (e: KeyboardEvent) => {
            if (e.key === targetKey) {
                e.preventDefault();
                setKeyPressed(true);
            }
        }

        const upHandler = ({ key }: {key: string}) => {
            if (key === targetKey) {
                setKeyPressed(false);
            }
        };

        window.addEventListener("keydown", (e) => {
            downHandler(e);
        });
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, [targetKey]);

    return keyPressed;
};
