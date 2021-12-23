import React, { useContext } from 'react'
import { Image, View, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CONFIGURATION from './Components/Config';

//CONTEXT
import { APPProvider } from './Context/AppProvider';
import { AuthProvider } from './Context/AuthProvider';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

//----------------Screens-----------------//
import Login from './Screens/Login'
import ForgotPassword from './Screens/ForgotPassword/index'
import ResetPassword from './Screens/ResetPassword/index'
import Register from './Screens/Register/index'
import Home from './Screens/Home/index'
import Clients from './Screens/Clients/index'
import Messages from './Screens/Message/index'
import ChatView from './Screens/ChatView/index'
import ClientsDetail from './Screens/ClientsDetail/index'
import Profile from './Screens/Profile/index'
import CalenderView from './Screens/CalenderView/index'
import Splash from './Screens/Splash/Splash';
import ChangePassword from './Screens/ChangePassword/ChangePassword';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
        name="Splash"
        component={Splash}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
        name="ResetPassword"
        component={ResetPassword}
      />
       <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
        name="ChangePassword"
        component={ChangePassword}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
        name="Home"
        component={HomeTab}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
        name="ChatView"
        component={ChatView}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
        name="ClientsDetail"
        component={ClientsDetail}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
        name="CalenderView"
        component={CalenderView}
      />
    </Stack.Navigator>
  );
}

function HomeTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarInactiveTintColor: CONFIGURATION.TextDarkGray, tabBarActiveTintColor: CONFIGURATION.primaryGreen, tabBarStyle: { paddingTop: 10, height: 70, paddingBottom: 10 }, tabBarLabelStyle: { fontFamily: CONFIGURATION.TextBold, marginTop: 10, } }}>
      <Tab.Screen
        name="Dashboard"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Image style={{ height: 25, width: 25, tintColor: color }} resizeMode={"contain"} source={require("./assetss/Dasbord.png")} />
            )
          }
        }}
      />
      <Tab.Screen
        name="Message"
        component={Messages}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Image style={{ height: 25, width: 25, tintColor: color }} resizeMode={"contain"} source={require("./assetss/message.png")} />
            )
          }
        }}
      />
      {/* <Tab.Screen
        name="Schedule"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Image style={{height:25 ,width:25,tintColor:color}} resizeMode={"contain"} source={require("./assetss/Schedule.png")}/>
            )
          }
        }}
      /> */}
      <Tab.Screen
        name="Clients"
        component={Clients}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Image style={{ height: 25, width: 25, tintColor: color }} resizeMode={"contain"} source={require("./assetss/Clients.png")} />
            )
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Image style={{ height: 25, width: 25, tintColor: color }} resizeMode={"contain"} source={require("./assetss/Profile.png")} />
            )
          }
        }}
      />
    </Tab.Navigator>
  );
}

function App() {

  const client = new ApolloClient({
    uri: 'https://api-nightly.nutricoach.pro/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <APPProvider>
          <NavigationContainer>
            <MyStack />
          </NavigationContainer>
        </APPProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App