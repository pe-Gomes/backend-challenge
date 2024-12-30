import { isValidGithubRepoUrl } from './link-validator'

describe('GitHub link validator', () => {
  it('should return true if the link is a valid GitHub repository', () => {
    const link = 'https://github.com/pe-Gomes/backend-challenge'
    expect(isValidGithubRepoUrl(link)).toBe(true)
  })

  it('should return false if the URL is an invalid GitHub repository', () => {
    const link = 'https://bitbucket.com/pe-Gomes/backend-challenge'
    expect(isValidGithubRepoUrl(link)).toBe(false)
  })
})
