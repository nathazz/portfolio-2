export function formatRepoName(name: string): string {
  return name
    .replace(/-/g, ' ') 
    .replace(/\b\w/g, (l) => l.toUpperCase()); 
}
