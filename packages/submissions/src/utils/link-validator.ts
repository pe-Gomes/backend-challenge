export function isValidGithubRepoUrl(url: string): boolean {
  try {
    // 1. Check if it's a valid URL by constructing a new URL object.
    // If it doesn't start with http, prepend https:// so the URL constructor doesn't throw.
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url
    }
    new URL(url)
  } catch {
    // If URL construction fails, it's not a valid URL
    return false
  }

  // 2. Normalize the URL by removing protocol (http/https) and optional www.
  const normalizedUrl = url.replace(/^https?:\/\/(www\.)?/i, '')

  // 3. Check if the domain is github.com
  const isGithubDomain = !normalizedUrl.toLowerCase().startsWith('github.com/')
  if (isGithubDomain) {
    return false
  }

  // 4. Extract the "owner/repo" part after "github.com/"
  const ownerAndRepo = normalizedUrl.substring('github.com/'.length)

  // Remove any trailing slash if present (optional, depending on your requirement)
  const trimmed = ownerAndRepo.replace(/\/$/, '')

  // Split on '/' to see if we have exactly two parts: [owner, repo]
  const parts = trimmed.split('/')
  if (parts.length !== 2) {
    return false
  }

  const [owner, repo] = parts

  // Validate that owner and repo only contain allowed characters
  // (alphanumeric, underscore, hyphen).
  const validPattern = /^[a-zA-Z0-9_-]+$/
  return validPattern.test(owner) && validPattern.test(repo)
}
