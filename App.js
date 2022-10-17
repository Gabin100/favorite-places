import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import IconButtons from "./components/Ui/IconButtons";
import { Colors } from "./constants/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Favorite places",
              headerRight: ({ tintColor }) => (
                <IconButtons
                  icon={"add"}
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name='AddPlace'
            component={AddPlace}
            options={{
              title: "Add a new Palce",
            }}
          />
          <Stack.Screen name='Map' component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
