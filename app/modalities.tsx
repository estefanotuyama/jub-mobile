import {SafeAreaView, StatusBar, Text, View, StyleSheet, Pressable, FlatList, Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";

const modalities_data_link = "https://raw.githubusercontent.com/estefanotuyama/jub-ufsc-data/refs/heads/main/modalities.json"

const saveModalities = async (modalidades) => {
    const modalitiesJson = await JSON.stringify(modalidades);
    await AsyncStorage.setItem("modalidades_cache", modalitiesJson);
}

const readModalities = async () => {
    const modalities = await AsyncStorage.getItem("modalidades_cache");
    return modalities != null ? JSON.parse(modalities) : null;
}

async function loadModalities() {
    let data = await readModalities()
    if (!data) {
    const response = await fetch(modalities_data_link)
    data = await response.json()
    await saveModalities(data)
    }
    return data
}

const modalityRender = (item) => {
    return (
        <Pressable style={styles.pressable}>
            <View style={styles.buttonContent}>
                <Image source={{uri:item.icone, method:"GET"}}
                       style={styles.icon}/>
                <Text style={styles.mainText}> {item.modalidade} </Text>
            </View>
            <View style={styles.buttonContent}>
                <Text style={styles.text}> Local: {item.local.nome} </Text>
                <Image style={styles.arrow} source={require("../assets/images/arrow-right.png")}/>
            </View>
        </Pressable>
    )
}

export default function Modalities() {
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async() => {
            const modalities = await loadModalities();
            setData(modalities);
        };
        fetchData()
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"default"}/>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Programação</Text>
                <FlatList
                    data={data}
                    renderItem={({item}) => modalityRender(item)}
                    keyExtractor={item => item.id}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexDirection:"column",
        alignItems:"flex-start",
        padding:40,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20
    },
    pressable: {
        alignItems: "center",
        justifyContent:"space-between",
        flexDirection: "row",
        height: 90,
        width: 350,
        backgroundColor: "white",
        marginBottom:20,
        borderRadius: 25
    },
    arrow:{
        height:20,
        width:20,
        marginLeft:5
    },
    icon:{
        width:40,
        height:40
    },
    mainText: {
        fontSize:18,
        fontWeight:"bold",
        marginLeft:10
    },
    text:{
        fontSize:16
    },
    buttonContent:{
        flexDirection:"row",
        alignItems: "center",
        paddingHorizontal: 18,
    },
})