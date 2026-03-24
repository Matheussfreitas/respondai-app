import * as Keychain from 'react-native-keychain';

const TOKEN_KEY = 'respondai.token';

export async function getToken(): Promise<string | null> {
  try {
    const credentials = await Keychain.getGenericPassword({ service: TOKEN_KEY });
    if (credentials) {
      return credentials.password;
    }
  } catch {
    // noop
  }

  return null;
}

export async function saveToken(token: string): Promise<void> {
  try {
    await Keychain.setGenericPassword(TOKEN_KEY, token, { service: TOKEN_KEY });
  } catch {
    // noop
  }
}

export async function clearToken(): Promise<void> {
  try {
    await Keychain.resetGenericPassword({ service: TOKEN_KEY });
  } catch {
    // noop
  }
}
