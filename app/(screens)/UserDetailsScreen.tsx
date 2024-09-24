import { Text, View, Image, TextInput, Platform, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { Component, useContext, useEffect, useRef, useState } from 'react'
import ScreenWrapper from './components/HOC'
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../context/UserContext';
import Toast from 'react-native-root-toast';
import { router, useLocalSearchParams } from 'expo-router';

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
export default function ImageUploadScreen() {
    const response = useLocalSearchParams();
    console.log("got", response)
    const [image, setImage] = useState<null | string>(null);
    const logo = require('../../assets/Logo.png');
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('UserContext must be used within a UserProvider');
    }
    const { loggedInUser } = context;
    useEffect(() => {
        if (loggedInUser) {
            setImage(loggedInUser.user_metadata.picture)
            console.log("got ias", loggedInUser.user_metadata.picture)
        }
    }, [loggedInUser])


    if (!loggedInUser) {
        return <ActivityIndicator />
    }
    return (
        <ScreenWrapper
            children={
                <View style={styles.container}>
                    <Image source={logo} style={styles.image} />
                    <View style={styles.text}>
                        <Text style={{ fontWeight: "500", fontSize: 32 }}>User Info</Text>
                    </View>
                    <TouchableOpacity style={styles.uploadImageContainer} >
                        {image && <Image source={{ uri: loggedInUser.user_metadata.picture }} style={styles.uploadedImage} />}
                    </TouchableOpacity>
                    <View style={{ width: "100%", marginTop: 10, gap: 10 }}>
                        <Text style={{ fontSize: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>Name: </Text>
                            <Text style={{ fontWeight: '500' }}>
                                {loggedInUser.user_metadata.firstName} {loggedInUser.user_metadata.lastName}
                            </Text>
                        </Text>
                        <Text style={{ fontSize: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>Aadhaar ID: </Text>
                            <Text style={{ fontWeight: '500' }}>{loggedInUser.user_metadata.aadharID}</Text>
                        </Text>
                        <Text style={{ fontSize: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>DOB: </Text>
                            <Text style={{ fontWeight: '500' }}>{formatDate(loggedInUser.user_metadata.dateOfBirth)}</Text>
                        </Text>
                        <Text style={{ fontSize: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>Status: </Text>
                            <Text style={{ fontWeight: '500', color: loggedInUser.user_metadata.isVerified ? "#009F00" : "#000000" }}>
                                {loggedInUser.user_metadata.isVerified ? "Accepted" : "Pending"}
                            </Text>
                        </Text>

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

    },
    text: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    uploadedImage: {
        width: "50%",
        aspectRatio: 3 / 4,
        resizeMode: "contain",
        borderWidth: 1,
        borderColor: "#d9d9d9",
    },
});