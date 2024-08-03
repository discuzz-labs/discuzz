import { UseMutationResult } from "@tanstack/react-query";

interface CombinedState {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function useCombinedMutationState<TArgs>(
  ...mutations: UseMutationResult<unknown, Error, TArgs>[]
): CombinedState {
  return {
    isLoading: mutations.some(mutation => mutation.isPending),
    isError: mutations.some(mutation => mutation.isError),
    error: mutations.find(mutation => mutation.isError)?.error || null,
  };
}
