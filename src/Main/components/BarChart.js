import React from 'react';
import { View, Text } from 'react-native';

/**
 * @params data: Array<number>
 * @params height: number
 * @params title: string
 */
export default class BarChart extends React.Component {
  max = 0;

  constructor(props){
    super(props);

    this.max = Math.max(...this.props.data);
  }

  render(){
    return(
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 15, color: 'white'}}>{this.props.title}</Text>
        <View style={{height: this.props.height, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', padding: 10, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: 'grey'}}>
          {this.props.data.map((num, index) => {
            const height = 100*num/this.max + "%";
            return(
              <View key={index} style={{flex: 1, height: height, marginHorizontal: 5, backgroundColor: "#10B472", borderRadius: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 10}}>{num}</Text>
              </View>
            );
          })}
        </View>
      </View>
    )
  }
}