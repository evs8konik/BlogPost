import { ChangeEvent, FC } from 'react'
import styles from './NormalTextArea.module.css'

interface IProps {
  label: string
  value: string
  onChange: (value: string) => void
}

const NormalTextArea: FC<IProps> = ({ label, value, onChange }) => {
  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(e.target.value)
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>

      <textarea
        className={styles.textarea}
        placeholder={'Enter text'}
        required
        maxLength={400}
        value={value}
        onChange={handleChangeContent}
      />
    </div>
  )
}

export default NormalTextArea
