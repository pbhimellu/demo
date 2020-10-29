import React,{Component} from 'react';
import { FlatList, StyleSheet, Text, View ,Button,TextInput,ScrollView,Image} from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";


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

export default class AddKB extends Component
{
	state = { photos: [] }; 

	render ()  
	{
		return (
			<View>

			<Text>New Question Details:</Text>
			<TextInput
			style={{ height: 240, borderColor: 'gray', borderWidth: 1 }}
			multiline={true}
			numberOfLines={10}
			placeholder='Enter your query here..'
			placeholderTextColor="red"	
			/>
			<Text>OR</Text>

			<Button
			title="Select Camera picture.."
			onPress={() => this.handleButtonPress()}
			/>

			<ScrollView>
			{this.state.photos.map((p, i) => {
				return (
					<Image
					key={i}
					style={{
						width: 300,
							height: 100,
					}}
					source={{ uri: p.node.image.uri }}
					/>
				);
			})}
			</ScrollView>

			<Button
			title="Save"
			onPress={() => Alert.alert('Simple Button pressed')}
			/>

			</View>
		);
	}

	async  handleButtonPress () {


		if (Platform.OS === "android" && !(await this.hasAndroidPermission())) {
			alert('Error fetching  permissions,');
			return;
		}

		CameraRoll.getPhotos({
			first: 20,
			assetType: 'Photos',
		})
			.then(r => {
				this.setState({ photos: r.edges });
			})
			.catch((err) => {
				//Error Loading Images
				alert('Error loading images,'+err);
			});
	};

	async hasAndroidPermission() {
		const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

		const hasPermission = await PermissionsAndroid.check(permission);
		if (hasPermission) {
			return true;
		}

		const status = await PermissionsAndroid.request(permission);
		return status === 'granted';
	}
}


