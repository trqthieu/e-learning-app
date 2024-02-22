import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({ videoSource }) => {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoSource }}
        style={styles.video}
        resizeMode="contain"
        controls={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default VideoPlayer;