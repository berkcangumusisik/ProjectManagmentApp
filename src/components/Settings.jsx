import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Settings() {
  const { currentTheme, setCurrentTheme, availableThemes } = useTheme();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const { t } = useTranslation();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-3xl mx-auto mt-16"
    >
      <motion.h1
        variants={item}
        className="text-3xl font-bold text-base-content mb-8"
      >
        {t('settings.title')}
      </motion.h1>

      <motion.div variants={container} className="grid gap-8">
        {/* Tema Ayarları */}
        <motion.div variants={item} className="card bg-base-200 card-hover">
          <div className="card-body">
            <h2 className="card-title">{t('settings.theme')}</h2>
            <p className="text-base-content/70 mb-4">
              {t('settings.themeDescription')}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {availableThemes.map((theme) => (
                <button
                  key={theme.name}
                  className={`btn hover-lift ${
                    currentTheme === theme.name ? 'btn-primary' : 'btn-ghost'
                  }`}
                  onClick={() => setCurrentTheme(theme.name)}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Dil Ayarları */}
        <motion.div variants={item} className="card bg-base-200 card-hover">
          <div className="card-body">
            <h2 className="card-title">{t('settings.language')}</h2>
            <p className="text-base-content/70 mb-4">
              {t('settings.languageDescription')}
            </p>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`btn btn-lg hover-lift ${
                    currentLanguage === lang.code ? 'btn-primary' : 'btn-ghost'
                  }`}
                  onClick={() => changeLanguage(lang.code)}
                >
                  <span className="text-2xl mr-2">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Diğer Ayarlar */}
        <motion.div variants={item} className="card bg-base-200 card-hover">
          <div className="card-body">
            <h2 className="card-title">{t('settings.preferences')}</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-base-300 rounded-lg cursor-pointer hover:bg-base-300/80 transition-colors">
                <span className="text-base-content">
                  {t('settings.notifications')}
                </span>
                <input type="checkbox" className="toggle toggle-primary" />
              </label>
              <label className="flex items-center justify-between p-4 bg-base-300 rounded-lg cursor-pointer hover:bg-base-300/80 transition-colors">
                <span className="text-base-content">
                  {t('settings.sounds')}
                </span>
                <input type="checkbox" className="toggle toggle-primary" />
              </label>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
