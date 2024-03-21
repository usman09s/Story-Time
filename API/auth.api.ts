import api from "./middleware";

export const loginMutate = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    return {
      success: true,
      response: response.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/getCurrentUser");

    return {
      success: true,
      response: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const generateOTP = async (email: string) => {
  try {
    const { data } = await api.post("/auth/otp", { email });

    return {
      success: true,
      response: data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};