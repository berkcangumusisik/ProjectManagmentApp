import { Menu } from '@headlessui/react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function SettingsButton() {
  const { currentTheme, setCurrentTheme, availableThemes } = useTheme();
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'tr', name: 'Türkçe' },
  ];

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="btn btn-circle btn-ghost">
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </Menu.Button>

      <Menu.Items className="menu bg-base-200 w-56 rounded-box shadow-lg mt-2 p-2 absolute right-0 z-50">
        <div className="menu-title">Theme</div>
        <div className="grid grid-cols-2 gap-1">
          {availableThemes.map((theme) => (
            <Menu.Item key={theme.name}>
              {({ active }) => (
                <button
                  className={`btn btn-sm ${
                    currentTheme === theme.name ? 'btn-primary' : 'btn-ghost'
                  }`}
                  onClick={() => setCurrentTheme(theme.name)}
                >
                  {theme.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>

        <div className="divider my-2"></div>

        <div className="menu-title">Language</div>
        {languages.map((lang) => (
          <Menu.Item key={lang.code}>
            {({ active }) => (
              <button
                className={`btn btn-sm ${
                  i18n.language === lang.code ? 'btn-primary' : 'btn-ghost'
                }`}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  localStorage.setItem('language', lang.code);
                }}
              >
                {lang.name}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
