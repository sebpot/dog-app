import { ActivityIndicator, Image, StyleProp, StyleSheet, TouchableHighlight, ViewStyle } from "react-native";
import { ThemedView } from "../ThemedView";
import { BreedsResponse } from "@/models/breeds/BreedsResponse";
import { useEffect, useState } from "react";
import { BreedDTO } from "@/models/breeds/BreedDTO";
import { API_BREED_LIST_URL, apiBreedImgUrl } from "@/constants/ApiUrls";
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";
import { BreedImageResponse } from "@/models/image/BreedImageResponse";

type BreedListProps = {
  style?: StyleProp<ViewStyle>;
};

export function BreedList(props: BreedListProps) {
  const router = useRouter();

  const [breeds, setBreeds] = useState<BreedDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const [imgs, setImgs] = useState<{ [key: string]: BreedImageResponse }>({});

  useEffect(() => {
    if (breeds.length === 0) {
      return;
    }
    for (const breed of breeds) {
      fetch(apiBreedImgUrl(breed.attributes.name))
        .then(res => res.json())
        .then((data: BreedImageResponse) => {
          setImgs(prev => ({
            ...prev,
            [breed.id]: data
          }));
        }).catch(err => {
          console.log(err);
        });
    }
  }, [breeds]);

  useEffect(() => {
    handleFetchFact();
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

  const handleBreedClick = function(breedId: string) {
    router.push(`/breed/${breedId}`);
  }

  return (
    <ThemedView style={[styles.container, props.style]}>
      {breeds.map((breed, index) => (
        <TouchableHighlight key={index} style={styles.itemContainer} onPress={() => handleBreedClick(breed.id)}>
          <ThemedView style={styles.item}>
            <ThemedView style={styles.imgContainer}>
              { imgs?.[breed.id] == null && <ActivityIndicator /> }
              { imgs?.[breed.id]?.status === 'error' && <ThemedText type="default">No image</ThemedText> }
              { imgs?.[breed.id]?.status === 'success' && <Image source={{ uri: imgs?.[breed.id].message}} style={styles.itemImg} />}
            </ThemedView>
            <ThemedText style={{ textAlign: 'center' }} type="default">{breed.attributes.name}</ThemedText>
          </ThemedView>
        </TouchableHighlight>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    overflow: 'scroll'
  },
  itemContainer: {
    width: '50%',
    padding: 4,
    minHeight: 0,
  },
  item: {
    display: 'flex',
    gap: 10,
    padding: 8,
    height: '100%',
    backgroundColor: 'rgb(54, 60, 64)',
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'rgb(54, 60, 64)',
  },
  itemImg: {
    width: '100%',
    height: '100%',
  }
});
