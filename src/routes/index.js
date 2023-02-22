import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Feedback from '~/pages/Feedback';
import Live from '~/pages/Live';
import { HeaderOnly, LargeView, NoHeader } from '~/layouts';
import config from '~/config';
import { AuthModal } from '~/components/AuthForm';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile, layout: LargeView },
    { path: config.routes.live, component: Live, layout: LargeView, props: { livestream: true } },
    { path: config.routes.feedback, component: Feedback, layout: HeaderOnly },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.login, component: AuthModal, layout: NoHeader },
    {
        path: config.routes.signup,
        component: AuthModal,
        layout: NoHeader,
        props: { defaultComponent: 'signup' },
    },
    {
        path: config.routes.mailLogin,
        component: AuthModal,
        layout: NoHeader,
        props: { defaultComponent: 'mail-login' },
    },
    {
        path: config.routes.mailSignup,
        component: AuthModal,
        layout: NoHeader,
        props: { defaultComponent: 'mail-signup' },
    },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
