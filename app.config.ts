import { ExpoConfig } from 'expo/config';

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
    name: "scrum-poker",
    slug: "scrum-poker",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    updates: {
        fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
        "**/*"
    ],
    ios: {
        supportsTablet: true
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#FFFFFF"
        },
        package: "com.bitran.scrumpoker"
    },
    web: {
        favicon: "./assets/images/favicon.png"
    },
    extra: {
        eas: {
            projectId: "e22f4d42-d93a-40ca-b9f1-fc77a4b2858b"
        }
    }
};

export default config;