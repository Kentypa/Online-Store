import api from "@config/axios";

export function categoryService(url: string, langCode: string) {
  const getCategories = async () => {
    return api
      .get(`${url}/categories-tree`, { params: { langCode: langCode } })
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
  };

  const getParentCategories = async (categoryId: number) => {
    return api
      .get(`${url}/categories-parent-ids`, {
        params: { categoryId: categoryId },
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
  };

  return { getCategories, getParentCategories };
}
