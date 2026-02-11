import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCodeScanner } from 'react-native-vision-camera';

export default function CameraScreen() {
    const [mediaUri, setMediaUri] = useState<string | null>(null);
    const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
    const [prediction, setPrediction] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            console.log(`Scanned ${codes.length} codes!`)
        }
    });

    useEffect(() => {
        (async () => {
            await ImagePicker.requestCameraPermissionsAsync();
        })();
    }, []);

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            setMediaUri(result.assets[0].uri);
            setMediaType('image');
            setPrediction(null);
            // await classifyImage(result.assets[0].uri);
        }
    };

    const takeVideo = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['videos'],
            allowsEditing: true,
            quality: 1,
            videoMaxDuration: 60,
        });

        if (!result.canceled) {
            setMediaUri(result.assets[0].uri);
            setMediaType('video');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <View style={styles.container}>
            <Text style={styles.title}>Flower Classifier</Text>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                    <Text style={styles.buttonText}>📷 Take Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={takeVideo}>
                    <Text style={styles.buttonText}>🎥 Record Video</Text>
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="large" color="#8FD49D" style={styles.loader} />}

            {mediaUri && (
                <View style={styles.previewContainer}>
                    {mediaType === 'image' ? (
                        <>
                            <Image source={{ uri: mediaUri }} style={styles.preview} />
                            {prediction && (
                                <Text style={styles.predictionText}>{prediction}</Text>
                            )}
                        </>
                    ) : (
                        <Text style={styles.videoText}>Video recorded: {mediaUri}</Text>
                    )}
                </View>
            )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    container: {
        flex: 1, 
        justifyContent: 'center',  
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#fff',
    },
    modelStatus: {
        color: '#8FD49D',
        fontSize: 14,
        marginBottom: 20,
    },
    buttonContainer: {
        gap: 16,
        width: '100%',
        maxWidth: 300,
    },
    button: {
        backgroundColor: '#8FD49D',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#8FD49D',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    previewContainer: {
        marginTop: 32,
        width: '100%',
        alignItems: 'center',
    },
    preview: {
        width: 300,
        height: 300,
        borderRadius: 12,
    },
    videoText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    loader: {
        marginTop: 20,
    },
    predictionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#8FD49D',
        marginTop: 16,
        textAlign: 'center',
    },
});