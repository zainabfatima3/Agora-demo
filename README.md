# Agora Video Call Demo

A simple React.js demo application for one-to-one video calling using Agora WebRTC SDK.

## Features

- **Simple User Selection**: Choose to join as "User A" or "User B"
- **Real-time Video Chat**: Connect two users in the same channel
- **Audio/Video Controls**: Mute/unmute microphone and turn camera on/off
- **Responsive Design**: Works on desktop and mobile devices
- **Minimal Setup**: No backend required for testing

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Modern web browser with WebRTC support

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Demo

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

3. To test the video call:
   - Open the application in **two separate browser windows** (or different browsers)
   - In the first window, click **"Join as User A"**
   - In the second window, click **"Join as User B"**
   - Allow camera and microphone permissions when prompted
   - You should now see each other's video!

## Configuration

### Agora Settings
- **App ID**: `b998849d5d5b47d6a6616efb913ec97a`
- **Channel Name**: `testchannel`
- **Token**: `null` (for testing purposes only)

### User IDs
- **User A**: UID = 1
- **User B**: UID = 2

## File Structure

```
src/
├── components/
│   ├── Home.jsx          # Homepage with user selection buttons
│   └── VideoCall.jsx     # Video call interface with Agora integration
├── App.jsx               # Main app component with routing
├── App.css               # Styling for the application
├── main.jsx              # React entry point
└── index.css             # Global styles
```

## Key Components

### Home Component
- Displays two buttons for user selection
- Provides instructions for testing
- Navigates to video call page with user type parameter

### VideoCall Component
- Integrates Agora WebRTC SDK
- Manages local and remote video streams
- Provides controls for mute/unmute and video on/off
- Shows connection status and user information

## Dependencies

- **react**: UI framework
- **react-dom**: React DOM rendering
- **react-router-dom**: Client-side routing
- **agora-rtc-react**: Agora React hooks and components
- **agora-rtc-sdk-ng**: Agora WebRTC SDK
- **vite**: Build tool and development server

## Important Notes

### Security & Production Use
- This demo uses a **null token** for testing purposes only
- For production use, implement proper token authentication with an Agora token server
- The App ID shown here is for demonstration - use your own Agora project credentials

### Browser Requirements
- Modern browsers with WebRTC support (Chrome, Firefox, Safari, Edge)
- HTTPS required for camera/microphone access (except on localhost)
- Allow permissions for camera and microphone when prompted

### Testing Tips
- Use two different browser windows or incognito/private browsing modes
- Ensure both users join the same channel
- Check browser console for any errors if video doesn't appear
- Make sure your camera and microphone are not being used by other applications

## Troubleshooting

1. **No video appears**: Check camera permissions and ensure camera is not in use by another app
2. **Cannot hear audio**: Check microphone permissions and browser audio settings
3. **Connection issues**: Check network connectivity and firewall settings
4. **Build errors**: Ensure all dependencies are installed with `npm install`

## Extending the Demo

To enhance this demo, consider adding:
- Screen sharing functionality
- Chat messaging
- Recording capabilities
- Multiple participant support
- User authentication
- Proper token server integration

## License

This project is for demonstration purposes. Please refer to Agora's licensing terms for production use.