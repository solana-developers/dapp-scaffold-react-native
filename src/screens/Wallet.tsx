import {LAMPORTS_PER_SOL} from '@solana/web3.js';
import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {AccountSelect, Balance, NetworkSelect, Section} from '../components';
import {useAccounts, useConnections} from '../providers';

export const Wallet = () => {
  const {selectedAccount} = useAccounts();
  const {connection, selectedNetwork} = useConnections();

  const [balance, setBalance] = useState<any>();

  const getBalance = () => {
    if (!connection || !selectedAccount) return;
    console.log(`Get balance for ${selectedAccount.publicKey.toBase58()}`);
    setBalance(null);
    connection
      .getBalance(selectedAccount.publicKey)
      .then(res => setBalance(String(res / LAMPORTS_PER_SOL)))
      .catch(err => console.log(err));
  };

  const getAirdrop = () => {
    if (!connection || !selectedAccount) return;
    connection
      .requestAirdrop(selectedAccount.publicKey, 2 * LAMPORTS_PER_SOL)
      .then(res => {
        console.log('res', res);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (balance || !connection) return;
    getBalance();
  }, [balance, getBalance, connection]);

  return (
    <View>
      <NetworkSelect />
      <AccountSelect />
      {selectedAccount ? (
        <View>
          <Section title="Balance">
            {balance ? (
              <Balance balance={balance} symbol="SOL" decimals={10} />
            ) : (
              <Text>Fetching balance.</Text>
            )}
          </Section>
          <Section title="Actions">
            <Button title="Refresh Balance" onPress={getBalance} />
            <Button
              disabled={selectedNetwork?.endpoint === 'mainnet-beta'}
              title="Airdrop"
              onPress={getAirdrop}
            />
          </Section>
        </View>
      ) : (
        <Section title="Select or Create Account" />
      )}
    </View>
  );
};
