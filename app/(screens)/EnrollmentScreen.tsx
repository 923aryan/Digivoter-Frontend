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

interface EnrollmentDetails {
    firstName: string,
    middleName: string,
    lastName: string,
    DateOfBirth: Date,
    age: string,
    aadharID: string,
    phoneNumber: string
}
export default function EnrollmentScreen() {

    const image = require('../../assets/Logo.png');
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('UserContext must be used within a UserProvider');
    }
    const { userDetails, setUserDetails } = context;
    const [date, setDate] = useState(new Date(1598051730000));
    const toastRef = useRef<Toast | null>(null);
    const [details, setDetails] = useState<EnrollmentDetails>({
        firstName: '',
        middleName: '',
        lastName: '',
        DateOfBirth: new Date(1598051730000),
        age: '',
        aadharID: '',
        phoneNumber: ''
    });

    const [isVerifying, setIsVerifying] = useState<boolean>(false)



    const handleOnChange = (key: keyof EnrollmentDetails, value: string) => {
        setDetails((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        handleOnChange('DateOfBirth', currentDate)
    };

    const showDatepicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: "date",
            is24Hour: true,
        });
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
        if (!details.firstName.trim()) {
            showToast('First name is required.');
            return false;
        }
        if (!details.middleName.trim()) {
            showToast('Middle name is required.');
            return false;
        }
        if (!details.lastName.trim()) {
            showToast('Last name is required.');
            return false;
        }
        if (!details.DateOfBirth.toDateString().trim()) {
            showToast('Date of birth is required.');
            return false;
        }
        if (!details.age.trim()) {
            showToast('Age is required.');
            return false;
        }

        // Validate Aadhar number
        if (!details.aadharID.trim() || details.aadharID.trim().length !== 12) {
            showToast('Aadhar No. must be a 12-digit number.');
            return false;
        }

        // Validate phone number
        if (!details.phoneNumber.trim()) {
            showToast('Phone no. is required.');
            return false;
        }

        return true;
    };

    const onNextClick = async () => {
        setIsVerifying(true);
        const isDetailsCorrect = await validateFields();

        if (isDetailsCorrect) {
            setUserDetails((prev) => ({
                ...details,
                image: userDetails.image,
            }));
            router.push('/ImageUploadScreen');
        }

        setIsVerifying(false);
    };

    useEffect(() => {
        console.log("getting", userDetails)
        setDetails(userDetails)
    }, [userDetails])
    return (
        <ScreenWrapper
            children={
                <View style={styles.container} >
                    <Image source={image} style={styles.image} />
                    <View style={styles.inputDetailsContainer}>
                        <View style={styles.labelAndInput}>
                            <Text style={{ color: "#000000", fontWeight: "500" }}>First Name</Text>
                            <TextInput value={details.firstName} onChangeText={(text) => handleOnChange('firstName', text)} style={styles.input} placeholderTextColor={"#2A2A2A"} placeholder='Enter your first name' />
                        </View>
                        <View style={styles.labelAndInput}>
                            <Text style={{ color: "#000000", fontWeight: "500" }}>Middle Name</Text>
                            <TextInput value={details.middleName} onChangeText={(text) => handleOnChange('middleName', text)} style={styles.input} placeholderTextColor={"#2A2A2A"} placeholder='Enter your middle name' />
                        </View>
                        <View style={styles.labelAndInput}>
                            <Text style={{ color: "#000000", fontWeight: "500" }}>Last Name</Text>
                            <TextInput value={details.lastName} onChangeText={(text) => handleOnChange('lastName', text)} style={styles.input} placeholderTextColor={"#2A2A2A"} placeholder='Enter your last name' />
                        </View>
                        <View style={styles.labelAndInput}>
                            <Text style={{ color: "#000000", fontWeight: "500" }}>Date of Birth</Text>
                            <TextInput value={details.DateOfBirth.toDateString()} onPress={() => showDatepicker()} style={styles.input} placeholderTextColor={"#2A2A2A"} placeholder='Select your date of birth' />
                        </View>
                        <View style={styles.labelAndInput}>
                            <Text style={{ color: "#000000", fontWeight: "500" }}>Age</Text>
                            <TextInput value={details.age} onChangeText={(text) => handleOnChange('age', text)} style={styles.input} placeholderTextColor={"#2A2A2A"} placeholder='Enter your age' />
                        </View>
                        <View style={styles.labelAndInput}>
                            <Text style={{ color: "#000000", fontWeight: "500" }}>Aadhar No.</Text>
                            <TextInput value={details.aadharID} onChangeText={(text) => handleOnChange('aadharID', text)} style={styles.input} placeholderTextColor={"#2A2A2A"} placeholder='Enter your 12 digit aadhar Id' />
                        </View>
                        <View style={styles.labelAndInput}>
                            <Text style={{ color: "#000000", fontWeight: "500" }}>Phone no.</Text>
                            <TextInput value={details.phoneNumber} onChangeText={(text) => handleOnChange('phoneNumber', text)} style={styles.input} placeholderTextColor={"#2A2A2A"} placeholder='Enter your phone number' />
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
    calendar: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
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