import firebase, { database } from '../../firebase';

export const logoutUserAPI = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    firebase.auth().signOut()
      .then(() => {
        dispatch({type: 'CHANGE_ISLOGIN', value: false})
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
    dispatch({type: 'CHANGE_LOADING', value: true})
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(res => {
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken
        }
        database.ref('users/' + res.user.uid).update({
          lastLogin: Date.now()
        });
        dispatch({type: 'CHANGE_LOADING', value: false})
        dispatch({type: 'CHANGE_ISLOGIN', value: true})
        dispatch({type: 'CHANGE_USER', value: dataUser})
        resolve(dataUser)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
        dispatch({type: 'CHANGE_ERROR', value: errorMessage})
        dispatch({type: 'CHANGE_LOADING', value: false})
        dispatch({type: 'CHANGE_ISLOGIN', value: false})
        reject(false)
      })
  })
}

export const addDataToAPI = (data) => (dispatch) => {
  database.ref('posts/' + data.userId).push({
    title: data.title,
    content: data.content,
    date: data.date,
    voteCount: data.voteCount
  })
}

export const getDataFromAPI = (userId) => (dispatch) => {
  const urlPosts = database.ref('posts/' + userId);
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
      const sortedData = data.sort((a, b) => b.data.date - a.data.date);
      dispatch({ type: 'SET_POSTS', value: sortedData });
      resolve(sortedData);
    });
  });
};

export const getAllPostsFromAPI = () => (dispatch) => {
  const urlPosts = database.ref('posts');
  return new Promise((resolve, reject) => {
    urlPosts.on('value', (snapshot) => {
      console.log('get Data: ', snapshot.val());
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
      const sortedData = data.sort((a, b) => b.data.date - a.data.date);
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

export const getPostsByIdFromAPI = (userId, postId) => (dispatch) => {
  const urlPosts = database.ref(`posts/${userId}/${postId}`);
  return new Promise((resolve, reject) => {
    urlPosts.on('value', (snapshot) => {
      const data = {
        id: snapshot.key,
        data: snapshot.val(),
      };
      dispatch({ type: 'SET_POST', value: data });
      resolve(snapshot.val());
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
      const sortedData = data.sort((a, b) => b.data.date - a.data.date);
      dispatch({ type: 'SET_POSTS', value: sortedData });
      resolve(sortedData);
    });
  });
};

export const updateDataAPI = (data) => (dispatch) => {
  const urlPosts = database.ref(`posts/${data.userId}/${data.postId}`);
  return new Promise((resolve, reject) => {
    urlPosts.update({
      title: data.title,
      content: data.content,
      date: data.date
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
    dispatch({type: 'CHANGE_LOADING', value: true})
    firebase.auth().sendPasswordResetEmail(data.email)
      .then(res => {
        dispatch({type: 'CHANGE_LOADING', value: false})
        resolve(true)
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