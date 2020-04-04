const getters = {
  sidebar: (state: any) => state.app.sidebar,
  device: (state: any) => state.app.device,
  token: (state: any) => state.user.token,
  avatar: (state: any) => state.user.user.avatar,
  name: (state: any) => state.user.user.name
}
export default getters
