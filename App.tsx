import React, { useState } from 'react';
import { Button, Linking, StyleSheet, Modal, View } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import WebView from 'react-native-webview';

const WEB_PAGE_URL = 'https://www.apple.com/legal/privacy';

const App = () => {
  const [visible, setVisible] = useState(false);

  const openLinkInBrowserHandler = () => {
    Linking.canOpenURL(WEB_PAGE_URL).then((supported) => {
      supported && Linking.openURL(WEB_PAGE_URL);
    });
  };

  const openLinkInWebView = () => setVisible(true);

  const openLinkInAppBrowser = () => {
    InAppBrowser.isAvailable()
      .then(() => {
        return InAppBrowser.open(WEB_PAGE_URL, {
          // iOS Properties
          animated: true,
          modalEnabled: true,
          // Android Properties
          showTitle: true,
        });
      })
      .catch((_) => openLinkInBrowserHandler());
  };

  return (
    <View style={styles.container}>
      <Button
        title={'Open link in Browser'}
        onPress={openLinkInBrowserHandler}
      />
      <View style={styles.separator} />
      <Button title={'Open link in WebView'} onPress={openLinkInWebView} />
      <View style={styles.separator} />
      <Button
        title={'Open link in InAppBrowser'}
        onPress={openLinkInAppBrowser}
      />
      <Modal
        visible={visible}
        presentationStyle={'pageSheet'}
        animationType={'slide'}
        onRequestClose={() => setVisible(!visible)}
      >
        <WebView source={{ uri: WEB_PAGE_URL }} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 20,
  },
});

export default App;
