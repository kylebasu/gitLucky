'use strict'

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
	Text,
	View,
	Component,
	StyleSheet,
	ActivityIndicatorIOS,
	Image,
	Navigator,
	TouchableOpacity,
	PanResponder,
	Animated
} = React;

var SQUARE_DIMENSIONS = 300;

var styles = StyleSheet.create({
	description: {
		marginTop: 55,
		fontSize: 18,
		textAlign: 'center',
		color: '#0E2635'
	},
	title:{
		fontSize: 36,
		textAlign: 'center',
		color: 'white',
		marginTop: 20
	},
	container: {
		flex: 1,
		padding: 30,
		marginTop: 65,
		alignItems: 'center',
		backgroundColor: 'white'
	},
	card: {
		borderWidth: 3,
		borderRadius: 3,
		borderColor: '#0E2635',
		width: 300,
		height: 300,
		padding: 10
	},
	square:{
		width: SQUARE_DIMENSIONS,
		height: SQUARE_DIMENSIONS,
		backgroundColor: 'white',
		borderColor: '#0E2635',
		borderWidth: 3
	}
});


class Home extends Component {


	constructor(props) {
		super(props);
		this.state = {
			github: null,
			x: 0,
			y: 0,
			pan: new Animated.ValueXY()
		};
	}

	getStyle(){
		return [
			styles.square,
			{
				transform: [
				{
					translateX: this.state.pan.x
				},
				{
					translateY: this.state.pan.y
				},
				{
					rotate: this.state.pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]})
				}
				]
			},
			{
				opacity: this.state.pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]})
			}
		];
	}

	componentDidMount(){
		this.fetchIssues()
	}

	componentWillMount(){
		this._animatedValueX = 0;
		this._animatedValueY = 0;
		this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
		this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

		this._panResponder = PanResponder.create({
			onMoveShouldSetResponderCapture: () => true,
			onMoveShouldSetPanResponderCapture: () => true,
			onPanResponderGrant: (e, gestureState) => {
				this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
				this.state.pan.setValue({x:0, y:0});
			},
			onPanResponderMove: Animated.event([
				null, {dx: this.state.pan.x, dy: this.state.pan.y}
			]),
			onPanResponderRelease: (evt, gestureState) => {
				if(gestureState.dx > 75 || gestureState.dx < -75){
					this.fetchIssues();
				}
				Animated.spring(this.state.pan, {
					toValue: 0
					}).start()
			}
		});
	}

	componentWillUnmount(){
		this.state.pan.x.removeAllListeners();
		this.state.pan.y.removeAllListeners();
	}

	fetchOneIssue(issues){
		fetch(issues + '?access_token=' + this.props.accessToken, {method: 'GET'})
			.then((response) => response.json())
			.then(responseData => {
				console.log(responseData)
				var theIssue = responseData[Math.floor(Math.random() * responseData.length)]
				this.setState({
					githubBody: theIssue.body,
					githubTitle: theIssue.title
				});
			})
			.done()
	}

	fetchIssues(){
		fetch('https://api.github.com/users/kylebasu/starred?access_token=' + this.props.accessToken, {method: 'GET'})
			.then((response) => response.json())
			.then((responseData) => {
				var manyIssue = responseData[Math.floor(Math.random() * responseData.length)].issues_url
				var oneIssue = manyIssue.split('{')[0]
				this.fetchOneIssue(oneIssue);
			})
			.done()
	}

	renderLoadingView() {
	    return (
	      <View style={styles.container}>
	        <Text style={styles.description}>
	          Loading movies...
	        </Text>
	      </View>
	    );
	  }

	 renderMovie(movie) {
	 	return(
	 		<View style={styles.container}>
	 			<Text style={styles.description}> {movie}</Text>
	 		</View>
	 	)
	 }

	render(){
		return(
			<View style={styles.container}>
				<Animated.View style={this.getStyle()}
				{...this._panResponder.panHandlers}>
					<Text style={styles.description}> {this.state.githubTitle} </Text>
				</Animated.View>
			</View>
		)
	}
};


module.exports = Home;