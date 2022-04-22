import React from 'react';
import {Button} from 'react-native';
import {useConnections} from '../providers';
import {Section} from './Section';

export const NetworkSelect = () => {
  const {
    networkError,
    networkVersion,
    networks,
    selectedNetwork,
    selectNetwork,
  } = useConnections();

  return (
    <>
      <Section
        description={`Version: ${
          networkVersion?.['solana-core'] || 'Connecting...'
        }`}
        title={`Network: ${selectedNetwork?.name}`}>
        {networks.map(item => (
          <Button
            disabled={item === selectedNetwork}
            key={item.id}
            title={item.name}
            onPress={() => selectNetwork(item)}
          />
        ))}
        {networkError ? (
          <Section title="Error">
            {JSON.stringify(networkError, null, 2)}
          </Section>
        ) : null}
      </Section>
    </>
  );
};
