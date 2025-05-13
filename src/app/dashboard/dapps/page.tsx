import styles from './DappDashboard.module.css';

const dapps = [
    {
      name: 'Aggswap',
      description: 'Decentralized exchange for swapping tokens.',
      url: '/dashboard/dapps/aggswap',
    },
    {
      name: 'Stargate',
      description: 'Omnichain bridge for cross-chain liquidity.',
      url: '/dashboard/dapps/stargate',
    },
    {
      name: 'Aave',
      description: 'Decentralized lending protocol.',
      url: '/dashboard/dapps/aave',
    },
  ]
  
  export default function DappDashboardPage() {
    return (
      <div className={styles.dashboard}>
        <h2 className={styles.heading}>dApps</h2>
        <div className={styles.grid}>
          {dapps.map((dapp, i) => (
            <a
              key={dapp.name}
              href={dapp.url}
              className={styles.card}
              style={{ animationDelay: `${i * 0.08 + 0.1}s` }}
            >
              <h3 className={styles.cardTitle}>{dapp.name}</h3>
              <p className={styles.cardDesc}>{dapp.description}</p>
              <button className={styles.openBtn}>Open {dapp.name}</button>
            </a>
          ))}
        </div>
      </div>
    )
  }
  