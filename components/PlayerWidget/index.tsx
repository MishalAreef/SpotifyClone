import React, { useEffect, useState } from 'react';
import { Text, Image, View } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import styles from './styles';
import { Song } from '../../types';
import { Asset } from 'expo-asset';
import { Sound } from 'expo-av/build/Audio';
import { TouchableOpacity } from 'react-native-gesture-handler';

const song = {
    id: '1',
    uri: 'https://www.youtube.com/watch?v=XrrmwzrJuVU',
    imageUri:'https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/The_Weeknd_-_House_of_Balloons.png/220px-The_Weeknd_-_House_of_Balloons.png',
    title: 'X-Ray',
    artist: 'The Weeknd',
}
const PlayerWidget = () => {

    const [sound, setSound] = useState<Sound|null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [duration, setDuration] = useState<number|null>(null);
    const [position, setPostion] = useState<number|null>(null);

    const onPlaybackStatusUpdate = (status) => {
        setIsPlaying(status.isPlaying);
        setDuration(status.durationMillis);
        setPostion(status.positionMillis);
    }

    const playCurrentSong = async () => {
        if (sound) {
            await sound.unloadAsync();
        }

        const { sound: newSound } = await Sound.createAsync()
        source: { uri: song.uri }
        initialStatus: { shouldPlay: isPlaying };
        onPlaybackStatusUpdate
        
        setSound(newSound)
    }

    useEffect(() => {
        //Play the song
        playCurrentSong();
    },  [])

    const onPlayPausePress = async () => {
        if (!sound) {
        return;
        }
        if (isPlaying) {
            await sound.stopAsync();
        } else {
            await sound.playAsync();
        }
    }

    const getProgress = () => {
        if (sound === null || duration === null || position === null) {
            return 0;
        }
        
        return (position / duration) * 100;
    }


    return (
        <View style={styles.container}>
            <View style={[styles.progress, { width: `${getProgress()}%`}]} />
            <View style={styles.row}>
            <Image source={{ uri: song.imageUri }} style={styles.image} />
            <View style={styles.rightContainer}>
            </View>
            
                <View style={styles.nameContainer}>
                    <Text style={styles.title}>{song.title}</Text>
                    <Text style={styles.artist}>{song.artist}</Text>
                </View>

                <View style={styles.iconsContainer}>
                    <AntDesign name="hearto" size={30} color={"white"}/>
                    <TouchableOpacity onPress={onPlayPausePress}>
                    <FontAwesome name={isPlaying ? 'pause' : 'play'} size={30} color={"white"}/>
                    </TouchableOpacity>
                    
                </View>
            </View>

            </View>
    )
}

export default PlayerWidget;