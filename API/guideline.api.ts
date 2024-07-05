import api from "./middleware";

export const createGuideline = async ({
  type,
  content,
}: {
  type: string;
  content: string;
}) => {
  try {
    const response = await api.post("/guideline", {
      type,
      content,
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

export const getGuideline = async (type: string) => {
  try {
    const { data } = await api.get(`/guideline?type=${type}`);
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
