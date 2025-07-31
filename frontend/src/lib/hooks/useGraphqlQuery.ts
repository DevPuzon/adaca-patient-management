import { logout } from "@/store/auth/authSlice";
import { useQuery } from "@apollo/client";
import type { DocumentNode } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type UseGraphqlQueryProps<TData = any, TVariables = any> = {
  query: DocumentNode;
  variables?: TVariables;
  onSuccess?: (data: TData) => void;
  onError?: (error: any) => void;
  skip?: boolean;
  showToastOnError?: boolean;
  showToastOnSuccess?: boolean;
};
export function useGraphqlQuery<TData = any, TVariables = any>({
  query,
  variables,
  onSuccess,
  onError,
  skip = false,
  showToastOnError = true,
  showToastOnSuccess = false,
}: UseGraphqlQueryProps<TData, TVariables>) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery<TData, any>(query, {
    variables,
    skip,
    onCompleted: (data: any) => {
      onSuccess?.(data);
      if (showToastOnSuccess) {
        const key = Object.keys(data)[0];
        const message = data?.[key]?.message;
        if (message) toast.success(message);
      }
    },
    onError: (error: any) => {
      console.log("error", error);
      onError?.(error);
      const isUnauthorized =
        error?.graphQLErrors?.some(
          (err: any) => err.extensions?.code === "UNAUTHENTICATED"
        ) || error?.networkError?.statusCode === 401;

      if (isUnauthorized) {
        toast.error("Session expired. Please login again.");
        dispatch(logout());
        navigate("/");
      } else if (showToastOnError) {
        toast.error(error.message || "Query failed");
      }
    },
  });

  return {
    data,
    loading,
    error,
    refetch,
  };
}
