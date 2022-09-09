import React from 'react';
import {Button} from 'react-native';
import {useAccounts} from '../providers';
import {Section} from './Section';

export const AccountSelect = () => {
  const {accounts, selectedAccount, selectAccount, createAccount} =
    useAccounts();

  return (
    <Section title={`Account: ${selectedAccount?.name || 'None'}`}>
      {accounts.map(item => (
        <Button
          disabled={item === selectedAccount}
          key={item.id}
          title={item.name}
          onPress={() => selectAccount(item)}
        />
      ))}
      <Button title="Create Account" onPress={createAccount} />
    </Section>
  );
};
