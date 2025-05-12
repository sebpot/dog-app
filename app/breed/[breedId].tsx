import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { apiBreedImgUrl, apiBreedInfoUrl, getLocalImgUrl } from "@/constants/ApiUrls";
import { Colors } from "@/constants/Colors";
import { BreedDTO } from "@/models/breeds/BreedDTO";
import { BreedResponse } from "@/models/breeds/BreedResponse";
import { BreedImageResponse } from "@/models/image/BreedImageResponse";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";

export default function BreedScreen() {
  const { breedId, currentPage } = useLocalSearchParams();
  const nav = useRouter();

  const [breed, setBreed] = useState<BreedDTO>();
  const [breedImg, setBreedImg] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);

  const handleBackClick = useCallback(() => {
    nav.push({ pathname: '/(tabs)', params: { currentPage }});
  }, [nav]);

  useEffect(() => {
    if (breed) {
      const localImgUrl = getLocalImgUrl(breed.attributes.name);
      if (localImgUrl) {
        setBreedImg(localImgUrl);
      } else {
        setLoadingImg(true);
        fetch(apiBreedImgUrl(breed.attributes.name))
          .then(res => res.json())
          .then((data: BreedImageResponse) => {
            setBreedImg(data?.status === 'error' ? undefined : data.message);
            setLoadingImg(false);
          }).catch(err => {
            console.log(err);
            setLoadingImg(false);
          });
        } 
      }
    }, [breed, setBreedImg, setLoadingImg]);

  useEffect(() => {
    setLoading(true);
    fetch(apiBreedInfoUrl(breedId as string))
      .then(res => res.json())
      .then((data: BreedResponse) => {
        setBreed(data?.data);
        setLoading(false);
      }).catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [breedId, setBreed, setLoading]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.navHeader}>
        <TouchableHighlight onPress={() => handleBackClick()}>
          <IconSymbol 
            size={32}
            name="chevron.left"
            color={Colors.dark.icon}>
          </IconSymbol>
        </TouchableHighlight>
        <ThemedText type="subtitle">{breed?.attributes.name}</ThemedText>
      </ThemedView>
      { loading ? <ActivityIndicator /> :
        <>
          <ThemedView style={styles.imgContainer}>
            { loadingImg ? <ActivityIndicator /> : <Image source={{ uri: breedImg }} style={styles.breedImg} /> }
          </ThemedView>
          <ThemedText type="default">{breed?.attributes.description}</ThemedText>
          <ThemedView>
            <ThemedText>Weight: {breed?.attributes.male_weight.min} - {breed?.attributes.male_weight.max} kg</ThemedText>
            <ThemedText>Lifespan: {breed?.attributes.life.min} - {breed?.attributes.life.max} years</ThemedText>
          </ThemedView>
        </> }
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
  navHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  imgContainer: {
    width: '100%',
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  breedImg: {
    width: '100%',
    height: '100%',
    borderRadius: 16
  }
});