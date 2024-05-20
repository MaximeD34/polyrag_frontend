import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const refreshToken = async () => {
  try {
    const csrfToken_refresh = Cookies.get("csrf_refresh_token");
    const response = await axios.post(
      `${API_BASE_URL}/refresh`,
      {},
      {
        withCredentials: true,
        headers: {
          "X-CSRF-TOKEN": csrfToken_refresh,
        },
      }
    );
    if (response.status === 200) {
      const csrfToken = Cookies.get("csrf_access_token");

      return csrfToken;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default refreshToken;
