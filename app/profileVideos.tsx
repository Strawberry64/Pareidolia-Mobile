import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addProfileVideo, getProfileVideos, removeProfileVideo } from "../hooks/useVideoStorage";

function VideoPlayer({ uri, toggle, selected, onPress }: { uri: string; toggle: boolean; selected: boolean; onPress: () => void }) {
  const player = useVideoPlayer(uri, (p) => {
    p.loop = true;
  });

  return (
    <View style={{ position: 'relative' }}>
      <VideoView
        player={player}
        style={{ width: '100%', height: 200 }}
        contentFit="cover"
        nativeControls={!toggle}
      />
      {toggle && (
        <TouchableOpacity
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          onPress={onPress}
          activeOpacity={0.7}
        />
)}
      {toggle && (
        <TouchableOpacity
          onPress={onPress}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#ffffff',
            backgroundColor: selected ? '#0bef16' : 'transparent',
          }}
        />
      )}
    </View>
  );
}

export default function ProfileVideos() {
  const { profile } = useLocalSearchParams<{ profile: string }>();
  const [videos, setVideos] = useState<string[]>([]);
  const [toggle, setToggle] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      setVideos(await getProfileVideos(profile));
    })();
  }, [profile]);

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      await addProfileVideo(profile, result.assets[0].uri);
      setVideos(await getProfileVideos(profile));
    }
  };

  const handleRemove = async (uri: string) => {
    await removeProfileVideo(profile, uri);
    setVideos(await getProfileVideos(profile));
    setSelectedVideos((prev) => {
      const next = new Set(prev);
      next.delete(uri);
      return next;
    });
  };

  const handleAlternateAction = (uri: string) => {
    setSelectedVideos((prev) => {
      if (prev.has(uri)) {
        const newSet = new Set(prev);
        newSet.delete(uri);
        return newSet;
      } else {
        const newSet = new Set(prev);
        newSet.add(uri);
        return newSet;
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <Text style={{ color: "#fff", fontSize: 24, textAlign: "center", margin: 20 }}>
        {profile} Videos
      </Text>
      <Button title="Add Video" onPress={pickVideo} />
      <Button title={`Toggle Controls (${toggle ? "On" : "Off"})`} onPress={() => setToggle((prev) => !prev)} />
      <Button title="Print Selected" onPress={() => console.log([...selectedVideos])} />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {videos.length === 0 ? (

          <Text style={{ color: "#fff", textAlign: "center" }}>No videos found.</Text>

        ) : (

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {videos.map((uri) => (
              <View
                key={uri}
                style={{ width: '48%', marginBottom: 16, backgroundColor: '#111', borderRadius: 8, overflow: 'hidden' }}
              >
                <VideoPlayer uri={uri} toggle={toggle} selected={selectedVideos.has(uri)} onPress={() => handleAlternateAction(uri)} />
                <TouchableOpacity onPress={() => handleRemove(uri)} style={{ marginTop: 8 }}>
                  <Text style={{ color: '#ff4444', textAlign: 'center' }}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          
        )}
      </ScrollView>

    </SafeAreaView>
  );
}
