export const createInitialChacarter = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/character/new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );
    console.log("response: ", response);
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};
