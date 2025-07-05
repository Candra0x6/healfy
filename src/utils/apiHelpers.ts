/**
 * Utility functions for handling API calls and error recovery
 */

export interface ApiCallResult {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Enhanced API call function with better error handling
 */
export const safeApiCall = async (
  endpoint: string,
  method: string,
  body?: object,
  retries: number = 0
): Promise<ApiCallResult> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `API call failed: ${response.status} ${response.statusText}`,
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`Error in API call to ${endpoint}:`, error);
    
    // Retry logic for network errors
    if (retries > 0 && error instanceof TypeError) {
      console.log(`Retrying API call to ${endpoint}, attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      return safeApiCall(endpoint, method, body, retries - 1);
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Execute multiple API calls in sequence with rollback support
 */
export const executeApiSequence = async (
  operations: Array<{
    name: string;
    apiCall: () => Promise<ApiCallResult>;
    rollback?: () => Promise<void>;
  }>,
  onProgress?: (operation: string, index: number, total: number) => void
): Promise<{ success: boolean; error?: string; completedOperations: string[] }> => {
  const completedOperations: string[] = [];
  
  try {
    for (let i = 0; i < operations.length; i++) {
      const operation = operations[i];
      
      if (onProgress) {
        onProgress(operation.name, i + 1, operations.length);
      }
      
      const result = await operation.apiCall();
      
      if (!result.success) {
        // Operation failed, attempt rollback of completed operations
        console.error(`Operation ${operation.name} failed:`, result.error);
        
        // Rollback in reverse order
        for (let j = completedOperations.length - 1; j >= 0; j--) {
          const completedOp = operations.find(op => op.name === completedOperations[j]);
          if (completedOp?.rollback) {
            try {
              await completedOp.rollback();
              console.log(`Rolled back operation: ${completedOp.name}`);
            } catch (rollbackError) {
              console.error(`Failed to rollback operation ${completedOp.name}:`, rollbackError);
            }
          }
        }
        
        return {
          success: false,
          error: result.error,
          completedOperations,
        };
      }
      
      completedOperations.push(operation.name);
    }
    
    return { success: true, completedOperations };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      completedOperations,
    };
  }
};

/**
 * Retry a failed operation with exponential backoff
 */
export const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      const delay = baseDelay * Math.pow(2, attempt);
      console.log(`Operation failed, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};
