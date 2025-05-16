import { StyleSheet, TouchableHighlight, TextInput, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useCallback, useEffect, useState } from 'react';
import { API_BREED_LIST_URL, API_FACTS_URL } from '@/constants/ApiUrls';
import { FactsResponse } from '@/models/facts/FactsResponse';
import { BreedList } from '@/components/ui/BreedList';
import { BreedsResponse } from '@/models/breeds/BreedsResponse';
import { BreedDTO } from '@/models/breeds/BreedDTO';
import { ResponseMeta } from '@/models/ResponseMeta';
import { ResponseLinks } from '@/models/ResponseLinks';
import { useLocalSearchParams } from 'expo-router';

export default function HomeScreen() {
  const { currentPage } = useLocalSearchParams();
  
  const [breeds, setBreeds] = useState<BreedDTO[]>([]);
  const [meta, setMeta] = useState<ResponseMeta>();
  const [links, setLinks] = useState<ResponseLinks>();
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

  useEffect(() => {
    handleFetchBreeds();
  }, []);

  const handleFetchBreeds = function(link?: string) {
    if (loading) {
      return;
    }
    if (!link) {
      link = API_BREED_LIST_URL;
      if (currentPage != null) {
        link = `${API_BREED_LIST_URL}?page[number]=${currentPage}`;
      }
    }
    setLoading(true);
    fetch(link)
      .then(res => res.json())
      .then((res: BreedsResponse) => {
        setBreeds(res.data);
        setMeta(res.meta);
        setLinks(res.links);
      }).finally(() => {
        setLoading(false);
      });
  };

  const handlePagination = useCallback((link?: string) => {
    if (!loading && link) {
      handleFetchBreeds(link);
    }
  }, [loading]);

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
        <ThemedText type="subtitle">Breeds</ThemedText>
        <ThemedView style={{ height: 0.5, backgroundColor: Colors.dark.tint, marginVertical: 1, width: '100%' }} />
      </ThemedView>
      <BreedList breeds={breeds} currentPage={meta?.pagination.current}/>
      <ThemedView style={styles.pagination}>
        <TouchableHighlight disabled={!links?.prev} onPress={() => handlePagination(links?.prev)}>
          <IconSymbol 
            size={32}
            name="chevron.left"
            color={Colors.dark.icon}>
          </IconSymbol>
        </TouchableHighlight>
        <ThemedText type='default'>
          {meta?.pagination.current ?? '?'} / {meta?.pagination.last ?? '?'}
        </ThemedText>
        <TouchableHighlight disabled={!links?.next} onPress={() => handlePagination(links?.next)}>
          <IconSymbol 
            size={32}
            name="chevron.right"
            color={Colors.dark.icon}>
          </IconSymbol>
        </TouchableHighlight>
      </ThemedView>
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
    marginTop: 20,
  },
  searchContainer: {
    marginHorizontal: 8,
  },
  pagination: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
