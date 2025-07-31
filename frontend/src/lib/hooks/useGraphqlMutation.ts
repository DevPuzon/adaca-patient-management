import { useMutation } from "@apollo/client";
import type { DocumentNode } from "@apollo/client";
import { toast } from "react-toastify";

type UseGraphqlMutationProps<TData = any, TVariables = any> = {
  mutation: DocumentNode;
  onSuccess?: (data: TData) => void;
  onError?: (error: any) => void;
  showToastOnError?: boolean;
  showToastOnSuccess?: boolean;
};

export function useGraphqlMutation<TData = any, TVariables = any>({
  mutation,
  onSuccess,
  onError,
  showToastOnError = true,
  showToastOnSuccess = true,
}: UseGraphqlMutationProps<TData, TVariables>) {
  const [mutateFunction, { loading }] = useMutation<TData, TVariables>(
    mutation,
    {
      onCompleted: (data: any) => {
        onSuccess?.(data);

        if (showToastOnSuccess) {
          const key = Object.keys(data)[0];
          const message = data?.[key]?.message;
          if (message) {
            toast.success(message);
          }
        }
      },
      onError: (error) => {
        console.error("error", error);
        onError?.(error);
        const message = error?.message || "An unexpected error occurred.";
        if (showToastOnError) {
          toast.error(message);
        }

        // INTERNAL_SERVER_ERROR;
      },
    }
  );

  const execute = async (options?: { variables?: TVariables }) => {
    return mutateFunction(options);
  };

  return {
    execute,
    loading,
  };
}
