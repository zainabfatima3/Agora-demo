import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { 
  AgoraRTCProvider, 
  useJoin, 
  useLocalCameraTrack, 
  useLocalMicrophoneTrack, 
  usePublish, 
  useRemoteAudioTracks, 
  useRemoteUsers, 
  LocalVideoTrack, 
  RemoteUser 
} from 'agora-rtc-react';

// Agora configuration
const appId = 'b998849d5d5b47d6a6616efb913ec97a';
const channelName = 'testchannel';

// Create Agora client
const agoraEngine = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

const VideoCall = () => {
  const { userType } = useParams();
  const navigate = useNavigate();

  return (
    <AgoraRTCProvider client={agoraEngine}>
      <VideoCallContent userType={userType} navigate={navigate} />
    </AgoraRTCProvider>
  );
};

const VideoCallContent = ({ userType, navigate }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // Generate a simple token (null for testing - use proper token server in production)
  const token = null;
  
  // Generate UID based on user type
  const uid = userType === 'userA' ? 1 : 2;

  // Agora hooks
  const { isLoading: isJoining, isConnected } = useJoin({
    appid: appId,
    channel: channelName,
    token: token,
    uid: uid,
  });

  // Local tracks
  const { localCameraTrack } = useLocalCameraTrack(!isVideoOff);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(!isMuted);

  // Publish local tracks
  usePublish([localMicrophoneTrack, localCameraTrack]);

  // Remote users and audio
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // Play remote audio tracks
  useEffect(() => {
    audioTracks.map((track) => track.play());
  }, [audioTracks]);

  // Update joined status
  useEffect(() => {
    setIsJoined(isConnected);
  }, [isConnected]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
  };

  const leaveCall = () => {
    navigate('/');
  };

  return (
    <div className="video-call-container">
      <div className="video-call-header">
        <h2>Video Call - {userType === 'userA' ? 'User A' : 'User B'}</h2>
        <p>Channel: {channelName}</p>
        {isJoining && <p>Joining...</p>}
        {isJoined && <p className="status-connected">Connected</p>}
      </div>

      <div className="video-container">
        {/* Local Video */}
        <div className="video-player local-video">
          <div className="video-label">You ({userType === 'userA' ? 'User A' : 'User B'})</div>
          {localCameraTrack && !isVideoOff ? (
            <LocalVideoTrack 
              track={localCameraTrack} 
              play={true} 
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <div className="video-placeholder">
              <p>Camera Off</p>
            </div>
          )}
        </div>

        {/* Remote Video */}
        <div className="video-player remote-video">
          <div className="video-label">
            Remote User {remoteUsers.length > 0 ? 
              (remoteUsers[0].uid === 1 ? '(User A)' : '(User B)') : 
              '(Waiting...)'
            }
          </div>
          {remoteUsers.length > 0 ? (
            <RemoteUser 
              user={remoteUsers[0]} 
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <div className="video-placeholder">
              <p>Waiting for remote user to join...</p>
            </div>
          )}
        </div>
      </div>

      <div className="controls">
        <button 
          className={`control-button ${isMuted ? 'muted' : ''}`}
          onClick={toggleMute}
        >
          {isMuted ? '🔇 Unmute' : '🎤 Mute'}
        </button>
        
        <button 
          className={`control-button ${isVideoOff ? 'video-off' : ''}`}
          onClick={toggleVideo}
        >
          {isVideoOff ? '📹 Turn On Video' : '📵 Turn Off Video'}
        </button>
        
        <button 
          className="control-button leave-button"
          onClick={leaveCall}
        >
          📞 Leave Call
        </button>
      </div>

      <div className="call-info">
        <p><strong>Connected Users:</strong> {isJoined ? remoteUsers.length + 1 : 0}</p>
        <p><strong>Your UID:</strong> {uid}</p>
        {remoteUsers.length > 0 && (
          <p><strong>Remote UID:</strong> {remoteUsers[0].uid}</p>
        )}
      </div>
    </div>
  );
};

export default VideoCall;