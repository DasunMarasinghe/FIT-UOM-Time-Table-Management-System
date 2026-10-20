export async function demoSignIn(
  email: string,
  password: string,
): Promise<boolean> {
  // Simulate the delay of a backend request.
  await new Promise((resolve) => setTimeout(resolve, 600))

  return (
    email.trim().toLowerCase() === 'demo@uom.example' &&
    password === 'Demo123!'
  )
}