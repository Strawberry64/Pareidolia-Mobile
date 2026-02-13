import AsyncStorage from '@react-native-async-storage/async-storage';
import { File, Paths, Directory } from 'expo-file-system/next';

const PROFILE_KEY = 'selectedProfile';
const VIDEOS_KEY = 'profileVideos';
const PROFILES_LIST_KEY = 'profilesList';

export const setSelectedProfile = async (profile: string) => {
  await AsyncStorage.setItem(PROFILE_KEY, profile);
};

export const getSelectedProfile = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(PROFILE_KEY);
};

export const getProfileVideos = async (profile: string): Promise<string[]> => {
  const json = await AsyncStorage.getItem(VIDEOS_KEY);
  const all = json ? JSON.parse(json) : {};
  return all[profile] || [];
};

export const addProfileVideo = async (profile: string, uri: string) => {
    const fileName = `${Date.now()}_${uri.split('/').pop()}`;
    const dest = new File(Paths.document, fileName);
    const source = new File(uri);
    source.copy(dest);

    // Delete the ImagePicker temp file and its parent directory
    try {
        const parentDir = source.parentDirectory;
        if (parentDir.exists) {
            parentDir.delete();
        }
    } catch (e) {
        console.warn('Failed to delete ImagePicker temp directory:', e);
    }

    const savedUri = dest.uri;

    const json = await AsyncStorage.getItem(VIDEOS_KEY);
    const all = json ? JSON.parse(json) : {};
    all[profile] = [savedUri, ...(all[profile] || [])];
    await AsyncStorage.setItem(VIDEOS_KEY, JSON.stringify(all));
};

export const removeProfileVideo = async (profile: string, uri: string) => {
    const json = await AsyncStorage.getItem(VIDEOS_KEY);
    const all = json ? JSON.parse(json) : {};
    all[profile] = (all[profile] || []).filter((v: string) => v !== uri);
    await AsyncStorage.setItem(VIDEOS_KEY, JSON.stringify(all));

    try {
        const file = new File(uri);
        console.log(`File URI: ${uri}`);
        console.log(`File exists: ${file.exists}`);
        if (file.exists) {
            file.delete();
            console.log(`Deleted video file successfully`);
        } else {
            console.warn(`File does not exist at: ${uri}`);
        }
    } catch (error) {
        console.warn('Failed to delete video file:', error);
    }
};

export const getProfiles = async (): Promise<string[]> => {
  const json = await AsyncStorage.getItem(PROFILES_LIST_KEY);
  return json ? JSON.parse(json) : ['Model 1', 'Model 2'];
};

export const addProfile = async (name: string) => {
  const profiles = await getProfiles();
  if (!profiles.includes(name)) {
    profiles.push(name);
    await AsyncStorage.setItem(PROFILES_LIST_KEY, JSON.stringify(profiles));
  }
};

export const removeProfile = async (name: string) => {
  const profiles = await getProfiles();
  const filtered = profiles.filter(p => p !== name);
  await AsyncStorage.setItem(PROFILES_LIST_KEY, JSON.stringify(filtered));
};

export const clearTempFiles = () => {
    try {
        const cacheDir = new Directory(Paths.cache);
        // if (cacheDir.exists) {
        //     for (const item of cacheDir.list()) {
        //         try {
        //             // Only delete video files, not cached fonts/assets
        //             if (item instanceof File) {
        //                 const name = item.uri.split('/').pop() || '';
        //                 if (name.endsWith('.mov') || name.endsWith('.mp4')) {
        //                     item.delete();
        //                 }
        //             }
        //             // Delete ImagePicker temp directories
        //             if (item instanceof Directory) {
        //                 const name = item.uri.split('/').pop() || '';
        //                 if (name.startsWith('ImagePicker')) {
        //                     item.delete();
        //                 }
        //             }
                    
        //         } catch (e) {
        //             // skip items that can't be deleted
        //         }
        //     }
        // }
    } catch (e) {
        console.warn('Failed to clear cache:', e);
    }
};