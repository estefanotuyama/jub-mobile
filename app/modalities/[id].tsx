import {Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";


export default function ModalityDetails() {

    const modality = useLocalSearchParams();
    console.log(modality)

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"default"}/>
                <View style={styles.contentContainer}>

                    <View style={styles.topContainer}>
                        <Pressable style={styles.backButton} onPress={() => router.push('/modalities/')}>
                            <Image source={require('../../assets/images/back-arrow.png')}
                                   style={styles.icon}/>
                        </Pressable>

                        <View style={styles.titleContainer}>
                            <Image source={{uri:modality.icone}} style={styles.icon}/>
                            <Text style={styles.title}>{modality.modalidade}</Text>
                        </View>
                    </View>

                    <View style={styles.imageContainer}>
                        <Image source={{uri:modality.imagem_detalhe}} style={styles.image}/>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.infoCardTitle}>Informações</Text>

                        <View style={styles.infoRow}>
                            <FontAwesome name="calendar" size={20} color="#555" style={styles.infoIcon} />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Datas</Text>
                                <Text style={styles.infoValue}>De {modality.data_inicio} a {modality.data_fim}</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <FontAwesome name="clock-o" size={20} color="#555" style={styles.infoIcon} />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Horário</Text>
                                <Text style={styles.infoValue}>Das {modality.horarios}</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <FontAwesome name="map-marker" size={20} color="#555" style={styles.infoIcon} />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Local</Text>
                                <Text style={styles.infoValue}>{modality.local}</Text>
                            </View>
                        </View>
                    </View>

                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Meus Interesses</Text>
                        <FontAwesome name={"heart"} size={20} color="#fff" style={styles.iconButton}></FontAwesome>
                    </Pressable>
                    <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Ver no Mapa</Text>
                            <FontAwesome name={"map-marker"} size={20} color="#fff" style={styles.iconButton}></FontAwesome>
                    </Pressable>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 32,
    },
    icon: {
        width: 30,
        height: 30
    },
    imageContainer: {
        width: '100%',
    },
    image: {
        width:'100%',
        aspectRatio: 1,
        borderRadius: 20,
        marginTop: 18,
        marginBottom:8
    },
    title: {
        fontSize:32,
        fontWeight: "bold",
        marginHorizontal: 10
    },
    textContainer: {
        width: '100%',
    },
    informationText: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: "bold",
    },
    text: {
        marginTop: 8,
        fontSize: 18,
    },
    boldText: {
        fontWeight: "bold"
    },
    infoCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
        padding: 20,
        width: '100%',
        marginTop: 20,
        marginBottom:17,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    infoCardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent:"center",
        marginVertical: 10,
    },
    infoIcon: {
        marginRight: 15,
        marginTop: 5,
    },
    infoTextContainer: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 16,
        color: '#111',
        fontWeight: 'bold',
    },
    backButton: {
        padding: 10,
        marginRight: 12,
    },
    topContainer: {
        flexDirection: "row",
        width: '100%'
    },
    titleContainer: {
        flexDirection:"row",
        alignItems:"center",
        marginLeft: 32
    },
    button: {
        backgroundColor: "#000000",
        width: "100%",
        height: 44,
        marginTop: 8,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        marginRight:12
    },
    iconButton: {

    }
})