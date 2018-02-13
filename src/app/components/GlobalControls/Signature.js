import styles from './section.scss'
import React  from 'react'

export default function Signature() {
  return (
    <section className={styles.section}>
      <div className={styles.section__item}>4/4</div>
      <div className={styles.section__item}>1 BAR</div>
    </section>
  )
}
Signature.propTypes = {}
