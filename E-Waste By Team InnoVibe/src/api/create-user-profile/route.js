async function handler() {
  const session = getSession();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    const authUserId = parseInt(session.user.id);

    const existingUser = await sql`
      SELECT id FROM users 
      WHERE auth_user_id = ${authUserId}
    `;

    if (existingUser.length > 0) {
      return { error: "User profile already exists" };
    }

    const newUser = await sql`
      INSERT INTO users (auth_user_id, credit_points, created_at)
      VALUES (${authUserId}, 0, NOW())
      RETURNING id, auth_user_id, credit_points
    `;

    return {
      success: true,
      user: newUser[0],
    };
  } catch (error) {
    return {
      error: "Failed to create user profile",
    };
  }
}