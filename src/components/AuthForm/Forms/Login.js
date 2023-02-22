import {
    AppleIcon,
    FacebookIcon,
    GoogleIcon,
    InstagramIcon,
    KaKaoTalkIcon,
    LINEIcon,
    QrCodeIcon,
    TwitterIcon,
    UserIcon,
} from '~/components/Icons';
import CommonAuthUI from './CommonAuthUI';

const data = [
    {
        label: 'Use QR Code',
        icon: <QrCodeIcon />,
    },
    {
        label: 'Use phone / email / username',
        icon: <UserIcon />,
        children: {
            href: '/login/mail',
            type: 'mail-login',
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

function Login() {
    return (
        <CommonAuthUI
            title="Log in to Tiktok"
            data={data}
            isLogin
        />
    );
}

export default Login;
