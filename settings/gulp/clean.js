import del from 'del';
import { ctx } from '..';

const clean = () => del([ ctx.path.root ]);

export default clean;