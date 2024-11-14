import { HttpService } from '@nestjs/axios';

// 어떤 명령어가 들어오느냐에 따라 다르게
export async function requestDockerCommand(
    httpService: HttpService,
    containerId: string,
    command: Array<string>
) {
    const exec = await httpService.axiosRef.post(
        `http://127.0.0.1:2375/containers/${containerId}/exec`,
        {
            AttachStdin: false,
            AttachStdout: true,
            AttachStderr: true,
            Tty: false,
            Cmd: command,
        }
    );
    const response = await httpService.axiosRef.post(
        `http://127.0.0.1:2375/exec/${exec.data.Id}/start`,
        {
            Detach: false,
            Tty: true,
            ConsoleSize: [80, 64],
        }
    );

    return response.data;
}
