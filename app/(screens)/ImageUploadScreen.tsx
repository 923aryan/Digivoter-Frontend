import { Text, View, Image, TextInput, Platform, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { Component, useContext, useEffect, useRef, useState } from 'react'
import ScreenWrapper from './components/HOC'
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../context/UserContext';
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';

export default function ImageUploadScreen() {
  const [image, setImage] = useState<null | string>(null);
  const logo = require('../../assets/Logo.png');
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('UserContext must be used within a UserProvider');
  }
  const { userDetails, setUserDetails } = context;
  const [isVerifying, setIsVerifying] = useState<boolean>(false)
  const toastRef = useRef<Toast | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const showToast = (message: string) => {
    if (toastRef.current) {
      Toast.hide(toastRef.current);
    }
    toastRef.current = Toast.show(message, {
      duration: Toast.durations.LONG,
    });
  };
  const validateFields = async () => {
    if (!image) {
      showToast('Image is required.');
      return false;
    }
    return true;
  };
  const onNextClick = async () => {
    setIsVerifying(true);
    const isDetailsCorrect = await validateFields();

    if (isDetailsCorrect) {
      setUserDetails((prev) => ({
        ...prev,
        image: image,
      }));
      router.push('/CredentialScreen');
    }
    setIsVerifying(false);
  };

  useEffect(() => {
    console.log("getting", userDetails)
    setImage(userDetails.image)
  }, [userDetails])


  return (
    <ScreenWrapper
      children={
        <View style={styles.container}>
          <Image source={logo} style={styles.image} />
          <View style={styles.uploadText}>
            <Text style={{ fontWeight: "bold" }}>Upload Image</Text>
          </View>
          <TouchableOpacity style={styles.uploadImageContainer} onPress={pickImage}>
            {!image && <AntDesign name="upload" size={36} color="black" />}
            {image && <Image source={{ uri: image }} style={styles.uploadedImage} />}
          </TouchableOpacity>
          <View style={{ width: "100%", marginTop: 10 }}>
            <Text>Rules and Requirements</Text>
          </View>
          <View style={styles.nextButtonContainer}>
            {isVerifying ?
              <ActivityIndicator /> :
              <View style={{ backgroundColor: "#045282", borderRadius: 8, display: "flex", padding: 2 }}>
                <TouchableOpacity style={styles.nextButton} onPress={() => onNextClick()}>
                  <Text style={{ color: "white", fontSize: 20 }}>Next</Text>
                  <AntDesign name="arrowright" size={24} color="white" />
                </TouchableOpacity>
              </View>
            }
          </View>
        </View>
      }
    >
    </ScreenWrapper>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    gap: 4
  },
  uploadImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "20%",
    maxHeight: "70%",
    backgroundColor: "#F2F2F2",
    borderRadius: 8
  },
  uploadText: {
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  uploadedImage: {
    width: "100%",
    aspectRatio: 3 / 4,
    resizeMode: "contain"
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  nextButtonContainer: {
    display: "flex",
    width: "100%",
    // backgroundColor: "#ff0000",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  nextButton: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingTop: 5,
    paddingRight: 15,
    paddingBottom: 5,
    paddingLeft: 15,
    alignItems: "center",
    gap: 4
  }
});