import api from "./middleware";

export const loginMutate = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await api.post(
      "/auth/login",
      {
        email,
        password,
        fcmToken: "fcmtoken12121212",
      },
      {
        withCredentials: true,
      }
    );

    return {
      success: true,
      response: data.data,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await api.get("/user/profile");

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

export const forgetPass = async (email: string) => {
  try {
    const  data  = await api.put("/auth/forget-password", { email });

    if(data.status === 400) return {success: false, response: data.data.message}
    if(data.status === 422) return {success: true, response: data.data.message}
    
    return {
      success: true,
      response: data.data.message,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const verifyResetToken = async (resetToken: string) => {
  try {
    const { data } = await api.put("/auth/verify-reset-token", { resetToken });

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

export const resetPass = async ({
  newPassword,
  confirmPassword,
  accessToken
}: {
  newPassword: string;
  confirmPassword: string;
  accessToken: string;
}) => {
  try {
    const { data } = await api.put("/auth/reset-password", {
      newPassword,
      confirmPassword,
    },{
      headers: {
        resetToken: `${accessToken}`,
      },
    
    });

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

export const updateProfile = async (info: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const { data } = await api.put("/user/admin-info", info);

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
