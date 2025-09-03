import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions, Image, Linking, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View
} from "react-native";


const {width: screenWidth} = Dimensions.get('window');

const mapUrl = Platform.select({
  ios: 'maps:0,0?q=', android: 'geo:0,0?q=',
});

export default function AccomodationDetails() {
  const acommodation = useLocalSearchParams();

  const fotosArray = JSON.parse(acommodation.fotos as string || '[]');
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const scrollToBeginning = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: 0, animated: false});
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    scrollToBeginning();
  }, [acommodation.id]);

  return (<SafeAreaView style={styles.container}>
    <StatusBar barStyle={"default"}/>
    <ScrollView>
      <View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ref={scrollViewRef}
          onLayout={scrollToBeginning}
          style={styles.carouselContainer}
        >
          {fotosArray.map((fotoUrl, index) => (<Image
            key={index}
            source={{uri: fotoUrl}}
            style={styles.carouselImage}
          />))}
        </ScrollView>
        <View style={styles.pagination}>
          {fotosArray.map((_, index) => (<View
            key={index}
            style={[styles.paginationDot, index === activeIndex ? styles.paginationDotActive : {}]}
          />))}
        </View>
      </View>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Image source={require('../../assets/images/back-arrow.png')} style={styles.icon}/>
      </Pressable>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{acommodation.nome}</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <FontAwesome name="money" size={20} color="#555" style={styles.infoIcon}/>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Valor</Text>
              <Text style={styles.infoValue}>{acommodation.valor}</Text>
            </View>
          </View>
          <Pressable style={styles.infoRow} onPress={() => Linking.openURL(`mailto:${acommodation.email}`)}>
            <FontAwesome name="envelope-o" size={20} color="#555" style={styles.infoIcon}/>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email para contato</Text>
              <Text style={[styles.infoValue, styles.linkText]}>{acommodation.email}</Text>
            </View>
          </Pressable>
          <Pressable style={styles.infoRow} onPress={() => Linking.openURL(`tel:${acommodation.telefone.replace(/\D/g, '')}`)}>
            <FontAwesome name="phone" size={20} color="#555" style={styles.infoIcon}/>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Telefone para contato</Text>
              <Text style={[styles.infoValue, styles.linkText]}>{acommodation.telefone}</Text>
            </View>
          </Pressable>
          <View style={styles.infoRow}>
            <FontAwesome name="map-marker" size={20} color="#555" style={styles.infoIcon}/>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Localização</Text>
              <Text style={styles.infoValue}>{acommodation.endereco}</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.button}
                   onPress={() => Linking.openURL(`${mapUrl}${acommodation.lat},${acommodation.long}`)}>
          <Text style={styles.buttonText}>Ver no Mapa</Text>
          <FontAwesome name={"map-marker"} size={20} color="#fff"/>
        </Pressable>
      </View>
    </ScrollView>
  </SafeAreaView>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'white',
  }, carouselContainer: {
    height: 250,
  }, carouselImage: {
    width: screenWidth, height: '100%', resizeMode: 'cover',
  }, pagination: {
    flexDirection: 'row', position: 'absolute', bottom: 15, alignSelf: 'center',
  }, paginationDot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(0, 0, 0, 0.4)', margin: 5,
  }, paginationDotActive: {
    backgroundColor: '#FFF',
  }, backButton: {
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight - 15 : 40,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 20,
  }, icon: {
    width: 25, height: 25, tintColor: 'white'
  }, contentContainer: {
    padding: 20, backgroundColor: 'white'
  }, title: {
    fontSize: 32, fontWeight: "bold", marginBottom: 20,
  }, infoCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  }, infoRow: {
    flexDirection: 'row', alignItems: 'center', marginVertical: 10,
  }, infoIcon: {
    marginRight: 15, width: 20, textAlign: 'center',
  }, infoTextContainer: {
    flex: 1,
  }, infoLabel: {
    fontSize: 14, color: '#666',
  }, infoValue: {
    fontSize: 16, fontWeight: 'bold',
  }, button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }, buttonText: {
    fontSize: 18, color: "#fff", fontWeight: "bold", marginRight: 12
  }, linkText: {
    color: '#007AFF',
  },
});