import {Keypair, PublicKey} from '@solana/web3.js';
import React, {ReactNode, useEffect, useState} from 'react';

export function elipsify(str = '', len = 4) {
  if (str.length > 30) {
    return (
      str.substring(0, len) +
      '...' +
      str.substring(str.length - len, str.length)
    );
  }
  return str;
}

export interface Account {
  id: string;
  name: string;
  publicKey: PublicKey;
  secretKey: Uint8Array;
}

export interface AccountProviderContext {
  account?: Account | null;
  accounts?: Account[];
  createAccount: () => void;
  selectedAccount?: Account;
  selectAccount: (network: Account) => void;
}

const AccountsContext = React.createContext<AccountProviderContext>({
  createAccount() {},
  selectAccount(n: Account) {},
});

function AccountProvider(props: {children: ReactNode}) {
  const {children} = props;
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0]);

  const [account, setAccount] = useState<Account | null>();

  const createAccount = () => {
    const {publicKey, secretKey} = Keypair.generate();
    const name = elipsify(publicKey.toBase58());

    setAccounts([
      ...accounts,
      {
        id: publicKey.toBase58(),
        name,
        publicKey: publicKey,
        secretKey: secretKey,
      },
    ]);
  };
  const selectAccount = (network: Account) => {
    console.log(`Select Account: ${network?.name}`);
    setSelectedAccount(network);
    // setAccount(() => new Account(clusterApiUrl(network.endpoint)));
  };

  useEffect(() => {
    if (!account && selectedAccount) {
      selectAccount(selectedAccount);
      return;
    }
  }, [account, selectAccount]);

  const value = {
    account,
    accounts,
    createAccount,
    selectedAccount,
    selectAccount,
  };
  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  );
}

const useAccounts = () => React.useContext(AccountsContext);

export {AccountProvider, useAccounts};
