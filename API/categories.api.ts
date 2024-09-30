import api from "./middleware";

export const getCategories = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  try {
    const { data } = await api.get(
      `/category?limit=${limit || 15}&page=${page || 1}&search=${search || ""}`
    );
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

export const getSubCategories = async ({
  page,
  limit,
  search,
  id,
}: {
  page: number;
  limit: number;
  search: string;
  id: string;
}) => {
  try {
    const { data } = await api.get(
      `/category?parent=${id}&limit=${limit || 15}&page=${page || 1}&search=${search || ""
      }`
    );
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

export const createCategory = async (formData: FormData) => {
  try {
    const response = await api.post("/category", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

export const deleteCategory = async (id: string) => {
  try {
    const response = await api.delete(`/category/delete/${id}`);

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

export const fetchSingleCategory = async (categoryId: string) => {
  if (!categoryId) return;
  try {
    const response = await api.get(`/category/${categoryId}`);
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
}

export const updateCategory = async (formData: FormData, id: string) => {
  try {
    const response = await api.put(`/category/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
}

export const mostLikedCategories = async ({
  page,
  limit,
  search,
  month,
  sort
}: {
  page: number;
  limit: number;
  search: string;
  month: string;
  sort:string
}) => {
  try {

    let queryString = `/category/likes?search=${search || ""}&month=${month || ""}&sortOrder=${sort? sort:'-1'}&page=${page?page:'1'}&limit=${limit?limit:'10'}`;
    const { data } = await api.get(queryString);

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
