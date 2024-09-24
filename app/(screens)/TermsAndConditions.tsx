import { Text, View, Image, TextInput, Platform, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { Component, useContext, useRef } from 'react'
import { StyleSheet } from 'react-native';
import ScreenWrapper from './components/HOC';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import Toast from 'react-native-root-toast';
import { UserContext } from '../context/UserContext';
import { apiCall } from '@/_requests';
export default function TermsAndConditions() {
  const image = require('../../assets/Logo.png');

  const apiUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const toastRef = useRef<Toast | null>(null);

  const context = useContext(UserContext);
  if (!context) {
    throw new Error('UserContext must be used within a UserProvider');
  }
  const { credential, userDetails } = context;
  const showToast = (message: string) => {
    if (toastRef.current) {
      Toast.hide(toastRef.current);
    }
    toastRef.current = Toast.show(message, {
      duration: Toast.durations.LONG,
    });
  };

  const onNextClick = async () => {
    try {
      const body = {
        email: credential.email,
        password: credential.password,
        metaData: {
          firstName: userDetails.firstName,
          middleName: userDetails.middleName,
          lastName: userDetails.lastName,
          age: Number(userDetails.age),
          dateOfBirth: userDetails.DateOfBirth,
          aadharID: userDetails.aadharID,
          phoneNumber: userDetails.phoneNumber,
          picture: userDetails.image,
        }
      }
      console.log("making call to", apiUrl)
      const response = await apiCall<any>(`${apiUrl}/auth/register`, { method: 'POST', data: body },)
      console.log(response)
      showToast('Registered Successfully');
      router.push('/SuccessfullyEnrolled');

    } catch (error: any) {
      showToast(error.message || "Some error occured");
      console.log(error)
    }
  };
  return (
    <ScreenWrapper
      children={
        <View style={styles.container} >
          <Image source={image} style={styles.image} />
          <View style={styles.termsAndConditions}>
            <Text>Terms and Conditions</Text>

          </View>
          <View style={styles.nextButtonContainer}>
            <View style={{ backgroundColor: "#045282", borderRadius: 8, display: "flex", padding: 2 }}>
              <TouchableOpacity style={styles.nextButton} onPress={() => onNextClick()}>
                <Text style={{ color: "white", fontSize: 20 }}>Proceed</Text>
                <AntDesign name="arrowright" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    >
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  termsAndConditions: {
    width: "100%"
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