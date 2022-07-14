const _ = require('lodash')

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {
    return sum += item.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0){
    return {}
  }

  const mostLikes = blogs.reduce((result, item) => {
    if (item.likes >= result.likes) {
      result = { ...item }
    }

    return result
  }, blogs[0])

  const { title, author, likes } = mostLikes
  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authorCount = _.countBy(blogs, (item) => {
    return item.author
  })

  const result = {
    author: 'none',
    count: 0
  }

  for (const prop in authorCount) {
    if (authorCount[prop] >= result.count){
      result.author = prop
      result.count = authorCount[prop]
    }
  }

  return result
}

const mostLikes = (blogs) => {
  if (blogs.length === 0){
    return {}
  }

  const result = _(blogs)
    .groupBy('author')
    .map((item, id) => (
      {
        author: id,
        likes: _.sumBy(item, 'likes')
      }
    ))
    .value()
    .reduce((acc, item) => {
      if (item.likes >= acc.likes){
        acc = item
      }
      return acc
    }, { author: 'none', likes: 0 })

  return result
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}