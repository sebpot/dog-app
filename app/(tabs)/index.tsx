import { StyleSheet, TouchableHighlight, TextInput, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useCallback, useEffect, useState } from 'react';
import { API_FACTS_URL } from '@/constants/ApiUrls';
import { FactsResponse } from '@/models/facts/FactsResponse';
import { BreedList } from '@/components/ui/BreedList';

export default function HomeScreen() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleFetchFact();
  }, []);

  const handleFetchFact = useCallback(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(API_FACTS_URL)
      .then(res => res.json())
      .then((data: FactsResponse) => {
        setFact(data?.data?.[0]?.attributes?.body);
      }).finally(() => {
        setLoading(false);
      });
  }, [loading, setLoading, setFact]);

  return (
  <ThemedView style={styles.container}>
    <ThemedView style={styles.factContainer}>
      <ThemedText type="defaultSemiBold">
        { loading ? <ActivityIndicator /> : fact }
      </ThemedText>
      <TouchableHighlight onPress={handleFetchFact}>
        <IconSymbol 
          size={32}
          name="arrow.2.circlepath"
          color={Colors.dark.icon}>
        </IconSymbol>
      </TouchableHighlight>
    </ThemedView>
    <ThemedView style={styles.breedsContainer}>
      <ThemedView style={styles.searchContainer}>
        <TextInput placeholder='Seach...' style={styles.searchInput}></TextInput>
      </ThemedView>
      <BreedList />
    </ThemedView>
  </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    padding: 16,
    paddingTop: 48,
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
  breedsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    flex: 1,
    marginTop: 64,
  },
  searchContainer: {

  },
  searchInput: {
    backgroundColor: 'rgb(54, 60, 64)',
    borderRadius: 8,
    padding: 8,
    color: Colors.dark.text,
    fontSize: 16,
  }
});
