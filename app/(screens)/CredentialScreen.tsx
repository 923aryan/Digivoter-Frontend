import { Text, View, Image, TextInput, Platform, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { Component, useContext, useEffect, useRef, useState } from 'react'
import ScreenWrapper from './components/HOC'
import { StyleSheet } from 'react-native'
import * as Calendar from 'expo-calendar';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';
import { UserContext } from '../context/UserContext';

interface Credential {
    email: string,
    password: string
}
export default function CredentialScreen() {

    const image = require('../../assets/Logo.png');
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('UserContext must be used within a UserProvider');
    }
    const { credential, setCredential } = context;
    const toastRef = useRef<Toast | null>(null);

    const [details, setDetails] = useState<Credential>({
        email: '',
        password: ''
    });

    const [confirmPassword,setConfirmPassword] = useState<string>('')

    const [isVerifying, setIsVerifying] = useState<boolean>(false)



    const handleOnChange = (key: keyof Credential, value: string) => {
        setDetails((prev) => ({
            ...prev,
            [key]: value,
        }));
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
        if (!details.email.trim()) {
            showToast('Email is required.');
            return false;
        }
        if (!details.password.trim()) {
            showToast('Password is required.');
            return false;
        }

        if(details.password !== confirmPassword){
            showToast('Passwords did not matched');
            return false
        }
        
        return true;
    };

    const onNextClick = async () => {
        setIsVerifying(true);
        const isDetailsCorrect = await validateFields();

        if (isDetailsCorrect) {
            setCredential((prev) => ({
                ...details,
            }));
            router.push('/TermsAndConditions');
        }

        setIsVerifying(false);
    };

    useEffect(() => {
        console.log("getting", credential)
        setDetails(credential)
    }, [credential])


    return (
        <ScreenWrapper
            children={
                <View style={styles.container} >
                    <Image source={image} style={styles.image} />
                    <View style={styles.inputDetailsContainer}>
                        <View style={styles.labelAndInput}>
                            <Text style={{ color: "#000000", fontWeight: "500" }}>Email</Text>
                            <TextInput value={details.email} onChangeText={(text) => handleOnChange('email', text)} style={styles.input} placeholderTextColor={"#2A2A2A"} placeholder='Enter your email' />
                        </View>
                        <View style={styles.labelAndInput}>
                            <Text style={{ color: "#000000", fontWeight: "500" }}>Password</Text>
                            <TextInput value={details.password} onChangeText={(text) => handleOnChange('password', text)} style={styles.input} placeholderTextColor={"#2A2A2A"} placeholder='Enter password' />
                        </View>
                        <View style={styles.labelAndInput}>
                            <Text style={{ color: "#000000", fontWeight: "500" }}>Confirm Password</Text>
                            <TextInput value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} style={styles.input} placeholderTextColor={"#2A2A2A"} placeholder='Enter password' />
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

                </View>
            }
        ></ScreenWrapper>
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
    inputDetailsContainer: {
        width: '90%',
        display: 'flex',
        gap: 8
    },
    labelAndInput: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
        marginTop: 6
    },
    label: {

    },
    input: {
        backgroundColor: "#F2F2F2",
        padding: 8,
        borderRadius: 8,
        color: "#000000"
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