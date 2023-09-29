import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (user, chat) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members?.find((id) => id !== user?._id); ///error is here

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;
      const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
      //  console.log(response);
      if (response.error) {
        return setError(error);
      }
      setRecipientUser(response);
    };
    getUser();
  }, [recipientId]);
  return { recipientUser, error };
};
