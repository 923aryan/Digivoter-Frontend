import { Text, View, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'
import React, { Component, useEffect } from 'react'
import { Redirect, Stack, useNavigation } from 'expo-router'
import ScreenWrapper from './components/HOC';
import { router } from 'expo-router';
import Toast from 'react-native-root-toast';
export default function HomeScreen() {
    const image = require('../../assets/Logo.png');
    const navigation = useNavigation()
    const handleEnrollPress = async() =>{
        router.push("/EnrollmentScreen")
    }

    const AlradyEnrolled = async() =>{
        router.push("/LoginScreen")
    }

    return (
        <ScreenWrapper children={
            <View style={styles.container}>
                <Image source={image} style={styles.image} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.enrollButton} onPress={() =>handleEnrollPress()}>
                        <Text style={[styles.buttonText, styles.enrolledButtonText]}>Enroll</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.alreadyEnorlledButton} onPress={() =>AlradyEnrolled()}>
                        <Text style={[styles.buttonText, styles.alreadyEnrolledButtonText]} >Already Enrolled</Text>
                    </TouchableOpacity>
                </View>
            </View>
        }>

        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    enrollButton: {
        backgroundColor: '#045282',
        paddingVertical: 10,
        width: '100%',
        borderRadius: 30, // Makes the button cylindrical
    },
    alreadyEnorlledButton: {
        color: '#045282',
        paddingVertical: 10,
        width: '100%',
        borderWidth: 2,
        borderColor: '#045282',
        borderRadius: 30, // Makes the button cylindrical
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
    },
    enrolledButtonText: {
        color: '#FFFFFF',
    },
    alreadyEnrolledButtonText: {
        color: '#045282',
    },
    buttonContainer: {
        width: '70%',
        display: 'flex',
        gap: 8,
        marginTop: 50
    }
});