export default function({ redirect, store }) {
  const user = store.state.login.user
  const isAuthenticated = !!user
  if (isAuthenticated) {
    redirect('/panel')
  }
}
