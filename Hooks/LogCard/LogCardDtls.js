import React from 'react';
import {View, Text, Image} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {MaskedText} from 'react-native-mask-text';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './cardstyle';
const LogCardDtls = ({title, description, qty, price, total}) => {
  return (
    <>
      <Card containerStyle={{borderRadius: 10, elevation: 3}}>
        <View
          style={[
            styles.containerlogcard,
            {
              flexDirection: 'row',
            },
          ]}>
          <View style={{flex: 5}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '900',
                textTransform: 'uppercase',
              }}>
              {description}
            </Text>
          </View>
          <View style={{flex: 3}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '900',
                textTransform: 'uppercase',
              }}>
              {qty}
            </Text>
          </View>
          <View style={{flex: 3}}>
            <MaskedText
              style={{fontSize: 12, fontWeight: 'bold', textAlign: 'right'}}
              type="currency"
              options={{
                prefix: '₱',
              }}>
              {price}
            </MaskedText>
          </View>
          <View style={{flex: 5}}>
            <MaskedText
              style={{fontSize: 12, fontWeight: 'bold', textAlign: 'right'}}
              type="currency"
              options={{
                prefix: '₱',
              }}>
              {total}
            </MaskedText>
          </View>
        </View>
      </Card>
    </>
  );
};
export default LogCardDtls;
