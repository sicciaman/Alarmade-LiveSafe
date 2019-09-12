import React, {Component} from 'react';
import { StyleSheet } from 'react-native';

import { Card, ListItem } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  name: string,
  ip: string,
  _id: string,
  members: []
}
class DeviceItem extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Card containerStyle={styles.device}>
              <ListItem
                //key={this.props.key}
                onPress={() => this.props.navigation.navigate('Device', {
                  _id: this.props._id,
                  name: this.props.name,
                  ip: this.props.ip,
                  members: this.props.members,
                })}
                leftAvatar={ <Icon name='video-camera' size={30} />}
                title={this.props.name}
                subtitle={this.props.ip}
                rightIcon={ <Icon name='ellipsis-v' size={25} />}
              />
      </Card>
    )
  }
}

export default withNavigation(DeviceItem);

const styles = StyleSheet.create({
  device: {
    borderRadius: 50
  },
});
