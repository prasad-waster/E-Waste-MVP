async function handler({ method, body, query }) {
  const session = getSession();
  if (!session?.user?.id) {
    return { error: "Unauthorized", status: 401 };
  }

  try {
    switch (method) {
      case "POST": {
        const {
          item_name,
          estimated_value,
          precious_metals_content,
          image_url,
        } = body;

        if (!item_name || !estimated_value) {
          return { error: "Missing required fields", status: 400 };
        }

        // Create recycling record and update user points
        const points = Math.floor(estimated_value * 10); // Basic points calculation

        const [record] = await sql.transaction([
          sql`
            INSERT INTO recycled_items (user_id, item_name, estimated_value, precious_metals_content, image_url)
            VALUES (${
              session.user.id
            }, ${item_name}, ${estimated_value}, ${JSON.stringify(
            precious_metals_content
          )}, ${image_url})
            RETURNING *
          `,
          sql`
            INSERT INTO users (user_id, credit_points)
            VALUES (${session.user.id}, ${points})
            ON CONFLICT (user_id) 
            DO UPDATE SET credit_points = users.credit_points + ${points}
            RETURNING credit_points
          `,
        ]);

        return { data: record, status: 201 };
      }

      case "GET": {
        if (query.leaderboard) {
          const leaderboard = await sql`
            SELECT u.user_id, u.credit_points, COUNT(r.id) as items_recycled
            FROM users u
            LEFT JOIN recycled_items r ON u.user_id = r.user_id
            GROUP BY u.user_id, u.credit_points
            ORDER BY u.credit_points DESC
            LIMIT 10
          `;
          return { data: leaderboard, status: 200 };
        }

        const history = await sql`
          SELECT r.*, u.credit_points
          FROM recycled_items r
          LEFT JOIN users u ON r.user_id = u.user_id
          WHERE r.user_id = ${session.user.id}
          ORDER BY r.recycled_at DESC
        `;
        return { data: history, status: 200 };
      }

      case "PUT": {
        const { record_id, center_confirmation, actual_value } = body;

        if (!record_id || !center_confirmation) {
          return { error: "Missing required fields", status: 400 };
        }

        // Update record and adjust points if needed
        const pointAdjustment = actual_value
          ? Math.floor((actual_value - body.estimated_value) * 10)
          : 0;

        const [updatedRecord] = await sql.transaction([
          sql`
            UPDATE recycled_items 
            SET center_confirmation = ${center_confirmation},
                actual_value = ${actual_value}
            WHERE id = ${record_id} AND user_id = ${session.user.id}
            RETURNING *
          `,
          sql`
            UPDATE users 
            SET credit_points = credit_points + ${pointAdjustment}
            WHERE user_id = ${session.user.id}
            RETURNING credit_points
          `,
        ]);

        if (!updatedRecord) {
          return { error: "Record not found", status: 404 };
        }

        return { data: updatedRecord, status: 200 };
      }

      default:
        return { error: "Method not allowed", status: 405 };
    }
  } catch (error) {
    console.error("Recycling records error:", error);
    return { error: "Internal server error", status: 500 };
  }
}