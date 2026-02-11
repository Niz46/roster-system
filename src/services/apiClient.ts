export async function apiGet<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    throw err;
  }
}

export async function apiPost<T, B = unknown>(
  url: string,
  body: B,
): Promise<T> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${url} failed: ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    throw err;
  }
}

export async function apiPut<T, B = unknown>(url: string, body: B): Promise<T> {
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`PUT ${url} failed: ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    throw err;
  }
}

export async function apiDelete<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url, { method: "DELETE" });
    if (!res.ok) throw new Error(`DELETE ${url} failed: ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    throw err;
  }
}
