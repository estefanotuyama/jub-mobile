import {
	Text,
	View,
	Image,
	StyleSheet,
	SafeAreaView,
	StatusBar,
	Pressable,
	ScrollView,
	Dimensions,
} from "react-native";
import { router } from "expo-router";

const carouselData = [
	{ id: '1', image: require('../assets/images/caroussel-1.png') },
	{ id: '2', image: require('../assets/images/caroussel-2.png') },
	{ id: '3', image: require('../assets/images/caroussel-3.png') },
	{ id: '4', image: require('../assets/images/caroussel-4.jpg') },
];

const { width: screenWidth } = Dimensions.get('window');

export default function Index() {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle={"default"} />
			<ScrollView>
				<ScrollView
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					style={styles.carouselContainer}
				>
					{carouselData.map((item) => (
						<Image key={item.id} source={item.image} style={styles.carouselImage} />
					))}
				</ScrollView>

				<View style={styles.contentContainer}>
					<Image source={require('../assets/images/JUBs-logo.png')} style={styles.logo} />
					<View style={styles.textContainer}>
						<Text style={styles.titleText}>Jogos Universitários Brasileiros 2025</Text>
						<Text style={styles.regularText}>Florianópolis</Text>
						<Text style={styles.regularText}>De 01/06/2025 a 21/06/2025</Text>
					</View>
				</View>

				<View style={styles.buttonContainer}>
					<Pressable style={styles.button} onPress={() => router.push('/modalities')}>
						<Text style={styles.buttonText}> Ver Modalidades </Text>
					</Pressable>
					<Pressable style={styles.button} onPress={() => router.push('/accomodations')}>
						<Text style={styles.buttonText}> Ver acomodações </Text>
					</Pressable>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white"
	},
	carouselContainer: {
		height: 450,
	},
	carouselImage: {
		width: screenWidth,
		height: '100%',
		resizeMode: 'cover',
	},
	contentContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 32,
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
	titleText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	regularText: {
		fontSize: 16,
		marginTop: 5
	},
	buttonContainer: {
		alignItems: 'center',
		width: '100%',
		paddingHorizontal: 32,
	},
	button: {
		marginBottom: 10,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#000000",
		height: 40,
		borderRadius: 12,
		width: '100%',
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white"
	},
})
