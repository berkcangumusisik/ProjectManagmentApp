import { useTranslation } from 'react-i18next';

export default function NoProjectSelected({ onStartAddProject }) {
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
      <div className="w-48 h-48 mb-8 bg-base-200 rounded-full flex items-center justify-center animate-float">
        <svg
          className="w-24 h-24 text-primary opacity-80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-base-content mb-4">
        {t('projects.noProject')}
      </h2>
      <p className="text-base-content/70 mb-8 max-w-md">
        {t('projects.start')}
      </p>
      <button
        onClick={onStartAddProject}
        className="btn btn-primary gap-2 group"
      >
        <svg
          className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        {t('projects.new')}
      </button>
    </div>
  );
}
