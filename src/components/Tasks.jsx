import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tasks({ tasks, onAdd, onUpdate, onToggle, onDelete }) {
  const { t } = useTranslation();
  const [text, setText] = useState('');

  function handleAddTask(e) {
    e.preventDefault();
    if (text.trim() === '') return;
    onAdd(text);
    setText('');
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-base-content mb-4">
        {t('tasks.title')}
      </h2>
      <form onSubmit={handleAddTask} className="flex gap-4 mb-4">
        <input
          type="text"
          className="input input-bordered flex-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('tasks.new')}
        />
        <button className="btn btn-primary">{t('tasks.add')}</button>
      </form>

      <DragDropContext>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              className="space-y-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <AnimatePresence>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <motion.li
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="card bg-base-200"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="card-body p-4 flex-row items-center">
                          <label className="cursor-pointer flex items-center flex-1">
                            <input
                              type="checkbox"
                              className="checkbox checkbox-primary mr-4"
                              checked={task.completed}
                              onChange={() => onToggle(task.id)}
                            />
                            <span
                              className={`flex-1 ${
                                task.completed
                                  ? 'line-through text-base-content/50'
                                  : ''
                              }`}
                            >
                              {task.text}
                            </span>
                          </label>
                          <div className="flex gap-2">
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => {
                                const newText = prompt(
                                  t('tasks.edit'),
                                  task.text,
                                );
                                if (newText) onUpdate(task.id, newText);
                              }}
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
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              className="btn btn-ghost btn-sm text-error"
                              onClick={() => onDelete(task.id)}
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    )}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}
