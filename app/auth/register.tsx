import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { toast } from 'sonner-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { useAuth } from '@/core/context/AuthContext';
import { COLORS } from '@/core/theme/colors';
import { useThemeColors } from '@/core/hooks/useThemeColors';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const colors = useThemeColors();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
      toast.success('Compte créé avec succès !');
      router.replace('/');
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.logo, { color: colors.text }]}>
              noty<Text style={styles.dot}>.</Text>
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Rejoignez Super Simple Notes
            </Text>
          </View>

          <View style={styles.form}>
            <View style={[styles.inputContainer, { backgroundColor: colors.secondary }]}>
              <Ionicons name="mail-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Email"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: colors.secondary }]}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Mot de passe"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: colors.secondary }]}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Confirmer le mot de passe"
                placeholderTextColor={colors.textSecondary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <Button
              title={loading ? 'Inscription...' : "S'inscrire"}
              onPress={handleRegister}
              loading={loading}
              className="mt-2"
              rounded="full"
              variant="highlight"
              size="medium"
            />

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => router.back()}>
              <Text style={[styles.linkText, { color: colors.textSecondary }]}>
                Déjà un compte ? <Text style={styles.linkTextBold}>Connectez-vous</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  dot: {
    color: '#00A6F4',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 12,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
  },
  linkButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
  },
  linkTextBold: {
    color: '#00A6F4',
    fontWeight: '600',
  },
});

