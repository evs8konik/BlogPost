import { FC } from 'react'
import styles from './ButtonClose.module.css'

interface IProps {
  value: string
  onClick: () => void
}

const ButtonClose: FC<IProps> = ({ value, onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
    >
      {value}
    </button>
  )
}
export default ButtonClose
