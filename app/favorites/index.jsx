import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView, StatusBar, Text, View, StyleSheet, Pressable, FlatList, Image, Alert } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

const getFavorites = async () => {
  try {
    const favoritesJson = await AsyncStorage.getItem('favorites');
    return favoritesJson != null ? JSON.parse(favoritesJson) : [];
  } catch (e) {
    console.error("Erro ao ler favoritos:", e);
    return [];
  }
};

const removeFavorite = async (id, onComplete) => {
  try {
    let favorites = await getFavorites();
    favorites = favorites.filter(fav => fav.id !== id);
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    onComplete(favorites);
  } catch (e) {
    console.error("Erro ao remover favorito:", e);
  }
};

const ModalityRender = ({ item, setData }) => {

  const showRemoveAlert = () => {
    Alert.alert(
      "Remover Interesse",
      `Tem certeza que deseja remover "${item.modalidade}" da sua lista?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", style: "destructive", onPress: () => removeFavorite(item.id, setData) }
      ]
    );
  };

  return (
    <Pressable
      style={styles.pressable}
      onPress={() => router.push({ pathname: `/modalities/${item.id}`, params: { ...item } })}
    >
      <Pressable onPress={showRemoveAlert} style={styles.dotsButton}>
        <FontAwesome name="ellipsis-v" size={20} color="#555" />
      </Pressable>
      <View style={styles.itemContent}>
        <Image source={{ uri: item.icone }} style={styles.icon} />
        <Text style={styles.mainText}> {item.modalidade} </Text>
      </View>
      <Image style={styles.arrow} source={require("../../assets/images/arrow-right.png")} />

    </Pressable>
  )
}

export default function Favorites() {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const loadFavorites = async () => {
        const favs = await getFavorites();
        setData(favs);
      };
      loadFavorites();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"default"} />
      <View style={styles.contentContainer}>
        <FlatList
          ListHeaderComponent={
            <Text style={styles.title}>Meus Interesses</Text>
          }
          data={data}
          renderItem={({ item }) => <ModalityRender item={item} setData={setData} />}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Sua lista de interesses está vazia.</Text>
              <Text style={styles.emptySubText}>Vá para a página de uma modalidade e clique em &#34;Meus Interesses&#34; para adicioná-la aqui.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20
  },
  pressable: {
    alignItems: "center",
    flexDirection: "row",
    height: 90,
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 25,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    height: 20,
    width: 20,
    marginLeft: 15,
  },
  icon: {
    width: 30,
    height: 30,
  },
  mainText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
  dotsButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  }
});