import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import React from 'react';

// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.

const VideoPlayer = ({ uri }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  console.log('uri', uri);
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
};

// Later on in your styles..
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttons: {
    margin: 16,
  },
});
export default VideoPlayer;
