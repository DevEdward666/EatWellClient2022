import React from 'react';
import {View, Text, Image} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {MaskedText} from 'react-native-mask-text';
import styles from './cardstyle';
const CardCart = ({title, description, price, qty, subtotal}) => {
  return (
    <Card containerStyle={{marginBottom: -14, borderRadius: 15, elevation: 30}}>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
          },
        ]}>
        <View style={{flex: 5}}>
          <View
            style={[
              styles.container,
              {
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}>
            <View style={{flex: 5}}>
              <Card
                containerStyle={{
                  height: 50,
                  textAlign: 'center',
                  elevation: 5,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {qty}
                </Text>
              </Card>
            </View>
            <View style={{flex: 8}}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}>
                {description}
              </Text>
            </View>
            <View style={{flex: 3}}>
              <MaskedText
                style={{fontSize: 12, fontWeight: 'bold', textAlign: 'left'}}
                type="currency"
                options={{
                  prefix: ' ₱',
                }}>
                {price}
              </MaskedText>
            </View>
            <View style={{flex: 3}}>
              <MaskedText
                style={{fontSize: 12, fontWeight: 'bold', textAlign: 'left'}}
                type="currency"
                options={{
                  prefix: ' ₱',
                }}>
                {subtotal}
              </MaskedText>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};
export default CardCart;
