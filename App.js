import { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import * as Font from "expo-font";
import {
  Inter_400Regular,
  Inter_700Bold,
  Alegreya_400Regular,
  Sriracha_400Regular,
} from "@expo-google-fonts/dev";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Inter_400Regular,
          Inter_700Bold,
          Alegreya_400Regular,
          Sriracha_400Regular,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayout}>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            children={() => <Home setUser={setUser} />}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}
            // (screen component) higher order components are automatically passed the navigation prop
          />
          <Stack.Screen
            name="Login"
            children={() => <Login setUser={setUser} />}
            options={{
              headerTitleStyle: {
                fontFamily: "Sriracha_400Regular",
                fontSize: 25,
              },
              headerStyle: {
                backgroundColor: "#414999",
              },
              headerTintColor: "#D9E4DD",
            }}
            // (child component) requires useNavigation passed as prop or imported in component
          />
          <Stack.Screen
            name="Signup"
            children={() => <Signup setUser={setUser} />}
            options={{
              headerTitleStyle: {
                fontFamily: "Sriracha_400Regular",
                fontSize: 25,
              },
              headerStyle: {
                backgroundColor: "#414999",
              },
              headerTintColor: "#D9E4DD",
            }}
            // (child component) requires useNavigation passed as prop or imported in component
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
