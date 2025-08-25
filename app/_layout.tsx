import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}


export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="modalities"
                options={{
                    title: 'Modalidades',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
                }}
            />
            <Tabs.Screen
                name="accomodations"
                options={{
                    title: 'Alojamentos',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <TabBarIcon name="building" color={color} />,
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Meus Interesses',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
                }}
            />
        </Tabs>
    );
}