import { pick } from 'lodash';
import jwtService from '../../../services/jwt-service';
import { User } from '../../users';

export default {
    async signUp(ctx) {
        const { _id } = await User.create(pick(ctx.request.body, User.createFields));
        const user = await User.findOneWithPublicFields({ _id });

        ctx.body = { data: user };
    },
    async signIn(ctx) {
        const { email, password } = ctx.request.body;

        if (!email || !password) {
            ctx.throw(400, { message: 'Invalid data' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            ctx.throw(400, { message: 'User not found' });
        }

        if (!user.comparePasswords(password)) {
            ctx.throw(400, { message: 'Invalid data' });
        }

        const token = jwtService.genToken({ email });

        ctx.body = { data: token };
    },
};
