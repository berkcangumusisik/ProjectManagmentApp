import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      projects: {
        title: 'Your Projects',
        new: 'New Project',
        noProject: 'No Project Selected',
        start: 'Create Your First Project',
        search: 'Search projects...',
        sort: {
          date: 'Sort by Due Date',
          name: 'Sort by Name',
          tasks: 'Sort by Tasks',
        },
        stats: {
          active: 'Active',
          completed: 'Completed',
          total: 'Total',
        },
      },
      tasks: {
        title: 'Tasks',
        new: 'Add a new task...',
        add: 'Add Task',
        filter: {
          all: 'All',
          active: 'Active',
          completed: 'Completed',
        },
        status: {
          overdue: 'Overdue',
          dueSoon: 'Due Soon',
        },
      },
      common: {
        save: 'Save Changes',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
      },
    },
  },
  tr: {
    translation: {
      projects: {
        title: 'Projeleriniz',
        new: 'Yeni Proje',
        noProject: 'Proje Seçilmedi',
        start: 'İlk Projenizi Oluşturun',
        search: 'Projelerde ara...',
        sort: {
          date: 'Tarihe Göre Sırala',
          name: 'İsme Göre Sırala',
          tasks: 'Görevlere Göre Sırala',
        },
        stats: {
          active: 'Aktif',
          completed: 'Tamamlanan',
          total: 'Toplam',
        },
      },
      tasks: {
        title: 'Görevler',
        new: 'Yeni görev ekle...',
        add: 'Görev Ekle',
        filter: {
          all: 'Tümü',
          active: 'Aktif',
          completed: 'Tamamlanan',
        },
        status: {
          overdue: 'Gecikmiş',
          dueSoon: 'Yaklaşıyor',
        },
      },
      common: {
        save: 'Değişiklikleri Kaydet',
        cancel: 'İptal',
        delete: 'Sil',
        edit: 'Düzenle',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
