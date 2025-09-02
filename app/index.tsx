import {
	Text,
	View,
	Image,
	StyleSheet,
	SafeAreaView,
	StatusBar,
	Pressable, Animated,
} from "react-native";
import { router } from "expo-router"
import ScrollView = Animated.ScrollView;


export default function Index() {
	return (
		<ScrollView>
			<SafeAreaView style={styles.container}>
				<StatusBar barStyle={"default"} />
				<Image source={require('../assets/images/home-image.jpg')}
					style={styles.image}
				/>
				<View style={styles.contentContainer}>
					<Image source={require('../assets/images/JUBs-logo.png')}
						style={styles.logo} />
					<View style={styles.textContainer}>
						<Text style={styles.titleText}>Jogos Universitários Brasileiros 2025</Text>
						<Text style={styles.regularText}>Florianópolis</Text>
						<Text style={styles.regularText}>De 01/06/2025 a 21/06/2025</Text>
					</View>
				</View>
				<Pressable style={styles.button} onPress={() => router.push('/modalities')}>
					<Text style={styles.buttonText}> Ver Modalidades </Text>
				</Pressable>
				<Pressable style={styles.button} onPress={() => router.push('/accomodations')}>
					<Text style={styles.buttonText}> Ver acomodações </Text>
				</Pressable>
			</SafeAreaView>
		</ScrollView>
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
		padding: 32,
		marginBottom: 20
	},
	image: {
		width: '100%',
		height: 450,
		aspectRatio: 1,
		marginBottom: 12
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
		fontSize: 20,
		fontWeight: 'bold',
	},
	regularText: {
		fontSize: 16,
		fontWeight: "normal",
		marginTop: 5
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
		alignItems: "center",
		color: "white"
	},
	button: {
		marginBottom: 10,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#000000",
		height: 50,
		borderRadius: 12,
		width: '90%',
	}
})
