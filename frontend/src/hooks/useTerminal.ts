import { useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import {
    handleEnter,
    handleBackspace,
    handleDefaultKey,
    isPrintableKey,
} from '../utils/terminalUtils';
import { ENTER_KEY, BACKSPACE_KEY } from '../constant/xterm';

export function useTerminal(updateVisualizationData: (command: string) => Promise<void>) {
    const currentLineRef = useRef<string>('');

    const handleCommandError = (term: Terminal) => {
        if (!term) return;
        term.write('\x1b[91m허용되지 않은 명령어 입니다.\x1b[0m\r\n');
    };

    const handleKeyInput = async (term: Terminal, key: string) => {
        switch (key) {
            case ENTER_KEY: {
                await handleEnter(
                    term,
                    currentLineRef.current.trim(),
                    handleCommandError,
                    updateVisualizationData
                );
                currentLineRef.current = '';
                break;
            }

            case BACKSPACE_KEY: {
                currentLineRef.current = handleBackspace(term, currentLineRef.current);
                break;
            }

            default: {
                if (!isPrintableKey(key)) return;
                currentLineRef.current = handleDefaultKey(term, key, currentLineRef.current);
                break;
            }
        }
    };

    return { handleKeyInput };
}
