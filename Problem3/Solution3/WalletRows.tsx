interface RowWalletProps {
  sortedBalances: Array<FormattedWalletBalance>
  prices: any
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

const WalletRows: React.FC<RowWalletProps> = ({sortedBalances, prices}) => {
  return (
    sortedBalances.map((balance: FormattedWalletBalance, index: number) => 
      (
        <WalletRow 
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={prices[balance.currency] * balance.amount}
          formattedAmount={balance.formatted}
        />
      )
    )
  )
}

export default WalletRows;
