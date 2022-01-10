import React from 'react';
import {View, Text, Image} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {MaskedText} from 'react-native-mask-text';
import styles from './cardstyle';
const CustomCard = ({title, description, price}) => {
  return (
    <Card containerStyle={{borderRadius: 15, elevation: 50}}>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
          },
        ]}>
        <View style={{flex: 5}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'SFUIDisplay-SemiBold',
              fontWeight: '900',
              textTransform: 'uppercase',
            }}>
            {description}
          </Text>
          <MaskedText
            style={{fontSize: 16, fontWeight: '900'}}
            type="currency"
            options={{
              prefix: '₱',
            }}>
            {price}
          </MaskedText>
          <Text style={{fontSize: 12, fontWeight: '900'}}></Text>
        </View>
        <View style={{flex: 3}}>
          <Image
            progressiveRenderingEnabled={true}
            style={styles.image}
            source={require('../assets/icons/spoon.png')}
          />
        </View>
      </View>
    </Card>
  );
};
export default CustomCard;
