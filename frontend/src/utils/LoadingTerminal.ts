import { Terminal } from '@xterm/xterm';

export default class LoadingTerminal {
    private term: Terminal;
    private spinnerFrames: string[];
    private currentFrame: number;
    private loadingInterval: number;
    private loadingTimeout: number;

    constructor(term: Terminal) {
        this.term = term;
        this.spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
        this.currentFrame = 0;
        this.loadingInterval = 0;
        this.loadingTimeout = 0;
    }

    public spinnerStart(timeDelay: number = 1500) {
        this.term.write('\r\n');
        this.loadingTimeout = setTimeout(() => {
            this.showSpinner();
        }, timeDelay);
    }

    private showSpinner() {
        this.loadingInterval = setInterval(() => {
            this.term.write(`\r${this.spinnerFrames[this.currentFrame]} 실행 중...`);
            this.currentFrame = (this.currentFrame + 1) % this.spinnerFrames.length;
        }, 80);
    }

    public spinnerStop() {
        if (this.loadingTimeout) {
            clearTimeout(this.loadingTimeout);
            this.loadingTimeout = 0;
        }

        clearInterval(this.loadingInterval);
        this.term.write('\r\x1b[2K');
    }
}
