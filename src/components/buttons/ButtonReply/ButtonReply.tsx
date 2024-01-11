import { FC } from 'react'
import styles from './ButtonReply.module.css'

interface IProps {
  value: string
  onClick: () => void
}

const ButtonReply: FC<IProps> = ({ value, onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
    >
      {value}
    </button>
  )
}
export default ButtonReply
