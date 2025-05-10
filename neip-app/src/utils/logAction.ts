// utils/logAction.ts

export const logAction = async (
    name: string | null | undefined,
    role: string | null | undefined,
    action: string,
    object: string
  ) => {
    console.log("logAction called with:", { name, role, action, object });
    const date = new Date().toISOString();
  
    const safeName = name?.trim() || 'Unknown User';
    const safeRole = role?.trim() || 'unknown';
    const safeAction = action || 'Unknown Action';
    const safeObject = object || 'Unknown Object';
  
    try {
      await fetch('/api/logs/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: safeName,
          role: safeRole,
          action: safeAction,
          object: safeObject,
          date
        })
      });
    } catch (error) {
      console.error('Failed to log action:', error);
    }
  };
  