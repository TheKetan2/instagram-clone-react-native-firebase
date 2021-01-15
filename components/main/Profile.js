import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { connect } from "react-redux";

const Profile = (props) => {
  const { currentUser, posts } = props;
  console.log(currentUser, posts);
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>{currentUser?.name}</Text>
        <Text>{currentUser?.email}</Text>
      </View>
      <View style={styles.containerGallery}>
        <FlatList
          data={posts}
          numColumns={3}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                margin: 5,
                backgroundColor: "white",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Image
                source={{ uri: item.downloadURL }}
                style={{ flex: 1, aspectRatio: 1 }}
              />
              <Text>{item.caption}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  infoContainer: {
    margin: 20,
  },
  containerGallery: {
    marginBottom: 80,
    width: "100%",
  },
});
