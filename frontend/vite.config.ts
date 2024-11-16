import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '../');
    return {
        plugins: [react()],
        envDir: '../',
        define: {
            'import.meta.env': JSON.stringify(env),
        },
    };
});
