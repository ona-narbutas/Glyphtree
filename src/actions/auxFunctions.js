const auxFunctions = {
  // newPostIntermediary: (textEntry) => {
  //   fetch('/savedRoots', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({content: textEntry})
  //   }).then(response => response.json())
  //   .then(data => {return data.json()});
  // }
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
  }
}

export default auxFunctions;