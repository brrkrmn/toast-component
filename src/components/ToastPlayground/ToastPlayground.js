import React from 'react';
import Button from '../Button';
import styles from './ToastPlayground.module.css';
import ToastShelf from '../ToastShelf'
import { ToastContext } from '../ToastProvider';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const { createToast } = React.useContext(ToastContext);
  
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

  function handlePopToast(event) {
    event.preventDefault();
    createToast(message, variant);
    setVariant(VARIANT_OPTIONS[0]);
    setMessage('');
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf/>

      <div className={styles.controlsWrapper}>
        <form onSubmit={handlePopToast}>
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
