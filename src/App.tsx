import React, {useRef} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {Header} from './components';
import {AccountProvider, ConnectionProvider} from './providers';
import {Wallet} from './screens';

export const App = () => {
  const scrollViewRef = useRef<null | ScrollView>(null);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Header />
      <SafeAreaView>
        <ScrollView
          ref={ref => (scrollViewRef.current = ref)}
          contentInsetAdjustmentBehavior="automatic">
          <AccountProvider>
            <ConnectionProvider>
              <Wallet />
            </ConnectionProvider>
          </AccountProvider>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
