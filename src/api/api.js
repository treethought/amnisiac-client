import {http} from './common.js'
import auth from './auth.js'
import router from '../router'

export default {
  fetchRedditSources (context) {
    console.log('Fetching reddit sources')
    http.get('reddit/sources').then(response => {
      console.log(response.status)
      context.redditSources = response.data
    }, response => {
      console.log('error')
    })
  },
  fetchScSources (context, search, loading) {
    loading(true)
    http.get('sc_autocomplete', {
      params: {
        q: search}
    }).then(response => {
      console.log(response.status)
      context.scOptions = response.data.results
      loading(false)
    }, response => {
      console.log('error')
    })
  },
  fetchItems (reddit, sc, context) {
    console.log('Fetching items with query')
    context.isLoading = true

    return http.get('reddit/search', {
      params: {
        reddit_query: reddit,
        sc_query: sc
      }
    })
      .then(response => {
        console.log(response.status)
        console.log(response.statusText)
        context.items = response.data
        context.isLoading = false
      })
      .catch(error => {
        context.isLoading = false
        context.alertError = true
        console.log('error fetching items from query')
        console.log(error)
      // throw error
      // console.log(r)
      })
  },
  fetchUserFavorites (context) {
    return http.get('users')
      .then(response => {
        console.log(response)
        console.log('user request successful')
        context.items = response.data.favorites
        context.sources = response.data.feeds // should change feeds -> sources on backend
      })
      .catch(error => {
        context.isLoading = false
        context.alertError = true
        console.log(error)
      // throw error
      })
  },
  saveItem (context) {
    console.log('Saving item to favorites')
    return http.post('users/favorites', {item: context.item})
      .then(response => {
        console.log(response.status)
        context.$store.user = response.data // response has updated User object
        console.log('Successfully saved item')
      }).catch(error => {
        console.log('error saving favorite')
        console.log(error)
      // throw error
      })
  },
  removeItem (context) {
    console.log('Removing item to favorites')
    return http.put('users/favorites', {item: context.item})
      .then(response => {
        console.log(response.status)
        context.$store.user = response.data
        console.log('Successfully removed item')
      }).catch(error => {
        // error callback
        console.log('error removing favorite')
        console.log(error)
        console.log(error.data)
      // throw error
      })
  },
  fetchUser (context, redirect) {
    console.log('fetching user...')
    return http.get('users')
      .then(response => {
        context.$store.user = response.data
        console.log('User data obtained')
      }).catch(error => {
        console.log(error.response.status)
        if (error.response.status > 400) {
          auth.refresh(this, redirect)
        }
        console.log('Failed to fetch User')
        console.log(error)
      // throw error
      }).then(response => {
        if (redirect) {
          console.log('redirecting to ' + redirect)
          router.push(redirect)
        }
      })
  },
  addSources (reddit, sc, context) {
    console.log('Adding sources ' + reddit + sc)
    return http.post('users/sources', {
      params: {
        reddit_query: reddit,
        sc_query: sc
      }
    })
      .then(response => {
        context.$store.user = response.data
        console.log('User sources updated')
      })
      .catch(error => {
        console.log(error.response)
      })
  },
  removeSource (source, context) {
    console.log('Removing ' + source + 'from user feeds')
    return http.put('users/sources', {
      params: {
        source: source
      }
    })
      .then(response => {
        context.$store.user = response.data
        console.log('User sources updated')
      })
      .catch(error => {
        console.log(error.response)
      })
  }
}
