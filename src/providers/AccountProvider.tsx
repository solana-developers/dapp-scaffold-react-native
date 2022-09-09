import {Keypair, PublicKey} from '@solana/web3.js';
import React, {ReactNode, useEffect, useMemo, useState} from 'react';

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
  accounts: Account[];
  createAccount: () => void;
  selectedAccount?: Account;
  selectAccount: (network: Account) => void;
}

const AccountsContext = React.createContext<AccountProviderContext>({
  accounts: [],
  createAccount() {},
  selectAccount(_account: Account) {},
  selectedAccount: undefined,
});

function AccountProvider(props: {children: ReactNode}) {
  const {children} = props;
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0]);

  function createAccount() {
    const {publicKey, secretKey} = Keypair.generate();
    const name = elipsify(publicKey.toBase58());

    setAccounts(currentAccounts => [
      ...currentAccounts,
      {
        id: publicKey.toBase58(),
        name,
        publicKey: publicKey,
        secretKey: secretKey,
      },
    ]);
  }

  function selectAccount(account: Account) {
    console.log(`Select Account: ${account?.name}`);
    setSelectedAccount(account);
  }

  useEffect(() => {
    if (accounts.length > 0 && !selectedAccount) {
      selectAccount(accounts[0]);
    }
  }, [accounts, selectedAccount]);

  const value = useMemo(
    () => ({
      accounts,
      createAccount,
      selectedAccount,
      selectAccount,
    }),
    [accounts, selectedAccount],
  );

  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  );
}

const useAccounts = () => React.useContext(AccountsContext);

export {AccountProvider, useAccounts};
