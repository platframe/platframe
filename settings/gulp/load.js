import log from 'fancy-log';
import { watch } from 'gulp';
import { spawn } from 'child_process';

export default async ({ task, flag }) => {

    let child;

    const sources = [
        './.env.dev',
        './settings/**/*.js',
    ];

    const purgeEnvCache = () => {

        Object.keys(process.env).forEach(key => {
            if (key.match(/^PLATFRAME_/)) delete process.env[key]
        })

    }

    const spawnChild = async () => {

        if (child) {
            purgeEnvCache();
            child.kill();
            log(`\u{1F6E0}\u{FE0F}\u{00A0} Project settings changed, creating a new development environment.`);
        }

        child = spawn('gulp', [task, flag], { stdio: 'inherit' });

    }

    watch(sources, { ignoreInitial: false }, spawnChild);

};
