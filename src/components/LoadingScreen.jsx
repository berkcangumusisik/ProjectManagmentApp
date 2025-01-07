import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-base-content/70"
        >
          {t('app.loading')}
        </motion.p>
      </motion.div>
    </div>
  );
}
