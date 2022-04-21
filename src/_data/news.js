const axios = require('axios')
require('dotenv').config()
const countries = require('./countries')

async function getNews(country) {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWS_API_KEY}`)

        return {
           "country": country,
           "articles": response.data.articles  
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = async function() {
    const newsPromises = countries.map(getNews)
    return Promise.all(newsPromises).then(newsObjects => {
        // console.log("newsObjects", newsObjects)
        return newsObjects
    })
}