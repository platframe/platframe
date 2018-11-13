import { ctx } from '..';
import notifier from 'node-notifier';

const production  = 'The production build ran successfully.';
const development = 'The development build ran successfully. Watching source for changes...';

export default function notify(done) {

    notifier.notify({
        title: 'Platframe',
        message: ctx.id === 'production' ? production : development,
        timeout: 5,
    });

    done();

}