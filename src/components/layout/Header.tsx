import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../store/ThemeContext';
import { useLanguage } from '../../store/LanguageContext';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm w-full h-16 sticky top-0 z-10 flex justify-between items-center px-margin-mobile md:px-margin-desktop transition-all duration-200">
      {/* Left Menu (Mobile Only) */}
      <div className="flex items-center space-x-md md:hidden">
        <button onClick={onMenuClick} className="text-primary hover:text-surface-tint focus:outline-none">
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>
        <span className="font-headline-md text-headline-md text-primary font-bold">{language === 'am' ? 'ድዌል እት' : 'dwell et'}</span>
      </div>

      {/* Search Bar (Desktop Only) */}
      <div className="hidden md:flex items-center flex-1 max-w-md relative">
        <span className="material-symbols-outlined absolute left-3 text-outline">search</span>
        <input
          className="w-full pl-10 pr-4 py-2 bg-surface-container rounded-lg border border-transparent focus:bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/10 font-body-sm text-body-sm text-on-surface placeholder-outline transition-all outline-none"
          placeholder={t('searchPlaceholder')}
          type="text"
        />
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center space-x-4 ml-auto md:ml-0">
        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
          className="px-3 py-1 flex items-center gap-xs text-[11px] font-bold border border-outline-variant hover:bg-surface-container-high text-on-surface rounded-full transition-colors focus:outline-none"
          title="Switch Language / ቋንቋ ቀይር"
        >
          <span className="material-symbols-outlined text-[14px]">language</span>
          <span>{language === 'en' ? 'English' : 'አማርኛ'}</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors focus:outline-none"
          title="Toggle Theme"
        >
          <span className="material-symbols-outlined text-[20px]">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors relative focus:outline-none"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full animate-ping"></span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
          </button>

          {/* Simple Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg p-sm z-30 font-body-sm text-body-sm text-on-surface">
              <h5 className="font-bold border-b border-outline-variant pb-xs mb-xs px-xs">{t('notificationsTitle')}</h5>
              <ul className="space-y-sm">
                <li className="p-xs hover:bg-surface rounded-md cursor-pointer">
                  <p className="font-medium">{t('notif1Title')}</p>
                  <p className="text-xs text-on-surface-variant">{t('notif1Desc')}</p>
                </li>
                <li className="p-xs hover:bg-surface rounded-md cursor-pointer">
                  <p className="font-medium">{t('notif2Title')}</p>
                  <p className="text-xs text-on-surface-variant">{t('notif2Desc')}</p>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* User Profile avatar */}
        {user && (
          <Link
            to="/profile"
            className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant cursor-pointer hover:ring-2 hover:ring-primary transition-all shrink-0"
          >
            <img
              alt={user.name}
              className="w-full h-full object-cover"
              src={user.avatarUrl}
            />
          </Link>
        )}
      </div>
    </header>
  );
};
export default Header;
