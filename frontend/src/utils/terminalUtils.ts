import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { NavigateFunction } from 'react-router-dom';
import { requestCommandResult } from '../api/quiz';

export function createTerminal(container: HTMLElement): Terminal {
    const terminal = new Terminal({
        cursorBlink: true,
        fontSize: 14,
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(container);
    fitAddon.fit();

    return terminal;
}

const handleClear = (term: Terminal) => {
    term.clear();
    term.write('\x1b[2K\r~$ ');
};

export const handleBackspace = (term: Terminal, currentLine: string) => {
    if (currentLine.length > 0) {
        term.write('\b \b');
        return currentLine.slice(0, -1);
    }
    return currentLine;
};

export const handleEnter = async (
    term: Terminal,
    command: string,
    navigate: NavigateFunction,
    handleCommandError: (term: Terminal) => void,
    updateVisualization: () => Promise<void>
) => {
    if (!command) {
        term.write('\r\n~$ ');
        return;
    }

    if (command === 'clear') {
        handleClear(term);
        return;
    }

    const commandResponse = await requestCommandResult(command, navigate, term, handleCommandError);
    term.write('\r\n' + commandResponse);
    await updateVisualization();

    term.write('\r\n~$ ');
};

export const handleDefaultKey = (term: Terminal, key: string, currentLine: string) => {
    term.write(key);
    return currentLine + key;
};

export const isPrintableKey = (key: string): boolean => {
    // 아스키 32 ~ 126 사이는 출력 가능한 문자
    return key.length === 1 && key.charCodeAt(0) >= 32 && key.charCodeAt(0) <= 126;
};
