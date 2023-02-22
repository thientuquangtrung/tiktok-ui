import {
    AppleIcon,
    FacebookIcon,
    GoogleIcon,
    InstagramIcon,
    KaKaoTalkIcon,
    LINEIcon,
    TwitterIcon,
    UserIcon,
} from '~/components/Icons';
import CommonAuthUI from './CommonAuthUI';

const data = [
    {
        label: 'Use email address',
        icon: <UserIcon />,
        children: {
            href: '/signup/mail',
            type: 'mail-signup',
        },
    },
    {
        label: 'Continue with Facebook',
        icon: <FacebookIcon />,
    },
    {
        label: 'Continue with Google',
        icon: <GoogleIcon />,
    },
    {
        label: 'Continue with Twitter',
        icon: <TwitterIcon />,
    },
    {
        label: 'Continue with LINE',
        icon: <LINEIcon />,
    },
    {
        label: 'Continue with KaKaoTalk',
        icon: <KaKaoTalkIcon />,
    },
    {
        label: 'Continue with Apple',
        icon: <AppleIcon />,
    },
    {
        label: 'Continue with Instagram',
        icon: <InstagramIcon />,
    },
];

function Signup() {
    return <CommonAuthUI title="Sign up for Tiktok" data={data} />;
}

export default Signup;
