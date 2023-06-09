import firebase, { database, storage } from '../../firebase';

export const logoutUserAPI = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    firebase.auth().signOut()
      .then(() => {
        dispatch({type: 'CHANGE_ISLOGIN', value: false})
        dispatch({type: 'CHANGE_USER', value: null})
        resolve(true);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
        dispatch({type: 'CHANGE_ERROR', value: errorMessage})
        reject(false);
      });
  });
};

export const registerUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: 'CHANGE_LOADING', value: true });

    // Check if the username already exists
    database
      .ref('users')
      .orderByChild('username')
      .equalTo(data.username)
      .once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          const errorMessage = 'Username already exists';
          dispatch({ type: 'CHANGE_ERROR', value: errorMessage });
          dispatch({ type: 'CHANGE_LOADING', value: false });
          reject(false);
        } else {
          // Create a new user if the username is not found
          firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then((res) => {
              console.log('success: ', res);
              const dataUser = {
                uid: res.user.uid,
                username: data.username,
                email: res.user.email,
                lastLogin: Date.now(),
              };
              database.ref('users/' + res.user.uid).set(dataUser);
              dispatch({ type: 'CHANGE_LOADING', value: false });
              resolve(dataUser);
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode, errorMessage);
              dispatch({ type: 'CHANGE_ERROR', value: errorMessage });
              dispatch({ type: 'CHANGE_LOADING', value: false });
              reject(false);
            });
        }
      })
      .catch((error) => {
        // Handle any error that occurs during the database query
        console.log('Error checking username:', error);
        dispatch({ type: 'CHANGE_ERROR', value: error.message });
        dispatch({ type: 'CHANGE_LOADING', value: false });
        reject(false);
      });
  });
};

export const deleteAccountAPI = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: 'CHANGE_LOADING', value: true });

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    // Delete user data from the database
    database
      .ref('users/' + uid)
      .remove()
      .then(() => {
        // Delete user authentication credentials
        user
          .delete()
          .then(() => {
            dispatch({ type: 'CHANGE_LOADING', value: false });
            resolve(true);
          })
          .catch((error) => {
            console.log('Error deleting user:', error);
            dispatch({ type: 'CHANGE_LOADING', value: false });
            reject(false);
          });
      })
      .catch((error) => {
        console.log('Error deleting user data:', error);
        dispatch({ type: 'CHANGE_LOADING', value: false });
        reject(false);
      });
  });
};

export const loginUserAPI = (data) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(async(res) => {
        // console.log("cek isi user : " + JSON.stringify(res.user));
        const userDataRef = database.ref('users/' + res.user.uid);
        const userDataAPI = await database.ref('users/' + res.user.uid).once('value');
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          username: userDataAPI.val().username,
          lastLogin: userDataAPI.val().lastLogin,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken,
          creationTime: res.user.metadata.creationTime,
        }
        userDataRef.update({
          lastLogin: Date.now()
        });
        dispatch({type: 'CHANGE_ISLOGIN', value: true})
        dispatch({type: 'CHANGE_USER', value: dataUser})
        resolve(dataUser)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
        dispatch({type: 'CHANGE_ERROR', value: errorMessage})
        reject(false)
      })
  })
}

export const addDataToAPI = (data) => async (dispatch) => {
  const { image } = data;
  const userDataAPI = await database.ref('users/' + data.userId).once('value');
  const newPostRef = database.ref('posts/' + data.userId).push();
  try {
    // Upload the image file to storage
    if (image) {
      const identifier = newPostRef.key;
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`images/${identifier}_${image.name}`);
      await imageRef.put(image);
      data.image = await imageRef.getDownloadURL();
    }

    // Store the post data in the database
    const postData = {
      title: data.title,
      content: data.content,
      image: data.image || null,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      voteCount: data.voteCount,
      userId: data.userId,
      commentCount: data.commentCount,
      creatorName: userDataAPI.val().username,
    };
    await newPostRef.set(postData);

  } catch (error) {
    console.log('Error uploading image:', error);
  }
};

export const getDataFromAPI = (userId) => (dispatch) => {
  const urlPosts = database.ref(`posts/${userId}`);
  return new Promise((resolve, reject) => {
    urlPosts.on('value', (snapshot) => {
      // console.log('get Data: ', snapshot.val());
      const data = [];
      if (snapshot.val()) {
        Object.keys(snapshot.val()).map((key) => {
          data.push({
            id: key,
            userId,
            data: snapshot.val()[key],
          });
        });
      }
      const sortedData = data.sort((a, b) => b.data.updatedAt - a.data.updatedAt);
      dispatch({ type: 'SET_USER_POSTS', value: sortedData });
      resolve(sortedData);
    });
  });
};

export const getAllPostsFromAPI = () => (dispatch) => {
  const urlPosts = database.ref('posts');
  return new Promise((resolve, reject) => {
    urlPosts.on('value', (snapshot) => {
      // console.log('get All Data: ', snapshot.val());
      const data = [];
      snapshot.forEach((userSnapshot) => {
        Object.keys(userSnapshot.val()).map((key) => {
          data.push({
            id: key,
            userId: userSnapshot.key,
            data: userSnapshot.val()[key],
          });
        });
      });
      // Sort the posts by the "date" attribute in descending order
      const sortedData = data.sort((a, b) => b.data.updatedAt - a.data.updatedAt);
      dispatch({ type: 'SET_HOME_POSTS', value: sortedData });
      resolve(sortedData);
    });
  });
};

/* export const searchPostsFromAPI = (query) => (dispatch) => {
  const urlPosts = database.ref('posts');
  return new Promise((resolve, reject) => {
    urlPosts.on('value', (snapshot) => {
      const data = [];
      snapshot.forEach((userSnapshot) => {
        Object.keys(userSnapshot.val()).map((key) => {
          const post = {
            id: key,
            userId: userSnapshot.key,
            data: userSnapshot.val()[key],
          }
          const postDataString = JSON.stringify(post.data);
          if (postDataString.includes(query)) {
            data.push(post);
          }
        });
      });
      // Sort the posts by the "date" attribute in descending order
      const sortedData = data.sort((a, b) => b.data.date - a.data.date);
      dispatch({ type: 'SET_NOTES', value: sortedData });
      resolve(sortedData);
    });
  });
}; */

export const getPostsByIdFromAPI = (userId, postId) => (dispatch) => {
  const urlPosts = database.ref(`posts/${userId}/${postId}`);
  return new Promise((resolve, reject) => {
    urlPosts.on('value', (snapshot) => {
      // console.log("user data api:" + JSON.stringify(userDataAPI));
      const data = {
        id: snapshot.key,
        userId: userId,
        data: snapshot.val(),
      };
      // console.log("Single post : " + JSON.stringify(data));
      dispatch({ type: 'SET_POST', value: data });
      resolve(data);
    });
  });
};

export const searchPostsFromAPI = (query, userId) => (dispatch) => {
  let urlPosts;

  if (userId !== null) {
    urlPosts = database.ref(`posts/${userId}`);
  } else {
    urlPosts = database.ref('posts');
  }

  // console.log("query : " + query + " userId : " + userId);
  return new Promise((resolve, reject) => {
    urlPosts.on('value', (snapshot) => {
      const data = [];
      if(userId === null){
        snapshot.forEach((userSnapshot) => {
          Object.keys(userSnapshot.val()).map((key) => {
            const post = {
              id: key,
              userId: userSnapshot.key,
              data: userSnapshot.val()[key],
            };
            const postDataString = JSON.stringify(post.data);
            if (postDataString.includes(query)) {
              data.push(post);
            }
          });
        }); 
      } else {
        if (snapshot.val()) {
          Object.keys(snapshot.val()).map((key) => {
            const post = {
              id: key,
              userId,
              data: snapshot.val()[key],
            };
            const postDataString = JSON.stringify(post.data);
            if (postDataString.includes(query)) {
              data.push(post);
            }
          });
        }
      }
      // Sort the posts by the "updatedAt" attribute in descending order
      const sortedData = data.sort((a, b) => b.data.updatedAt - a.data.updatedAt);
      dispatch({ type: 'SET_USER_POSTS', value: sortedData });
      dispatch({ type: 'SET_HOME_POSTS', value: sortedData });
      resolve(sortedData);
    });
  });
};

export const updateDataAPI = (data) => async (dispatch) => {
  const urlPosts = database.ref(`posts/${data.userId}/${data.postId}`);
  const { image } = data;
  let previousImageUrl = null;

  try {
    // Check if image exists and retrieve the previous image URL
    if (image) {
      const snapshot = await urlPosts.once('value');
      const previousData = snapshot.val();
      previousImageUrl = previousData.image;
      
      // Upload the new image file to storage
      const identifier = data.postId;
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`images/${identifier}_${image.name}`);
      await imageRef.put(image);
      data.image = await imageRef.getDownloadURL();
    }
  } catch (error) {
    console.log('Error uploading image:', error);
  }

  return new Promise((resolve, reject) => {
    const updateData = {
      title: data.title,
      content: data.content,
      updatedAt: data.updatedAt,
      image: data.image || null,
    };

    urlPosts.update(updateData, (err) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);

        // Delete the previous image if it exists and a new image is uploaded
        if (previousImageUrl && data.image) {
          const storageRef = storage.refFromURL(previousImageUrl);
          storageRef.delete().catch((error) => {
            console.log('Error deleting previous image:', error);
          });
        }
      }
    });
  });
};

export const deleteDataAPI = (data) => async (dispatch) => {
  const urlPosts = database.ref(`posts/${data.userId}/${data.postId}`);
  const commentsUrl = database.ref(`comments/${data.postId}`);
  let imageUrl = null;

  try {
    // Retrieve the image URL before removing the data
    const snapshot = await urlPosts.once('value');
    const postData = snapshot.val();
    imageUrl = postData.image;

    // Remove the data from the database
    await urlPosts.remove();
    await commentsUrl.remove();

    // Delete the image from storage if it exists
    if (imageUrl) {
      const storageRef = storage.refFromURL(imageUrl);
      await storageRef.delete();
    }

    return true;
  } catch (error) {
    console.log('Error deleting data:', error);
    return false;
  }
};

export const resetPasswordByEmail = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    firebase.auth().sendPasswordResetEmail(data.email)
      .then(res => {
        resolve(true)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
        dispatch({type: 'CHANGE_ERROR', value: errorMessage})
        reject(false)
      })
  })
}

export const updateVoteAPI = (data) => (dispatch) => {
  const urlPosts = database.ref(`posts/${data.userId}/${data.postId}`);
  const votedUrl = database.ref(`posts/${data.userId}/${data.postId}/votedUsers/${data.votedUserId}`)
  return new Promise((resolve, reject) => {
    urlPosts.update({
      voteCount: data.voteCount,
    })
    votedUrl.set({
      voted: data.voted,
      voteType: data.voteType,
    });
  })
};

export const getVotesAPI = (userId) => (dispatch) => {
  const votedUrl = database.ref(`votes/${userId}`);
  votedUrl.on('value', (snapshot) => {
    const votedPosts = [];
    snapshot.forEach((childSnapshot) => {
      const votedPost = {
        postId: childSnapshot.key,
        data: childSnapshot.val(),
      };
      votedPosts.push(votedPost);
    });
    dispatch({ type: 'SET_VOTED_POST', value: votedPosts });
  });
};

export const addCommentAPI = (data) => (dispatch) => {
  const urlPosts = database.ref(`posts/${data.userId}/${data.postId}`);
  const commentUrl = database.ref(`comments/${data.postId}`);
  return new Promise((resolve, reject) => {
    urlPosts.update({
      commentCount: data.commentCount,
    })
    commentUrl.push({
      commenterName: data.commenterName,
      commenterId: data.commenterId,
      createdAt: data.createdAt,
      updatedAt: data.createdAt,
      text: data.text,
    });
  })
};

export const updateCommentAPI = (data) => (dispatch) => {
  const commentUrl = database.ref(`comments/${data.postId}/${data.commentId}`);
  return new Promise((resolve, reject) => {
    commentUrl.update({
      text: data.text,
      updatedAt: new Date().getTime(),
    });
  })
};

export const deleteCommentAPI = (data) => (dispatch) => {
  const urlPosts = database.ref(`posts/${data.userId}/${data.postId}`);
  const commentUrl = database.ref(`comments/${data.postId}/${data.commentId}`);
  return new Promise((resolve, reject) => {
    urlPosts.update({
      commentCount: data.commentCount,
    })
    commentUrl.remove();
  })
};

export const getCommentsAPI = (userId, postId) => (dispatch) => {
  const commentUrl = database.ref(`comments/${postId}`)
  
  commentUrl.on('value', (snapshot) => {
    const comments = [];
    
    snapshot.forEach((childSnapshot) => {
      const comment = {
        id: childSnapshot.key,
        data: childSnapshot.val(),
      };
      comments.push(comment);
    });
    
    dispatch({ type: 'SET_POST_COMMENTS', value: comments });
  });
};
