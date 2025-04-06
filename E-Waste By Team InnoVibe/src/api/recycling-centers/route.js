async function handler({ action, search, radius = 500, centerId }) {
  const session = getSession();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  switch (action) {
    case "list":
      try {
        const centers = await sql`
          SELECT * FROM recycling_centers 
          ORDER BY name ASC
        `;
        return { success: true, centers };
      } catch (error) {
        return { error: "Failed to fetch recycling centers" };
      }

    case "search":
      if (!search) {
        return { error: "Search term is required" };
      }

      try {
        const response = await fetch(
          `/integrations/google-place-autocomplete/autocomplete/json?input=${encodeURIComponent(
            search
          )}&radius=${radius}`
        );
        const data = await response.json();

        if (data.status === "OK") {
          return {
            success: true,
            predictions: data.predictions,
          };
        }
        return { error: "No results found" };
      } catch (error) {
        return { error: "Failed to search locations" };
      }

    case "getDetails":
      if (!centerId) {
        return { error: "Center ID is required" };
      }

      try {
        const [center] = await sql`
          SELECT * FROM recycling_centers 
          WHERE id = ${centerId}
        `;

        if (!center) {
          return { error: "Recycling center not found" };
        }

        return { success: true, center };
      } catch (error) {
        return { error: "Failed to fetch center details" };
      }

    default:
      return { error: "Invalid action" };
  }
}