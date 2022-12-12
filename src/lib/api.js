const FIREBASE_DOMAIN =
'https://socialnetwork-f896f-default-rtdb.europe-west1.firebasedatabase.app/';


export async function addPost(postData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/posts.json`, {
    // const response = await fetch('http://localhost:8080/api/posts' ,{
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create post.");
  }

  return null;
}

export async function getAllPosts() {
  const response = await fetch(`${FIREBASE_DOMAIN}/posts.json`);
  // const response = await fetch('http://localhost:8080/api/posts');
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch posts.");
  }

  const transformedPosts = [];

  for (const key in data) {
    const postObj = {
      id: key,
      ...data[key],
    };
    transformedPosts.push(postObj);
  }
  return transformedPosts;
}

export async function getSinglePost(postId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/posts/${postId}.json`);
  // const response = await fetch(`http://localhost:8080/api/posts/${postId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch post.");
  }

  const loadedPost = {
    id: postId,
    ...data,
  };

  return loadedPost;
}

// COMMENTS PART


export async function addComment(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${requestData.postId}.json`,{
      method: "POST",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },

    }
  );

  console.log(requestData);


  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }
  return { commentId: data.name };
}

// export async function addComment(requestData){
//   const response = await fetch(`http://localhost:8080/api/comments/${requestData.postId}`, {
//     method:'POST', 
//     body: JSON.stringify(requestData.commentData),
//     // headers: {
//     //           "Content-Type": "application/json",
//     //         },
//   })
//   const data = await response.json();

//   if (!response.ok) {
//         throw new Error(data.message || "Could not add comment.");
//       }
//       return { commentId: data.name };

// }



export async function getAllComments(postId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${postId}.json`);
  // const response = await fetch(`http:localhost:8080/api/comments/${postId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch comments.");
  }

 
  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };
    transformedComments.push(commentObj);
  }
  
  return transformedComments;

}
