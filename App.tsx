import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { THEME } from './src/styles/theme';
import { AuthContextProvider } from "./src/contexts/AuthContext";

import { Loading } from './src/components/Loading';

import { SignIn } from './src/pages/SignIn';
import { New } from "./src/pages/New";
import { Find } from "./src/pages/Find";
import { Pools } from "./src/pages/Pools";

export default function App() {
  const [fontsLoading] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {!fontsLoading ? <Loading /> : <Pools />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}