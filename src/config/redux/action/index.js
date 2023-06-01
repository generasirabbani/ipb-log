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
    dispatch({type: 'CHANGE_LOADING', value: true})
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        console.log('success: ', res);
        const dataUser = {
          uid: res.user.uid,
          username: data.username,
          email: res.user.email,
          lastLogin: Date.now()
        }
        dispatch({type: 'CHANGE_LOADING', value: false})
        resolve(dataUser)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
        dispatch({type: 'CHANGE_ERROR', value: errorMessage})
        dispatch({type: 'CHANGE_LOADING', value: false})
        reject(false)
      })
  })
}

export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(res => {
        const userDataAPI = database.ref('users/' + res.user.uid);
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken
        }
        userDataAPI.update({
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

  try {
    // Upload the image file to storage
    if (image) {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`images/${image.name}`);
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
    };

    const newPostRef = database.ref('posts/' + data.userId).push();
    await newPostRef.set(postData);

  } catch (error) {
    console.log('Error uploading image:', error);
  }
};

export const getDataFromAPI = (userId) => (dispatch) => {
  const urlPosts = database.ref(`posts/${userId}`);
  return new Promise((resolve, reject) => {
    urlPosts.on('value', (snapshot) => {
      console.log('get Data: ', snapshot.val());
      const data = [];
      if (snapshot.val()) {
        Object.keys(snapshot.val()).map((key) => {
          data.push({
            id: key,
            data: snapshot.val()[key],
          });
        });
      }
      const sortedData = data.sort((a, b) => b.data.createdAt - a.data.createdAt);
      dispatch({ type: 'SET_POSTS', value: sortedData });
      resolve(sortedData);
    });
  });
};

export const getAllPostsFromAPI = () => (dispatch) => {
  const urlPosts = database.ref('posts');
  return new Promise((resolve, reject) => {
    urlPosts.on('value', (snapshot) => {
      console.log('get All Data: ', snapshot.val());
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
      const sortedData = data.sort((a, b) => b.data.createdAt - a.data.createdAt);
      dispatch({ type: 'SET_POSTS', value: sortedData });
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

export const getPostsByIdFromAPI = (userId, postId) => async (dispatch) => {
  const urlPosts = database.ref(`posts/${userId}/${postId}`);
  const userDataAPI = await database.ref('users/' + userId).once('value');
  return new Promise((resolve, reject) => {
    urlPosts.on('value', (snapshot) => {
      // console.log("user data api:" + JSON.stringify(userDataAPI));
      const data = {
        id: snapshot.key,
        userId: userId,
        username: userDataAPI.val().username,
        data: snapshot.val(),
      };
      dispatch({ type: 'SET_POST', value: data });
      resolve(data);
    });
  });
};

export const searchPostsFromAPI = (query) => (dispatch) => {
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
      const sortedData = data.sort((a, b) => b.data.createdAt - a.data.createdAt);
      dispatch({ type: 'SET_POSTS', value: sortedData });
      resolve(sortedData);
    });
  });
};

export const updateDataAPI = (data) => async (dispatch) => {
  const urlPosts = database.ref(`posts/${data.userId}/${data.postId}`);
  const { image } = data;

  try {
    // Upload the image file to storage
    if (image) {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`images/${image.name}`);
      await imageRef.put(image);
      data.image = await imageRef.getDownloadURL();
    }

  } catch (error) {
    console.log('Error uploading image:', error);
  }

  return new Promise((resolve, reject) => {
    urlPosts.update({
      title: data.title,
      content: data.content,
      updatedAt: data.updatedAt,
      image: data.image || null,
    }, (err) => {
      if(err){
        reject(false);
      } else {
        resolve(true);
      }
    });
  })
}

export const deleteDataAPI = (data) => (dispatch) => {
  const urlPosts = database.ref(`posts/${data.userId}/${data.postId}`);
  return new Promise((resolve, reject) => {
    urlPosts.remove();
  })
}

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

export const addCommentAPI = (data) => (dispatch) => {
  const urlPosts = database.ref(`posts/${data.userId}/${data.postId}`);
  const votedUrl = database.ref(`posts/${data.userId}/${data.postId}/comments`)
  return new Promise((resolve, reject) => {
    urlPosts.update({
      commentCount: data.commentCount,
    })
    votedUrl.push({
      commenterId: data.commenterId,
      comment: data.comment,
    });
  })
};

export const updateCommentAPI = (data) => (dispatch) => {
  const urlPosts = database.ref(`posts/${data.userId}/${data.postId}`);
  const votedUrl = database.ref(`posts/${data.userId}/${data.postId}/comments`)
  return new Promise((resolve, reject) => {
    urlPosts.update({
      commentCount: data.commentCount,
    })
    votedUrl.update({
      comment: data.comment,
    });
  })
};