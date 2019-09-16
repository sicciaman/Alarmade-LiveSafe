import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {Card, ListItem} from 'react-native-elements';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
    name: string,
    _id: string
}

class BuddyItem extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Card containerStyle={styles.buddy}>
              <ListItem
                //key={this.props.key}
                /*onPress={() => this.props.navigation.navigate('Device', {
                  _id: this.props._id,
                  name: this.props.name,
                  ip: this.props.ip,
                  members: this.props.members,
                })}*/
                leftAvatar={ <Icon name='user' size={30} />}
                title={this.props.name}
                rightIcon={ <Icon name='ellipsis-v' size={25} />}
              />
            </Card>
        );
    }
}

export default BuddyItem;

const styles = StyleSheet.create({
    buddy: {
      borderRadius: 50
    },
  });