import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import NoProjectSelected from './components/NoProjectSelected';
import NewProject from './components/NewProject';
import SelectedProject from './components/SelectedProject';
import ProjectModal from './components/ProjectModal';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { useTranslation } from 'react-i18next';
import SettingsButton from './components/SettingsButton';
import Settings from './components/Settings';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <MainContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}

function MainContent() {
  const { t } = useTranslation();
  const [projectsState, setProjectsState] = useState(() => {
    const saved = localStorage.getItem('projects');
    return saved
      ? JSON.parse(saved)
      : {
          selectedProjectId: undefined,
          projects: [],
          tasks: [],
        };
  });

  const [modal, setModal] = useState({
    isOpen: false,
    mode: null,
  });

  const [showSettings, setShowSettings] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projectsState));
  }, [projectsState]);

  const stats = {
    total: projectsState.projects.length,
    completed: projectsState.projects.filter(
      (p) => p.tasks?.length > 0 && p.tasks.every((t) => t.completed),
    ).length,
    active: projectsState.projects.filter((p) =>
      p.tasks?.some((t) => !t.completed),
    ).length,
  };

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId,
  );

  function handleStartAddProject() {
    setModal({ isOpen: true, mode: 'add' });
  }

  function handleStartEditProject() {
    setModal({ isOpen: true, mode: 'edit' });
  }

  function handleCloseModal() {
    setModal({ isOpen: false, mode: null });
  }

  function handleSelectProject(id) {
    setProjectsState((prev) => ({
      ...prev,
      selectedProjectId: id,
    }));
  }

  function handleAddProject(projectData) {
    const newProject = {
      ...projectData,
      id: Math.random().toString(),
      tasks: [],
    };

    setProjectsState((prev) => ({
      ...prev,
      selectedProjectId: newProject.id,
      projects: [...prev.projects, newProject],
    }));

    handleCloseModal();
  }

  function handleUpdateProject(projectData) {
    setProjectsState((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === selectedProject.id
          ? { ...project, ...projectData }
          : project,
      ),
    }));

    handleCloseModal();
  }

  function handleDeleteProject() {
    setProjectsState((prev) => ({
      ...prev,
      selectedProjectId: undefined,
      projects: prev.projects.filter(
        (project) => project.id !== selectedProject.id,
      ),
    }));
  }

  function handleAddTask(text) {
    const newTask = {
      id: Math.random().toString(),
      text,
      completed: false,
    };

    setProjectsState((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => {
        if (project.id === selectedProject.id) {
          return {
            ...project,
            tasks: [...project.tasks, newTask],
          };
        }
        return project;
      }),
    }));
  }

  function handleToggleTask(taskId) {
    setProjectsState((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => {
        if (project.id === selectedProject.id) {
          return {
            ...project,
            tasks: project.tasks.map((task) => {
              if (task.id === taskId) {
                return { ...task, completed: !task.completed };
              }
              return task;
            }),
          };
        }
        return project;
      }),
    }));
  }

  function handleDeleteTask(taskId) {
    setProjectsState((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => {
        if (project.id === selectedProject.id) {
          return {
            ...project,
            tasks: project.tasks.filter((task) => task.id !== taskId),
          };
        }
        return project;
      }),
    }));
  }

  function handleUpdateTask(taskId, newText) {
    setProjectsState((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => {
        if (project.id === selectedProject.id) {
          return {
            ...project,
            tasks: project.tasks.map((task) => {
              if (task.id === taskId) {
                return { ...task, text: newText };
              }
              return task;
            }),
          };
        }
        return project;
      }),
    }));
  }

  function handleDuplicateProject(projectId) {
    const projectToDuplicate = projectsState.projects.find(
      (p) => p.id === projectId,
    );
    if (!projectToDuplicate) return;

    const newProject = {
      ...projectToDuplicate,
      id: Math.random().toString(),
      title: `${projectToDuplicate.title} (Copy)`,
      tasks: projectToDuplicate.tasks.map((task) => ({
        ...task,
        id: Math.random().toString(),
        completed: false,
      })),
    };

    setProjectsState((prev) => ({
      ...prev,
      selectedProjectId: newProject.id,
      projects: [...prev.projects, newProject],
    }));
  }

  function handleSortProjects(criteria) {
    setProjectsState((prev) => ({
      ...prev,
      projects: [...prev.projects].sort((a, b) => {
        switch (criteria) {
          case 'date':
            return new Date(a.dueDate) - new Date(b.dueDate);
          case 'name':
            return a.title.localeCompare(b.title);
          case 'tasks':
            return (b.tasks?.length || 0) - (a.tasks?.length || 0);
          default:
            return 0;
        }
      }),
    }));
  }

  function handleArchiveProject(projectId) {
    setProjectsState((prevState) => {
      const project = prevState.projects.find((p) => p.id === projectId);

      if (!project) return prevState;

      const isArchived = project.archived;
      const message = isArchived
        ? t('projects.actions.unarchiveConfirm')
        : t('projects.actions.archiveConfirm');

      if (window.confirm(message)) {
        return {
          ...prevState,
          projects: prevState.projects.map((p) =>
            p.id === projectId ? { ...p, archived: !p.archived } : p,
          ),
        };
      }

      return prevState;
    });
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          onStartAddProject={handleStartAddProject}
          projects={projectsState.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectsState.selectedProjectId}
          onDuplicateProject={handleDuplicateProject}
          onSortProjects={handleSortProjects}
          onArchiveProject={handleArchiveProject}
          stats={stats}
          t={t}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto">
          <button
            className="lg:hidden fixed top-4 left-4 z-30 btn btn-circle btn-ghost bg-base-200"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg
              className="w-6 h-6"
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

          <div className="p-4 border-b border-base-200 sticky top-0 bg-base-100 z-20">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold text-base-content">
                {showSettings ? t('settings.title') : t('app.title')}
              </h1>
              <SettingsButton onClick={() => setShowSettings(!showSettings)} />
            </div>
          </div>

          <div className="p-4">
            {showSettings ? (
              <Settings />
            ) : (
              <>
                {!projectsState.selectedProjectId && !modal.isOpen && (
                  <NoProjectSelected
                    onStartAddProject={handleStartAddProject}
                  />
                )}
                {modal.isOpen && (
                  <ProjectModal
                    mode={modal.mode}
                    onClose={handleCloseModal}
                    onSubmit={
                      modal.mode === 'add'
                        ? handleAddProject
                        : handleUpdateProject
                    }
                    defaultValues={
                      modal.mode === 'edit' ? selectedProject : undefined
                    }
                  />
                )}
                {projectsState.selectedProjectId && (
                  <SelectedProject
                    project={selectedProject}
                    onDelete={handleDeleteProject}
                    onEdit={handleStartEditProject}
                    onAddTask={handleAddTask}
                    onUpdateTask={handleUpdateTask}
                    onToggleTask={handleToggleTask}
                    onDeleteTask={handleDeleteTask}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
