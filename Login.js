'use strict';

var React = require('react-native');
var config = require('./config.js');
var Home = require('./Home')

var {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableHighlight,
	ActivityIndicatorIOS,
	Image,
	Component,
	LinkingIOS
} = React;

var styles = StyleSheet.create({
	description: {
		marginTop: 55,
		fontSize: 18,
		textAlign: 'center',
		color: 'white'
	},
	title:{
		fontSize: 36,
		textAlign: 'center',
		color: '#0E2635',
		marginTop: 20
	},
	container: {
		flex: 1,
		padding: 30,
		marginTop: 65,
		alignItems: 'center',
		backgroundColor: 'white'
	},
	userInput: {
		height: 36,
		width: 200,
		padding: 4,
		margin: 5,
		flex: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#0E2635',
		borderRadius: 8,
		color: '#0E2635',
		textAlign: 'center'
	},
	flowRight: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
	},
	image: {
	  width: 217,
	  height: 217
	},
	buttonText: {
	  fontSize: 18,
	  color: 'white',
	  alignSelf: 'center'
	},
	button: {
	  height: 36,
	  width: 200,
	  padding: 4,
	  margin: 5,
	  flex: 1,
	  flexDirection: 'row',
	  backgroundColor: '#0E2635',
	  borderColor: '#0E2635',
	  borderWidth: 1,
	  borderRadius: 8,
	  marginTop: 100,
	  alignSelf: 'stretch',
	  justifyContent: 'center'
	},
	spinner: {
		height: 36,
		width: 36,
		justifyContent: 'center',
		alignSelf: 'center'
	}
});

class Login extends Component {



	constructor(props) {
		super(props);
		this.state = {
			isLoading: false
		};
	}

	handleUrl() {
		console.log(event.url);
		this.props.navigator.push({
			title: 'Home',
			component: Home
		});
		LinkingIOS.removeEventListener('url', handleUrl)
	}

	onLoginPressed(clientID, clientSecret) {
		var that = this;
		LinkingIOS.openURL(["https://github.com/login/oauth/authorize",
			"?response_type=token",
			"&client_id=",
			config.clientID,
			'&redirect_uri=gitLucky://com.mycompany.io'].join(''))
		LinkingIOS.addEventListener('url', handleUrl);
		function handleUrl (event) {
		  var gCode = event.url.split('=');
		  var gCode = gCode[1];
		  var needAccess = 'https://github.com/login/oauth/access_token?client_id='+ config.clientID+'&client_secret='+ config.clientSecret + '&code='+ gCode
		  var reqObj = {
		  	method: 'POST'
		  };
		  fetch(needAccess, reqObj)
		  	.then(function(res){
		  		var gotAccess = res._bodyInit.split('=')
		  		var newAccess = gotAccess[1].split('&')
				that.props.navigator.push({
					title: 'Home',
				  	component: Home,
				  	passProps: {accessToken: newAccess[0]}
				});
				LinkingIOS.removeEventListener('url', handleUrl)
		  	});
		}
	}

	render(){
		var spinner = this.state.isLoading ?
		  ( <ActivityIndicatorIOS
		  	  style={styles.spinner}
		      hidden='true'
		      size='large'/> ) :
		  ( <View/>);
		return(
			<View style={styles.container}>
				<Text style={styles.title}> GitLucky </Text>
				<Image source={require('image!GitLucky')} style={styles.image}/>
				<View>
					<TouchableHighlight style={styles.button}
					    underlayColor='black'
					    onPress={this.onLoginPressed.bind(this)}>
					  <Text style={styles.buttonText}>Login</Text>
					</TouchableHighlight>
					{spinner}
				</View>
				<Text style={styles.description}> React Native is the shit </Text>
			</View>
		);
	}
}

module.exports = Login;