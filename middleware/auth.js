export default function ({redirect, store}) {
  const user = store.state.login.user
  const isAuthenticated = !!user
  if (!isAuthenticated || !user.is_admin) {
    store.dispatch('login/logout')
    redirect('/')
  }
}
