import * as React from "react";
import { Image, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { useGoogleUserProfile } from '../utils/API';
import { useSecureAuthState } from "../utils/useSecureAuthState";



export default function ProfileScreen() {
  const [authState] = useSecureAuthState("auth.google");

  const { value: data } = useGoogleUserProfile(authState.value?.accessToken)

  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', }} lightColor={Colors.light.tabBar} darkColor={Colors.dark.tabBar}>
        <Image style={{ width: 64, margin: 8, height: 64, borderRadius: 32, resizeMode: 'cover' }} source={{ uri: data?.picture }} />
        <View style={{ justifyContent: 'center', flex: 1 }} lightColor={Colors.light.tabBar}>
          <Text style={{ fontSize: 20 }}>{data.name}</Text>
          <Text style={{ fontSize: 14 }}>{data.email}</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
