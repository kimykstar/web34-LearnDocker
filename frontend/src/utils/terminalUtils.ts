import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { requestCommandResult } from '../api/quiz';

export function createTerminal(container: HTMLElement): Terminal {
    const terminal = new Terminal({
        cursorBlink: true,
        fontFamily: '"Noto Sans Mono", "Noto Sans KR", courier-new, courier, monospace',
        fontSize: 14,
        rows: 20,
        fontWeight: '300',
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(container);
    fitAddon.fit();

    const handleResize = () => {
        fitAddon.fit();
        terminal.resize(terminal.cols, 20);
    };

    window.addEventListener('resize', handleResize);

    const originalDispose = terminal.dispose.bind(terminal);
    terminal.dispose = () => {
        window.removeEventListener('resize', handleResize);
        originalDispose();
    };

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
    handleCommandError: (term: Terminal) => void,
    updateVisualization: (command: string) => Promise<void>
) => {
    if (!command) {
        term.write('\r\n~$ ');
        return;
    }

    if (command === 'clear') {
        handleClear(term);
        return;
    }

    term.write('\r\n');
    const commandResponse = await requestCommandResult(command, term, handleCommandError);

    if (commandResponse !== null) {
        term.write(commandResponse);
    }
    await updateVisualization(command);

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
