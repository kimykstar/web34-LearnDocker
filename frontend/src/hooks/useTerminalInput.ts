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
    const [previousLines, setPreviousLines] = useState<string[]>([]);

    const handleTerminalInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        const lines = value.split('\n');
        let lastLine = lines[lines.length - 1];

        if (!lastLine?.startsWith(prefix)) {
            lastLine = prefix;
        }

        setTerminalInput([...previousLines, lastLine].join('\n'));
    };

    const handleCommandSuccess = (data: string) => {
        setPreviousLines([...previousLines, terminalInput, data]);
        setTerminalInput(terminalInput + '\n' + data + '\n' + prefix);
    };

    const handleCommandError = () => {
        //TODO: 허용되지 않은 명령어 일때 어떻게 처리할지 결정 해야함
        //일단 alert으로 처리
        alert('허용되지 않은 명령어 입니다.');
    };

    const handleTerminalEnter = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            const lines = terminalInput.split('\n');
            const lastLine = lines[lines.length - 1];
            const command = lastLine?.slice(prefix.length).trim();

            if (!command) {
                return;
            }

            const commandResponse = await requestCommandResult(
                command,
                navigate,
                handleCommandError
            );

            if (!commandResponse) {
                return;
            }

            handleCommandSuccess(commandResponse);
        }
    };

    return {
        terminalInput,
        handleTerminalInput,
        handleTerminalEnter,
    };
};
