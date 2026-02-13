// import { ResizeMode, Video } from "expo-av";
// import * as ImagePicker from "expo-image-picker";
// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";
// import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { addProfileVideo, getProfileVideos, removeProfileVideo } from "../../hooks/useVideoStorage";
// import { ResizeMode, Video } from "expo-av";
// import * as ImagePicker from "expo-image-picker";
// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";
// import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { addProfileVideo, getProfileVideos, removeProfileVideo } from "../../hooks/useVideoStorage";

// export default function ProfileVideos() {
//   const { profile } = useLocalSearchParams<{ profile: string }>();
//   const [videos, setVideos] = useState<string[]>([]);

//   useEffect(() => {
//     (async () => {
//       setVideos(await getProfileVideos(profile));
//     })();
//   }, [profile]);

//   const pickVideo = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ["videos"],
//       allowsEditing: false,
//       quality: 1,
//     });
//     if (!result.canceled && result.assets && result.assets[0].uri) {
//       await addProfileVideo(profile, result.assets[0].uri);
//       setVideos(await getProfileVideos(profile));
//     }
//   };

//   const handleRemove = async (uri: string) => {
//     await removeProfileVideo(profile, uri);
//     setVideos(await getProfileVideos(profile));
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
//       <Text style={{ color: "#fff", fontSize: 24, textAlign: "center", margin: 20 }}>
//         {profile} Videos
//       </Text>
//       <Button title="Add Video" onPress={pickVideo} />
//       <ScrollView contentContainerStyle={{ padding: 20 }}>
//         <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
//           {videos.map((uri) => (
//             <View key={uri} style={{ width: "48%", marginBottom: 16 }}>
//               <Video
//                 source={{ uri }}
//                 style={{ width: "100%", height: 120, borderRadius: 8 }}
//                 useNativeControls
//                 resizeMode={ResizeMode.COVER}
//               />
//               <TouchableOpacity onPress={() => handleRemove(uri)}>
//                 <Text style={{ color: "red", marginTop: 8, textAlign: "center" }}>Remove</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
// export default function ProfileVideos() {
//   const { profile } = useLocalSearchParams<{ profile: string }>();
//   const [videos, setVideos] = useState<string[]>([]);

//   useEffect(() => {
//     (async () => {
//       setVideos(await getProfileVideos(profile));
//     })();
//   }, [profile]);

//   const pickVideo = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ["videos"],
//       allowsEditing: false,
//       quality: 1,
//     });
//     if (!result.canceled && result.assets && result.assets[0].uri) {
//       await addProfileVideo(profile, result.assets[0].uri);
//       setVideos(await getProfileVideos(profile));
//     }
//   };

//   const handleRemove = async (uri: string) => {
//     await removeProfileVideo(profile, uri);
//     setVideos(await getProfileVideos(profile));
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
//       <Text style={{ color: "#fff", fontSize: 24, textAlign: "center", margin: 20 }}>
//         {profile} Videos
//       </Text>
//       <Button title="Add Video" onPress={pickVideo} />
//       <ScrollView contentContainerStyle={{ padding: 20 }}>
//         <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
//           {videos.map((uri) => (
//             <View key={uri} style={{ width: "48%", marginBottom: 16 }}>
//               <Video
//                 source={{ uri }}
//                 style={{ width: "100%", height: 120, borderRadius: 8 }}
//                 useNativeControls
//                 resizeMode={ResizeMode.COVER}
//               />
//               <TouchableOpacity onPress={() => handleRemove(uri)}>
//                 <Text style={{ color: "red", marginTop: 8, textAlign: "center" }}>Remove</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }