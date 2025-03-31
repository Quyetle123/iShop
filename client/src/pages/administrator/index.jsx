import { Outlet } from 'react-router-dom';
import { GlobalStyle, MainContainerWithContext, MenuContainer } from '../Style/style';
import Header from '../../layout/administrator/Header';
import { SidebarProvider } from '../../context/SidebarContext';
import HeaderTop from '../../layout/administrator/HeaderTop';

const Administrator = () => {
    return (
        <SidebarProvider>
            <GlobalStyle />
            <MenuContainer>
                <Header />
                <MainContainerWithContext>
                    <HeaderTop />
                    <Outlet />
                </MainContainerWithContext>
            </MenuContainer>
        </SidebarProvider>
    );
};

export default Administrator;
