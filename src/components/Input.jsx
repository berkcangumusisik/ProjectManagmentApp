import { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
  const classes = `input input-bordered w-full ${
    textarea ? 'h-40 resize-none' : ''
  }`;

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {textarea ? (
        <textarea ref={ref} {...props} className={classes} />
      ) : (
        <input ref={ref} {...props} className={classes} />
      )}
    </div>
  );
});

export default Input;
