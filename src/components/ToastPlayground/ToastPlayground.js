import React from 'react';
import Button from '../Button';
import styles from './ToastPlayground.module.css';
import Toast from '../Toast';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [isOpen, setIsOpen] = React.useState(false);
  
  function handleSubmit(event) {
    event.preventDefault();
    setIsOpen(true);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {isOpen && (
        <Toast 
          variant={variant} 
          message={message} 
          setIsOpen={setIsOpen}
        />
      )}

      <div className={styles.controlsWrapper}>
        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: 'baseline' }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea 
                id="message" 
                value={message} 
                onChange={event => {
                  setMessage(event.target.value)
                }}
                className={styles.messageInput} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((option) => {
                return (
                  <label key={option} htmlFor={`variant-${option}`}>
                    <input 
                      id={`variant-${option}`}
                      type="radio"
                      name="variant"
                      value={option}
                      checked={variant === option}
                      onChange={event => {
                        setVariant(event.target.value);
                      }}
                    />
                    {option}
                  </label>
                )
              })}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ToastPlayground;
