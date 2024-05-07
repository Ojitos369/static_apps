import styles from '../styles/windowCard.module.scss';

const WindowCard = props => {

    return (
        <div className={styles.windowCardContainer}>
            <div className={`${styles.windowCardTitle}`}></div>
            <div className={`${styles.windowCardImage}`}></div>
            <div className={`${styles.windowCardContent}`}></div>
            <div className={`${styles.windowCardFooter}`}></div>
        </div>
    );
}

export { WindowCard };