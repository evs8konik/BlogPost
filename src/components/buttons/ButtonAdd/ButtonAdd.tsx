import { FC } from 'react'
import styles from './ButtonAdd.module.css'

const ButtonAdd: FC = () => {
  return (
    <div>
      <button
        className={styles.button}
        type={'submit'}
      >
        Add comment
      </button>
    </div>
  )
}

export default ButtonAdd
