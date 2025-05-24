import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import { Shield, Users, BookOpen, BarChart3, Activity, Clock } from 'lucide-react';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('MyWeddingSL')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <NavLink to="/admin/dashboard" className="group">
                                    <div className="flex items-center">
                                        <BarChart3 className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Dashboard')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'profiles' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('profiles')}>
                                    <div className="flex items-center">
                                        <Users className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Profile Management')}</span>
                                    </div>
                                    <div className={currentMenu === 'profiles' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <IconCaretsDown />
                                    </div>
                                </button>
                                <ul className={`sub-menu text-gray-500 ${currentMenu === 'profiles' ? 'block' : 'hidden'}`}>
                                    <li>
                                        <NavLink to="/admin/profiles" className="group">
                                            <div className="flex items-center">
                                                <Users className="group-hover:!text-primary shrink-0 w-4 h-4" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('All Profiles')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'verification' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('verification')}>
                                    <div className="flex items-center">
                                        <Shield className="group-hover:!text-primary shrink-0 text-blue-600" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark font-medium">{t('NIC Verification')}</span>
                                    </div>
                                    <div className={currentMenu === 'verification' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <IconCaretsDown />
                                    </div>
                                </button>
                                <ul className={`sub-menu text-gray-500 ${currentMenu === 'verification' ? 'block' : 'hidden'}`}>
                                    <li>
                                        <NavLink to="/admin/nic-verification" className="group">
                                            <div className="flex items-center">
                                                <Shield className="group-hover:!text-primary shrink-0 w-4 h-4 text-blue-500" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('All NICs')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'logs' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('logs')}>
                                    <div className="flex items-center">
                                        <Activity className="group-hover:!text-primary shrink-0 text-green-600" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark font-medium">{t('Activity Logs')}</span>
                                    </div>
                                    <div className={currentMenu === 'logs' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <IconCaretsDown />
                                    </div>
                                </button>
                                <ul className={`sub-menu text-gray-500 ${currentMenu === 'logs' ? 'block' : 'hidden'}`}>
                                    <li>
                                        <NavLink to="/admin/matrimony-logs" className="group">
                                            <div className="flex items-center">
                                                <Clock className="group-hover:!text-primary shrink-0 w-4 h-4 text-green-500" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Matrimony Logs')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'content' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('content')}>
                                    <div className="flex items-center">
                                        <BookOpen className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Content Management')}</span>
                                    </div>
                                    <div className={currentMenu === 'content' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <IconCaretsDown />
                                    </div>
                                </button>
                                <ul className={`sub-menu text-gray-500 ${currentMenu === 'content' ? 'block' : 'hidden'}`}>
                                    <li>
                                        <NavLink to="/admin/all-blog" className="group">
                                            <div className="flex items-center">
                                                <BookOpen className="group-hover:!text-primary shrink-0 w-4 h-4" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('ALL-BLOG')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
