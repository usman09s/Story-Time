import api from "./middleware";

export const getUsers = async ({
  page,
  search,
  filter,
}: {
  page: number;
  search: string;
  filter: string;
}) => {
  try {
    const { data } = await api.get(
      `/users?limit=15&page=${page || 1}&search=${search || ""}&filter=${
        filter || "atoz"
      }`
    );
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
