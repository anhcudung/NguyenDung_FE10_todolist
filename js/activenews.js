export default class ListApi {
  addActiveApi(data) {
    return axios({
      url: "https://60bc9ad9b8ab37001759f4e4.mockapi.io/api/hoatDong",
      method: "POST",
      data,
    });
  }
  getActiveApi() {
    return axios({
      url: "https://60bc9ad9b8ab37001759f4e4.mockapi.io/api/hoatDong",
      method: "GET",
    });
  }
  deleteActiveApi(id) {
    return axios({
      url: `https://60bc9ad9b8ab37001759f4e4.mockapi.io/api/hoatDong/${id}`,
      method: "DELETE",
    });
  }
  updateActive(data) {
    return axios({
      url: `https://60bc9ad9b8ab37001759f4e4.mockapi.io/api/hoatDong/${data.id}`,
      method: "PUT",
      data: data,
    });
  }
  getActiveById(id) {
    return axios({
      url: `https://60bc9ad9b8ab37001759f4e4.mockapi.io/api/hoatDong/${id}`,
      method: "GET",
    });
  }
}
