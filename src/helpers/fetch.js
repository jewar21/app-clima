const baseUrl = process.env.REACT_APP_API_URL

const fetchP = {}

fetchP.fetchSinToken = (endPoint, data, method = 'GET') => {

    console.log('endPoint',endPoint)

    const url = `${baseUrl}/${endPoint}`

    console.log('-->', url)

    if (method === 'GET') {
        return fetch(url)
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

fetchP.fetchConToken = (endPoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endPoint}`
    const token = localStorage.getItem('token')

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: { 'token': token }
        })
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(data)
        })
    }
}

export default fetchP