import React, {Component} from 'react';
import { StyleSheet } from 'react-native';

import { Card, ListItem } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  name: string,
}
export default class DeviceItem extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Card containerStyle={styles.device}>
              <ListItem
                //key={this.props.key}
                leftAvatar={ <Icon name='video-camera' size={30} />}
                title={this.props.name}
                rightIcon={ <Icon name='ellipsis-v' size={25} />}
              />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  device: {
    borderRadius: 50
  },
});
