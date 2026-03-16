import { initializeApp, getApp, getApps } from 'firebase/app';
import { 
  initializeAuth, 
  getAuth, 
  //@ts-ignore
  getReactNativePersistence 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBVMUHq3oaSJOlQCvvXHU6c1C46Do2DYl4',
  authDomain: 'supersimplenotes-b85d5.firebaseapp.com',
  projectId: 'supersimplenotes-b85d5',
  storageBucket: 'supersimplenotes-b85d5.firebasestorage.app',
  messagingSenderId: '165223679073',
  appId: '1:165223679073:web:94f1f8d4e73e52c5c4d620',
  measurementId: 'G-82CBV8N3GG',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication with appropriate persistence
let firebaseAuth;

if (Platform.OS === 'web') {
  firebaseAuth = getAuth(app);
} else {
  // For React Native (iOS/Android), use AsyncStorage persistence
  // Note: Ensure 'react-native-get-random-values' is installed and imported in your entry point
  firebaseAuth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

export const auth = firebaseAuth;

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
