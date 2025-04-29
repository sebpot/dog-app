import { Image, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ThemedView } from "../ThemedView";
import { BreedsResponse } from "@/models/breeds/BreedsResponse";
import { useEffect, useState } from "react";
import { BreedDTO } from "@/models/breeds/BreedDTO";
import { API_BREED_LIST_URL } from "@/constants/ApiUrls";
import { ThemedText } from "../ThemedText";

type BreedListProps = {
  style?: StyleProp<ViewStyle>;
};

export function BreedList(props: BreedListProps) {
  const [breeds, setBreeds] = useState<BreedDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('BreedList mounted');
    handleFetchFact();
    console.log(breeds);
    
  }, []);

  const handleFetchFact = function() {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(API_BREED_LIST_URL)
      .then(res => res.json())
      .then((res: BreedsResponse) => {
        setBreeds(res.data);
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <ThemedView style={[styles.container, props.style]}>
      {breeds.map((breed, index) => (
        <ThemedView key={index} style={styles.itemContainer}>
          <ThemedView style={styles.item}>
            <Image source={ require('../../assets/images/icon.png') } style={styles.itemImg} />
            <ThemedText type="defaultSemiBold">{breed.attributes.name}</ThemedText>
          </ThemedView>
        </ThemedView>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'scroll',
  },
  itemContainer: {
    width: '50%',
    padding: 4,
    minHeight: 200,
  },
  item: {
    display: 'flex',
    gap: 10,
    padding: 16,
    height: '100%',
    backgroundColor: 'rgb(54, 60, 64)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImg: {
    width: '100%',
    height: '100%',
  }
});
