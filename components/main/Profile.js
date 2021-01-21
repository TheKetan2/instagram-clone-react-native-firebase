import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList, Button } from "react-native";
import { connect } from "react-redux";

import firebase from "firebase";
require("firebase/firestore");

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [userPost, setUserPosts] = useState([]);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const { currentUser, posts } = props;
    console.log(currentUser, posts);

    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            console.log(snapshot.data());
            setUser(snapshot.data());
          } else {
            console.log("does not exist");
          }
        });

      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          console.log(posts);
          setUserPosts(posts);
        });
    }
    if (props.following.indexOf(props.route.params.uid) >= 0) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [props.route.params.uid, props.following]);

  const onFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .set({});
  };
  const onUnfollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .delete();
    console.log("deleted");
  };

  if (user === null) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>{user?.name}</Text>
        <Text>{user?.email}</Text>
        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <View>
            {following ? (
              <Button title={"Following"} onPress={() => onUnfollow()} />
            ) : (
              <Button title={"Follow"} onPress={() => onFollow()} />
            )}
          </View>
        ) : null}
      </View>
      <View style={styles.containerGallery}>
        <FlatList
          data={userPost}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
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
  following: store.userState.following,
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
  postContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
  },
});
