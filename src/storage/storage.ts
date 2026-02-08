import { createMMKV } from 'react-native-mmkv';

/**
 * ✅ Official README-compatible
 * ✅ Cross-platform
 * ✅ Stable
 */
export const storage = createMMKV({
  id: 'user-storage',
  encryptionKey: 'hunter2', // optional
});
