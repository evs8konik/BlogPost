import { FC } from 'react'
import styles from './ButtonEdit.module.css'

interface IProps {
  value: string
  onClick: () => void
}

const ButtonEdit: FC<IProps> = ({ value, onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
    >
      {value}
    </button>
  )
}
export default ButtonEdit
