import { StyleSheet, Platform, TouchableHighlight } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [fact, setFact] = useState('nothing yet...');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('HomeScreen mounted');
    handleFetchFact();
  }, []);

  const handleFetchFact = function () {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://dogapi.dog/api/v2/facts?limit=1')
      .then(res => res.json())
      .then(data => {
        setFact(data.data[0].attributes.body);
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
  <ThemedView style={styles.container}>
    <ThemedView style={styles.factContainer}>
      <ThemedText type="defaultSemiBold">{fact}</ThemedText>
      <TouchableHighlight onPress={handleFetchFact}>
        <IconSymbol 
          size={24}
          name="clock.circle.fill"
          color={Colors.dark.icon}>
        </IconSymbol>
      </TouchableHighlight>
    </ThemedView>
    <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">Step 1: Try it</ThemedText>
      <ThemedText>
        Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
        Press{' '}
        <ThemedText type="defaultSemiBold">
          {Platform.select({
            ios: 'cmd + d',
            android: 'cmd + m',
            web: 'F12'
          })}
        </ThemedText>{' '}
        to open developer tools.
      </ThemedText>
    </ThemedView>
    <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">Step 2: Explore</ThemedText>
      <ThemedText>
        Tap the Explore tab to learn more about what's included in this starter app.
      </ThemedText>
    </ThemedView>
    <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
      <ThemedText>
        When you're ready, run{' '}
        <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
        <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
        <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
        <ThemedText type="defaultSemiBold">app-example</ThemedText>.
      </ThemedText>
    </ThemedView>
  </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    padding: 16,
  },
  factContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'space-between',
    backgroundColor: 'rgb(54, 60, 64)',
    borderRadius: 8,
    padding: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
