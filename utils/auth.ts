export const fetchWithAuth = async (url: string) => {
    const token = localStorage.getItem("auth-token")
    if (!token) throw new Error("No token found")

    const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`, {
        headers: { Authorization: `Bearer ${token}` }
    });


    if (!response.ok) {
        if (response.status === 401) {
        throw new Error("Invalid token. Please re-enter.")
        }
        throw new Error(`API error: ${response.status}`)
    }

    return response.json()
}