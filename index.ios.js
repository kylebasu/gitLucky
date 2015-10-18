/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Login = require('./Login');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Component
} = React;

var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

class gitLucky extends Component{
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Login',
          name:'Login',
          component: Login
        }}/>
    );
  }
}


AppRegistry.registerComponent('gitLucky', () => gitLucky);