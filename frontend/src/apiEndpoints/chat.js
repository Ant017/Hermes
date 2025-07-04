import { axiosInstance } from "../utils/axiosInstance";
import {
  handleApiResponseWithoutToast,
  handleApiError,
  handleApiResponse,
} from "../utils/apiResponseHandler";

// access chat API
export const accessChatApi = async (userId) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/chat/access`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return handleApiResponseWithoutToast(response);
  } catch (error) {
    handleApiError(error);
  }
};

// get all chats API
export const GetAllChatsApi = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/chat/fetch-chats`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleApiResponseWithoutToast(response);
  } catch (error) {
    handleApiError(error);
  }
};

// create group chat API
export const createGroupChatApi = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/chat/create-group`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return handleApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};
