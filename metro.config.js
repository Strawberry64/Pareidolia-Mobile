const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add .tflite file support
config.resolver.assetExts.push('tflite');

module.exports = config;
