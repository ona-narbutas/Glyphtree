const auxFunctions = {

  newPostIntermediary: async (textEntry) => {
    const postResponse = await fetch('/savedRoots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({content: textEntry})
    })
    console.log('response in intermediary func: ', postResponse)
    const parsedResponse = await postResponse.json();
    console.log('parsed response: ', parsedResponse)
    return parsedResponse;
  },
  
  loadFeedIntermediary: async () => {
    const feedResponse = await fetch('/savedRoots');
    const parsedResponse = await feedResponse.parse;
    return parsedResponse;
  }
}

export default auxFunctions;