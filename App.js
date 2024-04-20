import React, { Component } from 'react';
import { View } from 'react-native';
import RNVideoProcessing from 'react-native-video-processing'

class App extends Component {
    trimVideo() {
        const options = {
            startTime: 0,
            endTime: 15,
        };
        this.videoPlayerRef.trim(options)
            .then((newSource) => console.log(newSource))
            .catch(console.warn);
    }

    compressVideo() {
        const options = {
            width: 720,
            height: 1280,
            bitrateMultiplier: 3,
            minimumBitrate: 300000,
            removeAudio: true, // default is false
        };
        this.videoPlayerRef.compress(options)
            .then((newSource) => console.log(newSource))
            .catch(console.warn);
    }

    getVideoInfo() {
        this.videoPlayerRef.getVideoInfo()
        .then((info) => console.log(info))
        .catch(console.warn);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <RNVideoProcessing.VideoPlayer
                    ref={ref => this.videoPlayerRef = ref}
                    source={require('./assets/video.mp4')}
                    startTime={30}  // seconds
                    endTime={120}   // seconds
                    play={true}     // default false
                    replay={true}   // should player play video again if it's ended
                    resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
                    onChange={({ nativeEvent }) => console.log({ nativeEvent })} // get Current time on every second
                />
                <RNVideoProcessing.Trimmer
                    source={require('./assets/video.mp4')}
                    height={100}
                    width={300}
                    onChange={(e) => console.log(e.startTime, e.endTime)}
                />
            </View>
        );
    }
}

export default App