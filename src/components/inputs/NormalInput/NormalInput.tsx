import { ChangeEvent, FC } from 'react'
import styles from './NormalInput.module.css'

interface IProps {
  label: string
  value: string
  onChange: (value: string) => void
}

const NormalInput: FC<IProps> = ({ label, value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value)
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>

      <input
        className={styles.input}
        placeholder={'Enter text'}
        required
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default NormalInput
