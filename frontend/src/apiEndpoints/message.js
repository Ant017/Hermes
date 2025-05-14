import {
  handleApiError,
  handleApiResponseWithoutToast,
} from "../utils/apiResponseHandler";
import { axiosInstance } from "../utils/axiosInstance";

export const sendMessageApi = async (messageData) => {
  try {
    const response = await axiosInstance.post(
      `api/v1/message/send`,
      messageData,
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

export const getMessageApi = async (chatId) => {
  try {
    const response = await axiosInstance.get(
      `api/v1/message/fetch-messages/${chatId}`,
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
