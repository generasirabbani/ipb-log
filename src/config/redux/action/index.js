import firebase, { database } from '../../firebase';

export const actionUserName = () => (dispatch) => {
  setTimeout(() => {
    return dispatch({type: 'CHANGE_USER', value: 'Anonymous'})
  }, 2000)
}

export const logoutUserAPI = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    firebase.auth().signOut()
      .then(() => {
        dispatch({ type: 'LOGOUT_USER' });
        resolve(true);
      })
      .catch((error) => {
        console.log('Logout error:', error);
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
        dispatch({type: 'CHANGE_LOADING', value: false})
        resolve(true)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
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
      //   console.log('success: ', res);
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken
        }
        dispatch({type: 'CHANGE_LOADING', value: false})
        dispatch({type: 'CHANGE_ISLOGIN', value: true})
        dispatch({type: 'CHANGE_USER', value: dataUser})
        resolve(dataUser)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
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
    date: data.date
  })
}

export const getDataFromAPI = (userId) => (dispatch) => {
  const urlNotes = userId ? database.ref('posts/' + userId) : database.ref('posts');
  return new Promise((resolve, reject) => {
    urlNotes.on('value', (snapshot) => {
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
      if (userId) {
        dispatch({ type: 'SET_NOTES', value: data });
      } else {
        dispatch({ type: 'SET_OTHER_USER_NOTES', value: data });
      }
      resolve(snapshot.val());
    });
  });
};

export const getAllNotesFromAPI = () => (dispatch) => {
  const urlNotes = database.ref('posts');
  return new Promise((resolve, reject) => {
    urlNotes.on('value', (snapshot) => {
      console.log('get All Notes: ', snapshot.val());
      const data = [];
      snapshot.forEach((userSnapshot) => {
        Object.keys(userSnapshot.val()).map((key) => {
          data.push({
            id: key,
            data: userSnapshot.val()[key],
          });
        });
      });

      dispatch({ type: 'SET_NOTES', value: data });
      resolve(snapshot.val());
    });
  });
};


export const updateDataAPI = (data) => (dispatch) => {
  const urlNotes = database.ref(`posts/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    urlNotes.set({
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
  const urlNotes = database.ref(`posts/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    urlNotes.remove();
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
        dispatch({type: 'CHANGE_LOADING', value: false})
        reject(false)
      })
  })
}