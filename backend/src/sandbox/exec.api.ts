import { HttpService } from '@nestjs/axios';

// 어떤 명령어가 들어오느냐에 따라 다르게
export async function requestDockerCommand(
    httpService: HttpService,
    containerId: string,
    command: Array<string>
) {
    const exec = await httpService.axiosRef.post(
        `${process.env.SANDBOX_URL}/containers/${containerId}/exec`,
        {
            AttachStdin: false,
            AttachStdout: true,
            AttachStderr: true,
            Tty: true,
            Cmd: command,
        }
    );
    const response = await httpService.axiosRef.post(
        `${process.env.SANDBOX_URL}/exec/${exec.data.Id}/start`,
        {
            Detach: false,
            Tty: true,
        }
    );

    return response.data;
}
