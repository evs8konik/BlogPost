import { FC, PropsWithChildren } from 'react'
import styles from './ButtonRemove.module.css'

interface IProps {
  onClick: () => void
}

const ButtonRemove: FC<PropsWithChildren<IProps>> = ({ onClick, children }) => {
  return (
    <div>
      <button
        className={styles.button}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}

export default ButtonRemove
