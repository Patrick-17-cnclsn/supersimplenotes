const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Force Metro to look for modules in the current project's node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
];

// Reanimated 4 and Worklets need explicit resolution sometimes on Windows
config.resolver.extraNodeModules = {
  'react-native-worklets': path.resolve(__dirname, 'node_modules/react-native-worklets'),
};

module.exports = withNativeWind(config, { input: './global.css' });
