export async function Log(stack, level, packageName, logString) {
  const payload = {
    stack,          
    level,          
    packageName,    
    logString       
  };

  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjaGFpdGFueWFiZWhsZm9yd29ya0BnbWFpbC5jb20iLCJleHAiOjE3NTE5NTE0OTcsImlhdCI6MTc1MTk1MDU5NywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjhkZTA3NzVjLWNhYjItNGYxZS1iMDEwLWY0NTA0ZjlmMTA4MSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImNoYWl0YW55YSBiZWhsIiwic3ViIjoiOGQ2NWNiYzYtM2EyNi00MzFkLWE4MDctMWE2Mzg0YTBjM2E1In0sImVtYWlsIjoiY2hhaXRhbnlhYmVobGZvcndvcmtAZ21haWwuY29tIiwibmFtZSI6ImNoYWl0YW55YSBiZWhsIiwicm9sbE5vIjoiMDE1NzY4MDMxMjIiLCJhY2Nlc3NDb2RlIjoiVlBwc21UIiwiY2xpZW50SUQiOiI4ZDY1Y2JjNi0zYTI2LTQzMWQtYTgwNy0xYTYzODRhMGMzYTUiLCJjbGllbnRTZWNyZXQiOiJrRW1hS05qU2FKZndVbnZOIn0.BTc5W_ayZcVWtl40CM507RIJztnOLlDqL73zlW9YNGU"
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("[Logging Error] API call failed:", response.statusText);
    }
  } catch (error) {
    console.error("[Logging Error] Exception while sending log:", error);
  }
}
