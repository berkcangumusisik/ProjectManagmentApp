import { useState, useMemo } from 'react';
import { Menu } from '@headlessui/react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { formatRelativeDate } from '../utils/date';
import { useLanguage } from '../context/LanguageContext';

export default function Sidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
  onDuplicateProject,
  onSortProjects,
  onArchiveProject,
  stats,
  t,
  isOpen,
  onClose,
}) {
  const { theme } = useTheme();
  const { currentLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('active');
  const [groupBy, setGroupBy] = useState('none');
  const [view, setView] = useState('grid'); // 'grid' veya 'list'

  // Filtreleme ve arama mantığı
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const isOverdue = new Date(project.dueDate) < new Date();
      const isCompleted =
        project.tasks?.length > 0 && project.tasks.every((t) => t.completed);
      const isActive = project.tasks?.some((t) => !t.completed);
      const isArchived = project.archived;

      switch (filterStatus) {
        case 'active':
          return matchesSearch && isActive && !isArchived;
        case 'completed':
          return matchesSearch && isCompleted && !isArchived;
        case 'overdue':
          return matchesSearch && isOverdue && !isCompleted && !isArchived;
        case 'archived':
          return matchesSearch && isArchived;
        default:
          return matchesSearch && !isArchived;
      }
    });
  }, [projects, searchTerm, filterStatus]);

  // Projeleri gruplandırma fonksiyonu
  const groupedProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      // ... mevcut filtreleme mantığı ...
    });

    if (groupBy === 'none') return { Projeler: filtered };

    return filtered.reduce((groups, project) => {
      let key;
      switch (groupBy) {
        case 'status':
          key = project.tasks?.every((t) => t.completed)
            ? t('projects.status.completed')
            : project.tasks?.some((t) => !t.completed)
            ? t('projects.status.inProgress')
            : t('projects.status.notStarted');
          break;
        case 'dueDate':
          const today = new Date();
          const dueDate = new Date(project.dueDate);
          if (dueDate < today) key = t('projects.dueDate.overdue');
          else if (dueDate.toDateString() === today.toDateString())
            key = t('projects.dueDate.today');
          else if (
            dueDate.getTime() - today.getTime() <
            7 * 24 * 60 * 60 * 1000
          )
            key = t('projects.dueDate.thisWeek');
          else key = t('projects.dueDate.later');
          break;
        case 'priority':
          key = project.priority || t('projects.priority.none');
          break;
        default:
          key = 'Projeler';
      }

      if (!groups[key]) groups[key] = [];
      groups[key].push(project);
      return groups;
    }, {});
  }, [projects, searchTerm, filterStatus, groupBy, currentLanguage]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 w-[280px] md:w-80 
        bg-base-300 text-base-content px-4 md:px-6 py-6 md:py-8 
        flex flex-col h-screen z-50 transition-transform duration-300 ease-in-out
        border-r border-base-200`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{t('projects.title')}</h2>
          <div className="flex items-center gap-2">
            {/* Görünüm Değiştirme */}
            <div className="btn-group">
              <button
                className={`btn btn-sm ${view === 'grid' ? 'btn-active' : ''}`}
                onClick={() => setView('grid')}
                title={t('common.gridView')}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                className={`btn btn-sm ${view === 'list' ? 'btn-active' : ''}`}
                onClick={() => setView('list')}
                title={t('common.listView')}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Diğer Kontroller */}
            <Menu as="div" className="relative">
              <Menu.Button className="btn btn-ghost btn-sm btn-circle">
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
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </Menu.Button>
              <Menu.Items className="menu bg-base-200 w-48 rounded-box shadow-lg p-2 absolute right-0 z-50">
                <Menu.Item>
                  <button onClick={() => onSortProjects('date')}>
                    {t('projects.sort.date')}
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button onClick={() => onSortProjects('name')}>
                    {t('projects.sort.name')}
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button onClick={() => onSortProjects('tasks')}>
                    {t('projects.sort.tasks')}
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button onClick={() => onSortProjects('progress')}>
                    {t('projects.sort.progress')}
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="stat bg-base-200 p-2 rounded-box">
            <div className="stat-title text-xs">
              {t('projects.stats.active')}
            </div>
            <div className="stat-value text-lg">{stats.active}</div>
          </div>
          <div className="stat bg-base-200 p-2 rounded-box">
            <div className="stat-title text-xs">
              {t('projects.stats.completed')}
            </div>
            <div className="stat-value text-lg">{stats.completed}</div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="space-y-3 mb-4">
          <div className="join w-full">
            <div className="form-control flex-1">
              <input
                type="text"
                placeholder={t('projects.search')}
                className="input input-bordered join-item w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn join-item" onClick={() => setSearchTerm('')}>
              {searchTerm ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Gruplandırma Seçenekleri */}
          <div className="dropdown w-full">
            <label
              tabIndex={0}
              className="btn btn-block btn-sm justify-between"
            >
              <span>{t('projects.groupBy.title')}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full"
            >
              <li>
                <button onClick={() => setGroupBy('none')}>
                  {t('projects.groupBy.none')}
                </button>
              </li>
              <li>
                <button onClick={() => setGroupBy('status')}>
                  {t('projects.groupBy.status')}
                </button>
              </li>
              <li>
                <button onClick={() => setGroupBy('dueDate')}>
                  {t('projects.groupBy.dueDate')}
                </button>
              </li>
              <li>
                <button onClick={() => setGroupBy('priority')}>
                  {t('projects.groupBy.priority')}
                </button>
              </li>
            </ul>
          </div>

          {/* Filter Tabs - Scrollable on mobile */}
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="tabs tabs-boxed justify-start md:justify-center bg-base-200 p-1 min-w-max">
              <button
                className={`tab ${filterStatus === 'all' ? 'tab-active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                {t('projects.filter.all')}
              </button>
              <button
                className={`tab ${
                  filterStatus === 'active' ? 'tab-active' : ''
                }`}
                onClick={() => setFilterStatus('active')}
              >
                {t('projects.filter.active')}
              </button>
              <button
                className={`tab ${
                  filterStatus === 'completed' ? 'tab-active' : ''
                }`}
                onClick={() => setFilterStatus('completed')}
              >
                {t('projects.filter.completed')}
              </button>
              <button
                className={`tab ${
                  filterStatus === 'overdue' ? 'tab-active' : ''
                }`}
                onClick={() => setFilterStatus('overdue')}
              >
                {t('projects.filter.overdue')}
              </button>
              <button
                className={`tab ${
                  filterStatus === 'archived' ? 'tab-active' : ''
                }`}
                onClick={() => setFilterStatus('archived')}
              >
                {t('projects.filter.archived')}
              </button>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar -mx-4 px-4">
          <AnimatePresence>
            {Object.entries(groupedProjects).map(([group, projects]) => (
              <motion.div
                key={group}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-2 mb-2 mt-4">
                  <h3 className="text-sm font-medium text-base-content/70">
                    {group}
                  </h3>
                  <div className="h-px flex-1 bg-base-content/10"></div>
                  <span className="text-xs text-base-content/50">
                    {projects.length}
                  </span>
                </div>

                <div
                  className={
                    view === 'grid' ? 'grid grid-cols-2 gap-2' : 'space-y-2'
                  }
                >
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isActive={project.id === selectedProjectId}
                      view={view}
                      onSelect={onSelectProject}
                      onArchive={onArchiveProject}
                      onDuplicate={onDuplicateProject}
                      onClose={onClose}
                      t={t}
                      currentLanguage={currentLanguage}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add Project Button */}
        <button
          onClick={onStartAddProject}
          className="btn btn-primary w-full mt-4 gap-2"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          {t('projects.new')}
        </button>
      </aside>
    </>
  );
}

// ProjectCard bileşeni ayrı bir dosyaya taşınabilir
function ProjectCard({
  project,
  isActive,
  view,
  onSelect,
  onArchive,
  onDuplicate,
  onClose,
  t,
  currentLanguage,
}) {
  const dueDate = new Date(project.dueDate);
  const isOverdue = dueDate < new Date();
  const progress = project.tasks?.length
    ? (project.tasks.filter((t) => t.completed).length / project.tasks.length) *
      100
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div
        className={`card bg-base-100 shadow-sm hover:shadow-md transition-all cursor-pointer
          ${isActive ? 'ring-2 ring-primary' : ''} 
          ${project.archived ? 'opacity-75' : ''}
          ${view === 'list' ? 'flex-row items-center' : ''}`}
        onClick={() => {
          onSelect(project.id);
          if (onClose) onClose();
        }}
      >
        <div className="card-body p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-lg truncate">{project.title}</h3>
              <p className="text-sm text-base-content/70 mb-2">
                {formatRelativeDate(dueDate, currentLanguage)}
              </p>
              <div className="flex items-center gap-2">
                <progress
                  className="progress progress-primary flex-1"
                  value={progress}
                  max="100"
                />
                <span className="text-xs font-medium">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div
                className={`badge ${
                  project.archived
                    ? 'badge-ghost'
                    : isOverdue
                    ? 'badge-error'
                    : 'badge-success'
                }`}
              >
                {project.tasks?.length || 0} tasks
              </div>
              <div className="flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onArchive(project.id);
                  }}
                  className="btn btn-ghost btn-xs"
                  title={
                    project.archived
                      ? t('projects.actions.unarchive')
                      : t('projects.actions.archive')
                  }
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {project.archived ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8"
                      />
                    )}
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate(project.id);
                  }}
                  className="btn btn-ghost btn-xs"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
