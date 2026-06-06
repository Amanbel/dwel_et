import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../store/LanguageContext';
import { cn } from '../../utils/helpers';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const navItems = [
    { name: t('dashboard'), path: '/dashboard', icon: 'dashboard' },
    { name: t('analytics'), path: '/analytics', icon: 'insights' },
    { name: t('reports'), path: '/reports', icon: 'description' },
    { name: t('sessions'), path: '/sessions', icon: 'history_edu' },
    { name: t('recommendations'), path: '/recommendations', icon: 'auto_awesome' },
    { name: t('assistant'), path: '/agent', icon: 'smart_toy' },
    { name: t('subscription'), path: '/subscription', icon: 'card_membership' },
    { name: t('settings'), path: '/settings', icon: 'settings' },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-surface-container-lowest border-r border-outline-variant shadow-sm p-md space-y-sm">
      {/* Brand Header */}
      <div className="px-md py-lg flex items-center gap-sm">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-md text-headline-md font-bold">
          D
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold leading-none">{language === 'am' ? 'ድዌል እት' : 'dwell et'}</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant">{t('wellnessOverview')}</p>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 space-y-xs overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-sm px-md py-sm rounded-lg duration-200 transition-all hover:scale-[1.02]',
                isActive
                  ? 'text-primary dark:text-on-primary-container font-bold bg-primary-fixed dark:bg-primary-container animate-pulse-subtle'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              )}
              onClick={onClose}
            >
              <span
                className={cn('material-symbols-outlined text-[20px]', isActive ? 'icon-fill' : '')}
              >
                {item.icon}
              </span>
              <span className="font-label-md text-label-md">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Nav */}
      <div className="pt-sm border-t border-outline-variant space-y-xs">
        <a
          href="#help"
          className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-transform hover:scale-[1.02] duration-200"
        >
          <span className="material-symbols-outlined text-[20px]">help</span>
          <span className="font-label-md text-label-md">{t('help')}</span>
        </a>
        <a
          href="#logout"
          onClick={handleSignOut}
          className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-transform hover:scale-[1.02] duration-200"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="font-label-md text-label-md">{t('signout')}</span>
        </a>

        {/* User profile bottom item */}
        {user && (
          <Link
            to="/profile"
            className="flex items-center mt-sm px-sm py-xs border-t border-outline-variant/30 pt-md hover:bg-surface-container-high rounded-lg cursor-pointer transition-all duration-150"
          >
            <img
              alt={user.name}
              className="w-8 h-8 rounded-full border border-outline-variant object-cover shrink-0"
              src={user.avatarUrl}
            />
            <div className="ml-sm overflow-hidden">
              <p className="font-label-sm text-label-sm font-bold text-on-surface truncate">
                {user.name}
              </p>
              <p className="text-[10px] text-outline truncate">{t('profile')}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 z-20">
        {sidebarContent}
      </nav>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-on-surface/40 backdrop-blur-xs z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Drawer */}
      <nav
        className={cn(
          'fixed inset-y-0 left-0 w-64 z-40 transform transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </nav>
    </>
  );
};

export default Sidebar;
