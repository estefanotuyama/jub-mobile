import {Text, View, Image, Dimensions, StyleSheet} from "react-native";

const windowWidth = Dimensions.get('window').width;
const halfWindowLength = Dimensions.get('window').height / 2;

export default function Index() {
    return (
        <View>
            <Image source ={require('../assets/images/home-image.jpg')}
                   style={{width: windowWidth, height: halfWindowLength, marginBottom: 20}}
            />
            <View style = {styles.homeLogo}>
                <Image source={require('../assets/images/JUBs-logo.jpg')}
                       style={{width:120, height:120, borderRadius: 12}}/>
                <View style={styles.homeText}>
                    <Text style={styles.titleText}>Jogos Universitários Brasileiros 2025</Text>
                    <Text>Local</Text>
                    <Text>De 01/06/2025 a 21/06/2025</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    homeLogo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "flex-start",
    },
    homeText: {
        paddingLeft: 20
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    regularText: {
        fontSize: 10,
        fontWeight: "normal",
    }
    }
)