import { clusterApiUrl, Connection, Keypair } from '@solana/web3.js';
import React, { useEffect, useState } from 'react'
import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import { Section } from './Section'

const App = () => {
  const conn = new Connection(clusterApiUrl('devnet'));
  const [res, setRes] = useState<any>('');
  const [keypair, setKeypair] = useState<Keypair>(() => Keypair.generate());

  const randomKeypair = () => {
    setKeypair(() => Keypair.generate());
  };

  useEffect(() => {
    if (res) {
      return;
    }
    conn.getVersion().then(r => setRes(r));
  }, [res, setRes]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          {res ? (
            <Section title="Version">{JSON.stringify(res, null, 2)}</Section>
          ) : null}
          {keypair ? (
            <Section title="Keypair">{JSON.stringify(keypair?.publicKey?.toBase58(), null, 2)}</Section>
          ) : null}
          <Button title="New Keypair" onPress={randomKeypair} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default App;
