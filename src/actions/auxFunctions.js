const auxFunctions = {

  newPostIntermediary: async (textEntry) => {
    const postResponse = await fetch('/savedRoots', {
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
    const feedResponse = await fetch('/savedRoots');
    const parsedResponse = await feedResponse.json();
    return parsedResponse;
  }
}

export default auxFunctions;