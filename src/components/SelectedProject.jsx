import { useState } from 'react';
import Tasks from './Tasks';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { formatDate } from '../utils/date';
import { useLanguage } from '../context/LanguageContext';

export default function SelectedProject({
  project,
  onDelete,
  onEdit,
  onAddTask,
  onUpdateTask,
  onToggleTask,
  onDeleteTask,
}) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const formattedDate = formatDate(project.dueDate, currentLanguage);
  const progress = project.tasks?.length
    ? (project.tasks.filter((t) => t.completed).length / project.tasks.length) *
      100
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-4"
    >
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <div className="flex gap-2">
                <button onClick={onEdit} className="btn btn-ghost btn-sm">
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setShowConfirmDelete(true)}
                  className="btn btn-ghost btn-sm text-error"
                >
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-base-content/70 mt-2 text-lg">
              {project.description}
            </p>
          </div>

          <div className="card bg-base-200 shadow-lg p-6 min-w-[250px]">
            <div className="text-sm text-base-content/70 mb-1">
              {t('project.due')}
            </div>
            <div className="text-xl font-semibold mb-4">{formattedDate}</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-base-content/70">
                  {t('project.progress')}
                </span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <progress
                className="progress progress-primary w-full"
                value={progress}
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="card bg-base-200">
          <div className="card-body">
            <Tasks
              tasks={project.tasks}
              onAdd={onAddTask}
              onUpdate={onUpdateTask}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          </div>
        </div>
      </header>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowConfirmDelete(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-base-100 p-8 rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            <h2 className="text-2xl font-bold mb-4 text-error">
              {t('project.deleteConfirm')}
            </h2>
            <p className="text-base-content/70 mb-8">
              {t('project.deleteMessage')}
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="btn btn-ghost"
                onClick={() => setShowConfirmDelete(false)}
              >
                {t('common.cancel')}
              </button>
              <button
                className="btn btn-error"
                onClick={() => {
                  onDelete();
                  setShowConfirmDelete(false);
                }}
              >
                {t('common.delete')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
