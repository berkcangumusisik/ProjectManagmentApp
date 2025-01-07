import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Input from './Input';

export default function ProjectModal({
  mode,
  onClose,
  onSubmit,
  defaultValues,
}) {
  const { t } = useTranslation();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const dialog = useRef();

  useEffect(() => {
    if (defaultValues) {
      title.current.value = defaultValues.title;
      description.current.value = defaultValues.description;
      dueDate.current.value = defaultValues.dueDate;
    }
  }, [defaultValues]);

  function handleSubmit(e) {
    e.preventDefault();
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === '' ||
      enteredDescription.trim() === '' ||
      enteredDueDate.trim() === ''
    ) {
      dialog.current.showModal();
      return;
    }

    onSubmit({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <dialog ref={dialog} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-error">
            {t('validation.invalid')}
          </h3>
          <p className="py-4 text-base-content/70">{t('validation.message')}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">{t('common.okay')}</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="card w-96 bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">
              {mode === 'edit' ? t('project.edit') : t('project.new')}
            </h2>
            <button
              type="button"
              className="btn btn-square btn-ghost btn-sm"
              onClick={onClose}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <Input type="text" ref={title} label={t('project.title')} />
          <Input ref={description} label={t('project.description')} textarea />
          <Input type="date" ref={dueDate} label={t('project.dueDate')} />

          <div className="card-actions justify-end mt-4">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              {t('common.cancel')}
            </button>
            <button type="submit" className="btn btn-primary">
              {mode === 'edit' ? t('common.save') : t('common.create')}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
