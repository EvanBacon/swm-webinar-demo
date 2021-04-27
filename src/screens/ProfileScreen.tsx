import * as React from 'react';
import { Button, Image, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { ProfileData } from '../utils/API';
import { useSignOut, useUserInfo } from '../utils/GoogleAuthSessionContext';

export default function ProfileScreen() {
  const { value: data } = useUserInfo<ProfileData>();
  const signOutAsync = useSignOut()

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
      <Button title="Sign Out" onPress={signOutAsync} />
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
