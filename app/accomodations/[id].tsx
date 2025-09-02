import { SafeAreaView, StatusBar, Text, View, StyleSheet, Pressable, Image, ScrollView, Platform, Linking } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const mapUrl = Platform.select({
    ios: 'maps:0,0?q=',
    android: 'geo:0,0?q=',
});

export default function AccomodationDetails() {
    const acommodation = useLocalSearchParams();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"default"} />
            <ScrollView>
                <View style={styles.contentContainer}>
                    <Pressable style={styles.backButton} onPress={() => router.back()}>
                        <Image source={require('../../assets/images/back-arrow.png')} style={styles.icon} />
                    </Pressable>

                    <Text style={styles.title}>{acommodation.nome}</Text>

                    <Image source={{ uri: acommodation.foto as string }} style={styles.image} />

                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <FontAwesome name="money" size={20} color="#555" style={styles.infoIcon} />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Valor</Text>
                                <Text style={styles.infoValue}>{acommodation.valor}</Text>
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <FontAwesome name="envelope-o" size={20} color="#555" style={styles.infoIcon} />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Email para contato</Text>
                                <Text style={styles.infoValue}>{acommodation.email}</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <FontAwesome name="phone" size={20} color="#555" style={styles.infoIcon} />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Telefone para contato</Text>
                                <Text style={styles.infoValue}>{acommodation.telefone}</Text>
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <FontAwesome name="map-marker" size={20} color="#555" style={styles.infoIcon} />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Localização</Text>
                                <Text style={styles.infoValue}>{acommodation.endereco}</Text>
                            </View>
                        </View>
                    </View>

                    <Pressable style={styles.button} onPress={() => Linking.openURL(`${mapUrl}${acommodation.lat},${acommodation.long}`)}>
                        <Text style={styles.buttonText}>Ver no Mapa</Text>
                        <FontAwesome name={"map-marker"} size={20} color="#fff" />
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
    },
    backButton: {
        alignSelf: 'flex-start',
        padding: 10,
        marginLeft: -10,
    },
    icon: {
        width: 30,
        height: 30
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: 20,
        marginBottom: 20,
    },
    infoCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    infoIcon: {
        marginRight: 15,
        width: 20,
        textAlign: 'center',
    },
    infoTextContainer: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: "#000",
        paddingVertical: 15,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        marginRight: 12
    },
});