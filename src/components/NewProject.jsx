import { useRef } from 'react';
import Input from './Input';
import Modal from './Modal';
import { useTranslation } from 'react-i18next';

export default function NewProject({ onAdd }) {
  const { t } = useTranslation();
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === '' ||
      enteredDescription.trim() === '' ||
      enteredDueDate.trim() === ''
    ) {
      modal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption={t('common.okay')}>
        <h2 className="text-xl font-bold text-error mb-4">
          {t('validation.invalid')}
        </h2>
        <p className="text-base-content/70">{t('validation.message')}</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="btn btn-ghost" onClick={onCancel}>
              {t('common.cancel')}
            </button>
          </li>
          <li>
            <button className="btn btn-primary" onClick={handleSave}>
              {t('common.save')}
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label={t('project.title')} />
          <Input ref={description} label={t('project.description')} textarea />
          <Input type="date" ref={dueDate} label={t('project.dueDate')} />
        </div>
      </div>
    </>
  );
}
