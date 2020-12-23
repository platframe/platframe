import { src, dest } from 'gulp';
import { rollup } from 'rollup';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import include from 'rollup-plugin-includepaths';
import resolve from '@rollup/plugin-node-resolve';
import { app, src as source, ctx } from '..';

const production = ctx.id === 'production';

const data = {
    ENV: `'${ ctx.id }'`,
    VERSION: `'${ app.version }'`,
    AUTHOR: `'${ app.author }'`,
    DATE: `'${ app.date }'`,
};

const preamble =
`/* ┌ 𝗯𝘂𝗶𝗹𝗱
 * ├ type: ${ ctx.id }
 * └ date: ${ app.date }
 *  𝘃𝗲𝗿𝘀𝗶𝗼𝗻: ${ app.version }
 *  𝗴𝗲𝗻𝗲𝗿𝗮𝘁𝗼𝗿: Platframe
 *  © ${ app.author } */\n`;

function logic() {

    return rollup({
        input: `${ source.logic }/root.js`,
        plugins: [
            eslint({
                exclude: [
                    `${ source.fonts }/**`,
                    `${ source.images }/**`,
                    `${ source.styles }/**`,
                    `${ source.templates }/**`,
                ],
            }),
            resolve(),
            include({
                paths: [source.components, `${ source.logic }/`]
            }),
            replace({
                exclude: 'node_modules/**',
                values: data,
            }),
            babel({
                exclude: 'node_modules/**',
                babelHelpers: 'bundled',
            }),
            (production && terser({
                output: {
                    preamble,
                },
            })),
        ]
    })
        .then(bundle => {
            return bundle.write({
                format: 'iife',
                sourcemap: production ? false : true,
                file: `${ ctx.path.logic }/root.js`,
            });
        }) // verbatim copy non-JS logic
        .then(src(`${ source.logic }/**/*.{py,rb,php*}`)
            .pipe(dest(ctx.path.logic))
        );

}

export default logic;
