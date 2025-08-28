import {
    Text,
    View,
    Image,
    Dimensions,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Pressable,
} from "react-native";
import { router } from "expo-router"

const windowWidth = Dimensions.get('window').width;
const halfWindowLength = Dimensions.get('window').height / 2;

export default function Index() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"default"} />
            <Image source ={require('../assets/images/home-image.jpg')}
                   style={{width: windowWidth, height: halfWindowLength, marginBottom: 12}}
            />
            <View style = {styles.contentContainer}>
                <Image source={require('../assets/images/JUBs-logo.png')}
                       style={styles.logo}/>
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Jogos Universitários Brasileiros 2025</Text>
                    <Text style={styles.regularText}>Florianópolis</Text>
                    <Text style={styles.regularText}>De 01/06/2025 a 21/06/2025</Text>
                </View>
            </View>
                <Pressable style={styles.button} onPress={() => router.push('/modalities')}>
                    <Text style={styles.buttonText}> Ver Modalidades </Text>
                </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    textContainer: {
        flex: 1
    },
    logo: {
        height: 120,
        width: 120,
        borderRadius: 20,
        marginRight: 20
    },
    homeText: {
        paddingLeft: 20
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    regularText: {
        fontSize: 18,
        fontWeight: "normal",
        marginTop: 4
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        alignItems: "center",
        color: "white"
    },
    button: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1374E4",
        height: 50,
        borderRadius: 40,
        width: 350,
    }
})