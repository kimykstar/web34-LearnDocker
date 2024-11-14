import { useState } from 'react';
import { requestCommandResult } from '../api/quiz';
import { useNavigate } from 'react-router-dom';

type UseTerminalInput = {
    terminalInput: string;
    handleTerminalInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleTerminalEnter: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

export const useTerminalInput = (): UseTerminalInput => {
    const prefix = '~$';
    const navigate = useNavigate();
    const [terminalInput, setTerminalInput] = useState(prefix);

    const handleTerminalInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        if (value.startsWith(prefix)) {
            setTerminalInput(value);
        } else {
            setTerminalInput(prefix + value.slice(prefix.length));
        }
    };

    const handleCommandSuccess = (data: string) => {
        setTerminalInput(terminalInput + '\n' + data);
    };

    const handleCommandError = () => {
        //TODO: 허용되지 않은 명령어 일때 어떻게 처리할지 결정 해야함
        //일단 alert으로 처리
        alert('허용되지 않은 명령어 입니다.');
    };

    const handleTerminalEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            const lines = terminalInput.split('\n');
            const lastLine = lines[lines.length - 1];
            const command = lastLine?.slice(prefix.length).trim();

            if (command) {
                requestCommandResult(command, handleCommandSuccess, navigate, handleCommandError);
            }
        }
    };

    return {
        terminalInput,
        handleTerminalInput,
        handleTerminalEnter,
    };
};
