import { ActivityIndicator, Image, ScrollView, StyleProp, StyleSheet, TouchableHighlight, ViewStyle } from "react-native";
import { ThemedView } from "../ThemedView";
import { useEffect, useState } from "react";
import { BreedDTO } from "@/models/breeds/BreedDTO";
import { apiBreedImgUrl, getLocalImgUrl } from "@/constants/ApiUrls";
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";
import { BreedImageResponse } from "@/models/image/BreedImageResponse";

type BreedListProps = {
  breeds?: BreedDTO[];
  currentPage?: number;
  style?: StyleProp<ViewStyle>;
};

export function BreedList(props: BreedListProps) {
  const router = useRouter();

  const breeds = props.breeds || [];
  const [loading, setLoading] = useState(false);

  const [imgs, setImgs] = useState<{ [key: string]: BreedImageResponse }>({});

  useEffect(() => {
    if (breeds.length === 0) {
      return;
    }
    for (const breed of breeds) {
      const localImgUrl = getLocalImgUrl(breed.attributes.name);
      if (localImgUrl) {
        setImgs(prev => ({
          ...prev,
          [breed.id]: {
            status: 'success',
            message: localImgUrl
          }
        }));
      } else {
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
    }
  }, [breeds]);

  const handleBreedClick = function(breedId: string) {
    router.push({ pathname: `/breed/[breedId]`, params: { currentPage: props.currentPage, breedId }});
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  scrollContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemContainer: {
    width: '50%',
    padding: 4,
    maxHeight: 200,
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
