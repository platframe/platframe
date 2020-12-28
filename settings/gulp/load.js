import log from 'fancy-log';
import { watch } from 'gulp';
import context from 'dotenv';
import { spawn } from 'child_process';

export default async ({ task, flag }) => {

    let child;

    const sources = [
        './.env',
        './settings/**/*.js',
    ];

    const purgeEnvCache = () => {

        Object.keys(process.env).forEach(key => {
            if (key.match(/^PLATFRAME_/)) delete process.env[key]
        })

    }

    const spawnChild = async () => {

        if (child) {
            // clear environment
            purgeEnvCache();
            // purge outdated process
            child.kill();
            // notify user
            log(`\u{1F6E0}\u{FE0F}\u{00A0} Project settings changed, creating a new development environment.`);
            // re-establish context
            context.config();
        }

        child = spawn('gulp', [task, flag], { stdio: 'inherit' });

    }

    watch(sources, { ignoreInitial: false }, spawnChild);

};
