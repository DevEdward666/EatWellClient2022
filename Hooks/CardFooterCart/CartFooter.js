import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {MaskedText} from 'react-native-mask-text';
import styles from './cardstyle';
const CartFooter = ({subtotal, Total}) => {
  return (
    <Card containerStyle={{marginBottom: 100, borderRadius: 15, elevation: 30}}>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
            padding: 20,
          },
        ]}>
        <View style={{flex: 5}}>
          <View
            style={[
              styles.container,
              {
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10,
              },
            ]}>
            <View style={{flex: 8}}>
              <Text style={{fontSize: 16}}>Subtotal</Text>
            </View>
            <View style={{flex: 3}}>
              <MaskedText
                style={{fontSize: 16, fontWeight: 'bold', textAlign: 'left'}}
                type="currency"
                options={{
                  prefix: ' ₱',
                }}>
                {subtotal}
              </MaskedText>
            </View>
          </View>
          <View
            style={[
              styles.container,
              {
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10,
              },
            ]}>
            <View style={{flex: 8}}>
              <Text style={{fontSize: 16}}>
                Total<Text style={{fontSize: 8}}>(incl. VAT)</Text>
              </Text>
            </View>
            <View style={{flex: 3}}>
              <MaskedText
                style={{fontSize: 16, fontWeight: 'bold', textAlign: 'left'}}
                type="currency"
                options={{
                  prefix: ' ₱',
                }}>
                {Total}
              </MaskedText>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};
export default CartFooter;
