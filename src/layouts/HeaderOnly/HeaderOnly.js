import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';

function HeaderOnly({ children }) {
    return (
        <div className="header-only-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
            <Header />
            <div className="header-only-container" style={{ marginTop: 'var(--default-layout-header-height)' }}>
                <div className="header-only-content">{children}</div>
            </div>
            <Footer horizontal />
        </div>
    );
}

export default HeaderOnly;
