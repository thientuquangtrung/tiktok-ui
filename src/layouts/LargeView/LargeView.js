import DefaultLayout from '../DefaultLayout';

function LargeView({ children, ...props }) {
    return <DefaultLayout largeView {...props}>{children}</DefaultLayout>;
}

export default LargeView;
