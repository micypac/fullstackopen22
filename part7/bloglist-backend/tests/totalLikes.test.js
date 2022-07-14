const totalLikes = require('../utils/for_testing').totalLikes

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const manyBlogs = [
    {
      'title': 'Living an active healthy life.',
      'author': 'Monica Grace',
      'url': 'https://www.themostlysimplelife.com/simple-living/8-tips-living-active-lifestyle/',
      'likes': 15,
      'id': '629eb80837e9769d11597a86'
    },
    {
      'title': 'Miss-Komi-unication',
      'author': 'Shuoko Komi',
      'url': 'https://www.viz.com/blog/posts/miss-komi-unication',
      'likes': 20,
      'id': '629eb8f537e9769d11597a89'
    },
    {
      'title': 'Live action One Piece Crew',
      'author': 'Sanji Vinsmoke',
      'url': 'https://blog.funimation.com/2021/11/09/live-action-one-piece-series-casts-its-straw-hat-crew/',
      'likes': 5,
      'id': '629ebb3522acb8c4760e7718'
    },
    {
      'title': 'Prototypal Inheritance',
      'author': 'Lydia Hallie',
      'url': 'https://dev.to/lydiahallie/javascript-visualized-prototypal-inheritance-47co',
      'likes': 50,
      'id': '629f6e6790da831bd8776794'
    }
  ]

  test('of empty list is zero', ()=> {
    expect(totalLikes([])).toBe(0)
  })

  test('of only one blog, equals to likes of that', () => {
    expect(totalLikes(listWithOneBlog)).toBe(5)
  })

  test('of many blogs, equals to all likes of all of them', () => {
    expect(totalLikes(manyBlogs)).toBe(90)
  })
})