import { FC } from 'react'
import styles from './ButtonSave.module.css'

interface IProps {
  value: string
  onClick: () => void
}

const ButtonSave: FC<IProps> = ({ value, onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
    >
      {value}
    </button>
  )
}
export default ButtonSave
