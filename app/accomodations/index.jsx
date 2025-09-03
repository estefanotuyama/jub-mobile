import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";


const ACCOMODATIONS_DATA_LINK = "https://raw.githubusercontent.com/estefanotuyama/jub-ufsc-data/refs/heads/main/accommodation.json";

const saveAccomodations = async (accomodations) => {
  const accomodationsJson = await JSON.stringify(accomodations);
  await AsyncStorage.setItem("accomodations_cache", accomodationsJson);
}

const readAccomodations = async () => {
  const accomodations = await AsyncStorage.getItem("accomodations_cache");
  return accomodations != null ? JSON.parse(accomodations) : null;
}

async function loadAccomodations() {
  let data = await readAccomodations();

  if (!data) {
    const response = await fetch(ACCOMODATIONS_DATA_LINK);
    data = await response.json();
    await saveAccomodations(data);
  }
  return data;
}

const AcommodationRender = ({item}) => {
  return (<Pressable style={styles.pressable} onPress={() => {
      const params = {...item, fotos: JSON.stringify(item.fotos)};
      router.push({pathname: `/accomodations/${item.id}`, params: params});
    }}>
      <View>
        <Text style={styles.mainText}>{item.nome}</Text>
        <Text style={styles.text}>{item.bairro}</Text>
      </View>
      <Image style={styles.arrow} source={require("../../assets/images/arrow-right.png")}/>
    </Pressable>)
}

export default function Accomodations() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const accomodations = await loadAccomodations();
      setData(accomodations);
    };
    fetchData();
  }, []);


  return (<SafeAreaView style={styles.container}>
      <StatusBar barStyle={"default"}/>
      <View style={styles.contentContainer}>
        <FlatList
          ListHeaderComponent={<Text style={styles.title}>Alojamentos</Text>}
          data={data}
          renderItem={({item}) => <AcommodationRender item={item}/>}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, contentContainer: {
    flex: 1, padding: 20
  }, title: {
    fontSize: 32, fontWeight: "bold", marginBottom: 20
  }, pressable: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 18,
    height: 90,
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0, height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  }, arrow: {
    height: 20, width: 20, marginLeft: 5
  }, mainText: {
    fontSize: 18, fontWeight: "bold",
  }, text: {
    fontSize: 16, color: '#666', marginTop: 4,
  },
});