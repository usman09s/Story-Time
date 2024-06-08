import api from "./middleware";

export const pushNotification = async ({
  title,
  message,
  sendToAll,
}: {
  title: string;
  message: string;
  sendToAll: boolean;
}) => {
  try {
    const response = await api.post("/notification", {
      title,
      message,
      sendToAll,
    });
    return {
      success: true,
      response: response,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const getNotifications = async () => {
  try {
    const { data } = await api.get(`/notification`);
    return {
      success: true,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};
