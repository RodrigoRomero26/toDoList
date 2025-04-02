
import { SprintList } from '../SprintList/SprintList'
import styles from './Aside.module.css'
export const Aside = () => {
  return (
    <div className={styles.aside}>
        <div className={styles.asideButton}>
            <button>Backlog</button>
        </div>
        <div className={styles.asideSprints}>
            <SprintList />
        </div>
    </div>
  )
}
