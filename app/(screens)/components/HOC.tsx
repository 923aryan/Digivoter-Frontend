import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, ScrollView, View } from "react-native";
import { StyleSheet } from "react-native";

type ScreenWrapperProps = {
    children: React.ReactNode
}
const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
    return (
        <LinearGradient
            colors={['rgba(255, 153, 51, 0.6)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(0, 128, 0, 0.6)']}
            locations={[0, 0.2, 0.7, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientBackground}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.childContainer}>
                    {children}
                </View>
            </ScrollView>
        </LinearGradient>

    );
};


export default ScreenWrapper;

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        paddingHorizontal: 10,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingVertical: 20
    },
    childContainer: {
        width: "100%",
        height: "100%"
    },
});