const auxFunctions = {

  newPostIntermediary: async (textEntry) => {
    const postResponse = await fetch('/api/savedRoots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({content: textEntry})
    })
    const parsedResponse = await postResponse.json();
    return parsedResponse;
  },
  
  loadFeedIntermediary: async () => {
    const feedResponse = await fetch('/api/savedRoots');
    const parsedResponse = await feedResponse.json();
    console.log('parsed response in loadFeedIntermediary: ', parsedResponse)
    return parsedResponse;
  },

  submitChildintermediary: async (childData) => {
    const childResponse = await fetch('/api/savedBranches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({content: childData.content, parentId: childData.parentId})
    })
    const parsedResponse = await childResponse.json();
    return parsedResponse;
  }
}

export default auxFunctions;