

export const gql = async (str: string) => {
    const { data } = await fetch('https://app.0xc8.com/graphql', {
        method: 'POST',
        // credentials: 'omit',
        headers: {
            'content-type': 'application/json'
        },
        // mode: 'no-cors',
        body: JSON.stringify({ query: str })
    })
        .then(r => r.json())

    if (data) {
        return data
    } else {
        return null
    }

}

