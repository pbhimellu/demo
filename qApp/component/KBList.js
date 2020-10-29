import React,{Component} from 'react';
import { FlatList
	, StyleSheet
	, Text
	, View 
	,Button
	,ScrollView
	} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		paddingTop: 22
	},
	c: {
		padding: 10,
		fontSize: 18,
		height: 44,
		flex: .3,
	},
	t: {
		padding: 10,
		fontSize: 18,
		height: 44,
		flex: .7,
	},
});

export default class  KBList extends Component
{
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			isLoading: true
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	//https://jsonplaceholder.typicode.com/posts
	render()  {
		const { data, isLoading } = this.state;



		return (
			<ScrollView>



			<View style={styles.container}>


			<FlatList
			data={data}
			renderItem=
			{({item}) => 
				<View style={styles.container}>
				<Text style={styles.c}>{item.title}</Text>
				<Text style={styles.t}>{item.releaseYear}</Text>
				</View>
			}

			ListHeaderComponent=
			{() => 
				<View style={styles.container}>
				<Text style={styles.c}>Category</Text>
				<Text style={styles.t}>Details</Text>
				</View>
			}
			/>
			</View>
			<Button
			title="Add question.."
			onPress={() => this.props.navigation.navigate('AddKB')}
			/>
			</ScrollView>
		);
	}

	fetchData() {
		fetch('https://reactnative.dev/movies.json')
			.then((response) => response.json())
			.then((json) => {
				this.setState({ data: json.movies });
			})
			.catch((error) => console.error(error))
			.finally(() => {
				this.setState({ isLoading: false });
			});
	}

	//https://jsonplaceholder.typicode.com/posts
}

//	export default KBList;

