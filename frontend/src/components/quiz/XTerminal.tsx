import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { useTerminal } from '../../hooks/useTerminal';
import { createTerminal } from '../../utils/terminalUtils';
import '@xterm/xterm/css/xterm.css';

type XTerminalProps = {
    updateVisualizationData: (command: string) => Promise<void>;
};

const XTerminal = ({ updateVisualizationData }: XTerminalProps) => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const terminalInstanceRef = useRef<Terminal | null>(null);
    const { handleKeyInput } = useTerminal(updateVisualizationData);

    useEffect(() => {
        if (!terminalRef.current) return;

        const terminal = createTerminal(terminalRef.current);
        terminalInstanceRef.current = terminal;

        terminal.onKey((event) => {
            handleKeyInput(terminal, event.key);
        });

        return () => terminal.dispose();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='h-[30%] w-[83.5%] border rounded-lg border-gray-300 bg-gray-50 ml-4'>
            <div ref={terminalRef} className='h-full w-full p-2' />
        </div>
    );
};

export default XTerminal;
