import React from 'react';
import {View, Text, Image} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {MaskedText} from 'react-native-mask-text';
import styles from './cardstyle';
const LogCard = ({title, description, price, color = 'white'}) => {
  return (
    <Card containerStyle={{borderRadius: 15, elevation: 50}}>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
          },
        ]}>
        <View
          style={{
            flex: 0.2,
            backgroundColor: color,
            justifyContent: 'flex-start',
            marginEnd: 5,
          }}></View>
        <View>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}>
            Order No
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '900',
              textTransform: 'uppercase',
            }}>
            {description}
          </Text>
        </View>

        <View style={{flex: 8}}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              textAlign: 'right',
              textTransform: 'uppercase',
            }}>
            Total
          </Text>
          <MaskedText
            style={{fontSize: 16, fontWeight: 'bold', textAlign: 'right'}}
            type="currency"
            options={{
              prefix: '₱',
            }}>
            {price}
          </MaskedText>
        </View>
      </View>
    </Card>
  );
};
export default LogCard;
