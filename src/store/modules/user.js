
// const state = {
//   user
// }

// const actions = {
//   addSources ({commit}, {reddit, sc}) {
//     console.log('Adding sources ' + reddit + sc)
//     return http.post('users/sources', { params: {
//     reddit_query: reddit,
//     sc_query: sc
//     }
//     })
//     .then(response => {
//         commit('setUser', response.data)
//         console.log('User sources updated')
//     })
//     .catch(error => {
//         console.log(error)
//     })
//   },
//   removeSource ({commit}, source) {
//     console.log(source)
//     console.log('Removing ' + source + 'from user feeds')
//     return http.put('users/sources', { params: {
//     source: source.name
//     }
//     })
//     .then(response => {
//         commit('setUser', response.data)
//         console.log('User sources updated')
//     })
//     .catch(error => {
//         console.log(error)
//     })
//   }
// }